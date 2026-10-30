import { cookies } from 'next/headers';
import { randomUUID, createHmac, timingSafeEqual } from 'node:crypto';
import { hash, compare } from 'bcryptjs';
import { z } from 'zod';
import { db, withDatabase } from './server/db';
import { propertySchema, createListing, withPhotos } from './server/listings';
import { countWords } from '../content/listing-limits';
import { ApiError, currentUser, requireUser, startSession, endSession, rateLimit, type PortalRole } from './server/auth';
import { paychangu, verifyPayment } from './server/payments';
import { deletePrivateFile, getPrivateFile, putPrivateFile, privateStorageConfigured } from './server/storage';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const email = z.string().trim().email().max(254).transform(v => v.toLowerCase());
const password = z.string().min(12).max(72).refine(v => Buffer.byteLength(v) <= 72, 'Password must be at most 72 bytes');
const registration = z.object({ email, password, accountType: z.enum(['buyer', 'seller']) });
const login = z.object({ identifier: z.string().trim().min(1).max(254).transform(v => v.toLowerCase()), password: z.string().min(1).max(72).refine(v => Buffer.byteLength(v) <= 72, 'Password must be at most 72 bytes') });

const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
async function body(req: Request) {
    const text = await req.text();
    if (text.length > 20000)
        throw new ApiError(413, 'Request is too large.');
    try {
        return JSON.parse(text);
    }
    catch {
        throw new ApiError(400, 'Invalid JSON.');
    }
}
async function handleRequest(req: Request, context: {
    params: Promise<{
        path: string[];
    }>;
}) {
    try {
        const { path } = await context.params;
        const route = path.join('/');
        const method = req.method;
        const database = await db();
        const requestedPortal: PortalRole = req.headers.get('x-geoking-portal') === 'admin' ? 'admin' : 'client';
        if (route === 'payments/webhook' && method === 'POST') {
            const raw = await req.text();
            const secret = process.env.PAYCHANGU_WEBHOOK_SECRET;
            const signature = req.headers.get('signature') || '';
            if (!secret || !/^[a-fA-F0-9]{64}$/.test(signature) || !timingSafeEqual(Buffer.from(signature, 'hex'), createHmac('sha256', secret).update(raw).digest()))
                throw new ApiError(401, 'Invalid webhook signature.');
            const event = JSON.parse(raw);
            const id = z.string().uuid().parse(event.tx_ref || event.data?.tx_ref);
            await verifyPayment(id);
            return json({ received: true });
        }
        if (!['GET', 'HEAD'].includes(method)) {
            const expected = new URL(process.env.APP_URL || 'http://localhost:3000').origin;
            if (req.headers.get('origin') !== expected)
                throw new ApiError(403, 'Invalid request origin.');
        }
        if (route === 'auth/me' && method === 'GET')
            return json({ user: await currentUser(requestedPortal) });
        if (['auth/register', 'auth/login'].includes(route) && method === 'POST') {
            const input = await body(req);
            const credentials = route === 'auth/register' ? registration.parse(input) : login.parse(input);
            const identifier = route === 'auth/register'
                ? (credentials as z.infer<typeof registration>).email
                : (credentials as z.infer<typeof login>).identifier;
            await rateLimit(`auth:${identifier}`);
            // The proxy IP is used only when explicitly trusted by the deployment.
            if (process.env.TRUST_PROXY === 'true')
                await rateLimit(`ip:${req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'}`);
            if (route === 'auth/register') {
                const { email, password, accountType } = credentials as z.infer<typeof registration>;
                const name = z.string().trim().min(2).max(100).parse(input.name);
                const id = randomUUID();
                try {
                    await database.execute({ sql: "INSERT INTO users(id,name,email,password,role,account_type) VALUES(?,?,?,?,'client',?)", args: [id, name, email, await hash(password, 12), accountType] });
                }
                catch (e) {
                    if ((String(e).includes('UNIQUE') || (e as { code?: string }).code === '23505'))
                        throw new ApiError(409, 'An account with this email already exists.');
                    throw e;
                }
                await startSession(id, 'client');
            }
            else {
                const { password } = credentials as z.infer<typeof login>;
                const user = (await database.execute({ sql: 'SELECT * FROM users WHERE email=?', args: [identifier] })).rows[0];
                const valid = await compare(password, String(user?.password || '$2b$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW'));
                if (!user || !valid)
                    throw new ApiError(401, 'Incorrect email or password.');
                if (user.role !== requestedPortal)
                    throw new ApiError(403, requestedPortal === 'admin' ? 'Use an administrator account here.' : 'Use your client account here.');
                await startSession(String(user.id), requestedPortal);
            }
            return json({ user: await currentUser(requestedPortal) });
        }
        if (route === 'auth/logout' && method === 'POST') {
            await endSession(requestedPortal);
            return json({ success: true });
        }
        if (path[0] === 'property-images' && path[1] && method === 'GET') {
            const photo = (await database.execute({ sql: 'SELECT i.storage_key,p.owner_user_id,p.approval_status,p.status FROM property_images i JOIN properties p ON p.id=i.property_id WHERE i.id=?', args: [path[1]] })).rows[0];
            if (!photo) throw new ApiError(404, 'Photo not found.');
            if (photo.approval_status !== 'approved' || photo.status === 'draft') {
                const [administrator, client] = await Promise.all([currentUser('admin'),currentUser('client')]);
                if (!administrator && (!client || client.id !== photo.owner_user_id)) throw new ApiError(404, 'Photo not found.');
            }
            const object = await getPrivateFile(String(photo.storage_key),'geoking-properties');
            if (!object.Body) throw new ApiError(404, 'Photo not found.');
            return new Response(await object.Body.transformToByteArray(), { headers: { 'Content-Type': object.ContentType || 'image/webp', 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' } });
        }
        if (route === 'properties' && method === 'GET')
            return json({ properties: await withPhotos((await database.execute("SELECT * FROM properties WHERE status!='draft' AND approval_status='approved' ORDER BY created_at DESC")).rows) });
        if (route === 'contact/public' && method === 'POST') {
            const input = z.object({ name: z.string().trim().min(2).max(100), email, phone: z.string().trim().max(30).optional(), subject: z.string().trim().max(120), message: z.string().trim().min(10).max(2950).refine(v => countWords(v) <= 300, 'Use no more than 300 words.') }).parse(await body(req));
            await rateLimit(`public-contact:${input.email}`);
            if (process.env.TRUST_PROXY === 'true') await rateLimit(`contact-ip:${req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'}`);
            await database.execute({ sql: 'INSERT INTO contact_messages(id,name,email,subject,message) VALUES(?,?,?,?,?)', args: [randomUUID(),input.name,input.email,input.subject || 'General enquiry',input.message + (input.phone ? `\n\nContact phone: ${input.phone}` : '')] });
            return json({ success: true },201);
        }
        const requiredPortal: PortalRole = path[0] === 'admin' ? 'admin' : requestedPortal;
        const user = await requireUser(requiredPortal);
        if (route === 'dashboard' && method === 'GET') {
            const admin = user.role === 'admin';
            const [properties, myListings, payments, saved, users, messages] = await Promise.all([
                database.execute(admin ? 'SELECT p.*,u.name AS owner_name FROM properties p LEFT JOIN users u ON u.id=p.owner_user_id ORDER BY p.created_at DESC' : "SELECT * FROM properties WHERE status!='draft' AND approval_status='approved' ORDER BY created_at DESC"),
                !admin && user.account_type === 'seller' ? database.execute({ sql: 'SELECT * FROM properties WHERE owner_user_id=? ORDER BY created_at DESC', args: [user.id] }) : Promise.resolve({ rows: [] }),
                database.execute({ sql: `SELECT p.*,u.name AS customer,u.email FROM payments p LEFT JOIN users u ON u.id=p.user_id ${admin ? '' : 'WHERE p.user_id=?'} ORDER BY p.created_at DESC`, args: admin ? [] : [user.id] }),
                database.execute({ sql: 'SELECT property_id FROM saved_properties WHERE user_id=?', args: [user.id] }),
                admin ? database.execute("SELECT id,name,email,role,account_type,kyc_status,kyc_id_number,kyc_phone,kyc_address,CASE WHEN kyc_document_key IS NULL THEN 0 ELSE 1 END AS kyc_document_uploaded,created_at FROM users ORDER BY created_at DESC") : Promise.resolve({ rows: [] }),
                database.execute({ sql: `SELECT * FROM contact_messages ${admin ? '' : 'WHERE user_id=?'} ORDER BY created_at DESC`, args: admin ? [] : [user.id] }),
            ]);
            const [catalogue, listings] = await Promise.all([withPhotos(properties.rows),withPhotos(myListings.rows)]);
            return json({ user, properties: catalogue, myListings: listings, messages: messages.rows, payments: payments.rows, saved: saved.rows.map(r => r.property_id), users: users.rows, paymentsConfigured: !!process.env.PAYCHANGU_SECRET_KEY });
        }
        if (route === 'contact' && method === 'POST') {
            const input = z.object({ subject: z.string().trim().min(3).max(120), message: z.string().trim().min(10).max(3000).refine(v => countWords(v) <= 300, 'Use no more than 300 words.') }).parse(await body(req));
            await rateLimit(`contact:${user.id}`);
            await database.execute({ sql: 'INSERT INTO contact_messages(id,user_id,name,email,subject,message) VALUES(?,?,?,?,?,?)', args: [randomUUID(),user.id,user.name,user.email,input.subject,input.message] });
            return json({ success: true }, 201);
        }
        if (path[0] === 'admin' && path[1] === 'contact' && path[2] && method === 'PUT') {
            const { reply } = z.object({ reply: z.string().trim().min(3).max(3000).refine(v => countWords(v) <= 300, 'Use no more than 300 words.') }).parse(await body(req));
            const updated = await database.execute({ sql: "UPDATE contact_messages SET reply=?,status='replied',updated_at=CURRENT_TIMESTAMP WHERE id=?", args: [reply,path[2]] });
            if (!updated.rowsAffected) throw new ApiError(404, 'Enquiry not found.');
            return json({ success: true });
        }
        if (route === 'account/password' && method === 'PUT') {
            const input = z.object({ currentPassword: z.string().min(1).max(72), newPassword: password }).parse(await body(req));
            const record = (await database.execute({ sql: 'SELECT password FROM users WHERE id=?', args: [user.id] })).rows[0];
            if (!await compare(input.currentPassword, String(record?.password || '')))
                throw new ApiError(400, 'Current password is incorrect.');
            await database.execute({ sql: 'UPDATE users SET password=? WHERE id=?', args: [await hash(input.newPassword, 12), user.id] });
            return json({ success: true });
        }
        if (route === 'seller/kyc' && method === 'POST') {
            if (user.account_type !== 'seller') throw new ApiError(403, 'KYC is available to seller accounts only.');
            if (!privateStorageConfigured()) throw new ApiError(503, 'KYC document storage is not configured yet.');
            const form = await req.formData();
            const kyc = z.object({ idNumber: z.string().trim().min(5).max(80), phone: z.string().trim().min(7).max(30), address: z.string().trim().min(5).max(250) }).parse({ idNumber: form.get('idNumber'), phone: form.get('phone'), address: form.get('address') });
            const document = form.get('document');
            if (!(document instanceof File) || !document.size) throw new ApiError(400, 'Please upload your ID document.');
            if (document.size > 5 * 1024 * 1024) throw new ApiError(413, 'The KYC document must be 5 MB or smaller.');
            const allowed = new Map([['image/jpeg', 'jpg'], ['image/png', 'png'], ['image/webp', 'webp'], ['application/pdf', 'pdf']]);
            const extension = allowed.get(document.type);
            if (!extension) throw new ApiError(400, 'Upload a JPG, PNG, WebP or PDF document.');
            const previous = (await database.execute({ sql: 'SELECT kyc_document_key FROM users WHERE id=?', args: [user.id] })).rows[0]?.kyc_document_key;
            const key = `kyc/${user.id}/${randomUUID()}.${extension}`;
            await putPrivateFile(key, new Uint8Array(await document.arrayBuffer()), document.type);
            await database.execute({ sql: "UPDATE users SET kyc_id_number=?,kyc_phone=?,kyc_address=?,kyc_document_key=?,kyc_document_type=?,kyc_status='pending' WHERE id=?", args: [kyc.idNumber, kyc.phone, kyc.address, key, document.type, user.id] });
            if (previous) await deletePrivateFile(String(previous)).catch(() => undefined);
            return json({ success: true });
        }
        if (path[0] === 'admin' && path[1] === 'kyc' && path[2] && path[3] === 'document' && method === 'GET') {
            const record = (await database.execute({ sql: 'SELECT kyc_document_key,kyc_document_type FROM users WHERE id=?', args: [path[2]] })).rows[0];
            if (!record?.kyc_document_key) throw new ApiError(404, 'KYC document not found.');
            const object = await getPrivateFile(String(record.kyc_document_key));
            if (!object.Body) throw new ApiError(404, 'KYC document not found.');
            const bytes = await object.Body.transformToByteArray();
            return new Response(bytes, { headers: { 'Content-Type': String(record.kyc_document_type || object.ContentType || 'application/octet-stream'), 'Content-Disposition': 'inline', 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' } });
        }
        if (route === 'seller/properties' && method === 'POST') {
            if (user.account_type !== 'seller') throw new ApiError(403, 'Only seller accounts can submit properties.');
            if (user.kyc_status !== 'approved') throw new ApiError(403, 'Your seller KYC must be approved before submitting a property.');
            const id = await createListing(req, String(user.id), false);
            return json({ success: true, id }, 201);
        }
        if (path[0] === 'admin' && path[1] === 'kyc' && path[2] && method === 'PUT') {
            const { status } = z.object({ status: z.enum(['approved', 'rejected']) }).parse(await body(req));
            const target = (await database.execute({ sql: "SELECT kyc_document_key FROM users WHERE id=? AND account_type='seller'", args: [path[2]] })).rows[0];
            if (!target) throw new ApiError(404, 'Seller not found.');
            if (status === 'approved' && !target.kyc_document_key) throw new ApiError(400, 'The seller must upload a KYC document before approval.');
            await database.execute({ sql: "UPDATE users SET kyc_status=? WHERE id=?", args: [status, path[2]] });
            return json({ success: true });
        }
        if (path[0] === 'admin' && path[1] === 'properties' && path[2] && path[3] === 'approval' && method === 'PUT') {
            const { approvalStatus } = z.object({ approvalStatus: z.enum(['approved', 'rejected']) }).parse(await body(req));
            const updated = await database.execute({ sql: "UPDATE properties SET approval_status=?,status=CASE WHEN ?='approved' THEN 'available' ELSE 'draft' END WHERE id=? AND approval_status='pending'", args: [approvalStatus, approvalStatus, path[2]] });
            if (!updated.rowsAffected) throw new ApiError(409, 'This listing is no longer awaiting review.');
            return json({ success: true });
        }
        if (path[0] === 'saved' && path[1] && ['POST', 'DELETE'].includes(method)) {
            const exists = await database.execute({ sql: "SELECT id FROM properties WHERE id=? AND status!='draft' AND approval_status='approved'", args: [path[1]] });
            if (!exists.rows.length)
                throw new ApiError(404, 'Property not found.');
            await database.execute({ sql: method === 'POST' ? 'INSERT INTO saved_properties(user_id,property_id) VALUES(?,?) ON CONFLICT(user_id,property_id) DO NOTHING' : 'DELETE FROM saved_properties WHERE user_id=? AND property_id=?', args: [user.id, path[1]] });
            return json({ success: true });
        }
        if (route === 'admin/properties' && method === 'POST') {
            const id = await createListing(req, null, true);
            return json({ success: true, id }, 201);
        }
        if (path[0] === 'admin' && path[1] === 'properties' && path[2] && ['PUT', 'DELETE'].includes(method)) {
            const tx = await database.transaction('write');
            try {
                const existing = await tx.execute({ sql: 'SELECT id FROM properties WHERE id=?', args: [path[2]] });
                if (!existing.rows.length)
                    throw new ApiError(404, 'Property not found.');
                const active = await tx.execute({ sql: "SELECT id FROM payments WHERE property_id=? AND status IN ('pending','paid')", args: [path[2]] });
                if (active.rows.length)
                    throw new ApiError(409, 'This property has an active or completed payment and cannot be changed.');
                if (method === 'DELETE') {
                    await tx.execute({ sql: 'DELETE FROM saved_properties WHERE property_id=?', args: [path[2]] });
                    await tx.execute({ sql: 'DELETE FROM property_images WHERE property_id=?', args: [path[2]] });
                    await tx.execute({ sql: 'DELETE FROM properties WHERE id=?', args: [path[2]] });
                }
                else {
                    const p = propertySchema.parse(await body(req));
                    await tx.execute({ sql: 'UPDATE properties SET title=?,location=?,type=?,description=?,price=?,image=?,status=? WHERE id=?', args: [p.title, p.location, p.type, p.description, p.price, p.image, p.status, path[2]] });
                }
                await tx.commit();
            }
            finally {
                tx.close();
            }
            return json({ success: true });
        }
        if (path[0] === 'admin' && path[1] === 'users' && path[2] && method === 'DELETE') {
            const tx = await database.transaction('write');
            try {
                const target = (await tx.execute({ sql: 'SELECT role FROM users WHERE id=?', args: [path[2]] })).rows[0];
                if (!target)
                    throw new ApiError(404, 'User not found.');
                if (target.role === 'admin')
                    throw new ApiError(403, 'Administrator accounts cannot be deleted here.');
                const pending = await tx.execute({ sql: "SELECT id FROM payments WHERE user_id=? AND status='pending'", args: [path[2]] });
                if (pending.rows.length)
                    throw new ApiError(409, 'Resolve this client’s pending payments before deleting the account.');
                for (const table of ['sessions', 'saved_properties'])
                    await tx.execute({ sql: `DELETE FROM ${table} WHERE user_id=?`, args: [path[2]] });
                await tx.execute({ sql: 'UPDATE payments SET user_id=NULL WHERE user_id=?', args: [path[2]] });
                await tx.execute({ sql: 'DELETE FROM users WHERE id=?', args: [path[2]] });
                await tx.commit();
            }
            finally {
                tx.close();
            }
            return json({ success: true });
        }
        if (route === 'payments/checkout' && method === 'POST') {
            if (user.role !== 'client' || user.account_type !== 'buyer')
                throw new ApiError(403, 'Use a buyer account to purchase property.');
            if (!process.env.PAYCHANGU_SECRET_KEY)
                throw new ApiError(503, 'PayChangu is not configured yet. Please contact Geoking.');
            const { propertyId } = z.object({ propertyId: z.string().uuid() }).parse(await body(req));
            const tx = await database.transaction('write');
            let payment;
            let property;
            try {
                property = (await tx.execute({ sql: 'SELECT * FROM properties WHERE id=?', args: [propertyId] })).rows[0];
                if (!property || property.status !== 'available' || property.approval_status !== 'approved')
                    throw new ApiError(409, 'This property is not available.');
                payment = (await tx.execute({ sql: "SELECT * FROM payments WHERE property_id=? AND status IN ('pending','paid')", args: [propertyId] })).rows[0];
                if (payment) {
                    if (payment.user_id !== user.id || payment.status === 'paid')
                        throw new ApiError(409, 'This property is already reserved.');
                    if (!payment.checkout_url)
                        throw new ApiError(409, 'Your checkout is being prepared. Contact support if it does not appear.');
                }
                else {
                    payment = { id: randomUUID(), amount: property.price };
                    await tx.execute({ sql: 'INSERT INTO payments(id,user_id,property_id,title,amount) VALUES(?,?,?,?,?)', args: [payment.id, user.id, propertyId, property.title, property.price] });
                }
                await tx.commit();
            }
            finally {
                tx.close();
            }
            if (payment.checkout_url)
                return json({ url: payment.checkout_url });
            const origin = new URL(process.env.APP_URL || 'http://localhost:3000').origin;
            // Do not release on timeout: the provider may already have created a payable session.
            const result = await paychangu('payment', { amount: Number(payment.amount), currency: 'MWK', email: user.email, first_name: user.name, tx_ref: payment.id, callback_url: `${origin}/client?payment=${payment.id}`, return_url: `${origin}/client?payment=${payment.id}`, customization: { title: property.title, description: 'Property purchase' } });
            const url = result.data?.checkout_url;
            if (result.status !== 'success' || !url || new URL(url).hostname !== 'checkout.paychangu.com' || new URL(url).protocol !== 'https:')
                throw new ApiError(502, 'Checkout could not be created. Contact support with your pending payment reference.');
            await database.execute({ sql: 'UPDATE payments SET checkout_url=? WHERE id=?', args: [url, payment.id] });
            return json({ url });
        }
        if (path[0] === 'payments' && path[2] === 'verify' && method === 'POST') {
            const payment = (await database.execute({ sql: 'SELECT user_id FROM payments WHERE id=?', args: [path[1]] })).rows[0];
            if (!payment || (user.role !== 'admin' && payment.user_id !== user.id))
                throw new ApiError(404, 'Payment not found.');
            return json({ status: await verifyPayment(path[1]) });
        }
        throw new ApiError(404, 'Endpoint not found.');
    }
    catch (error) {
        if (error instanceof z.ZodError)
            return json({ error: error.issues[0]?.message || 'Invalid input.' }, 400);
        if (error instanceof ApiError)
            return json({ error: error.message }, error.status);
        if (['23505', '40001', '40P01'].includes((error as { code?: string }).code || ''))
            return json({ error: 'This record changed during your request. Please refresh and try again.' }, 409);
        console.error('API request failed', error instanceof Error ? error.message : 'Unknown error');
        return json({ error: 'Something went wrong. Please try again.' }, 500);
    }
}
export function handle(req: Request, context: Parameters<typeof handleRequest>[1]) {
    return withDatabase(() => handleRequest(req,context));
}
