import { randomUUID } from 'node:crypto';
import { imageSize } from 'image-size';
import { z } from 'zod';
import { db } from './db';
import { ApiError } from './auth';
import { putPrivateFile, deletePrivateFile, privateStorageConfigured } from './storage';
import { countWords, MAX_DESCRIPTION_WORDS, MAX_PROPERTY_PHOTOS, MAX_PHOTO_BYTES } from '../../content/listing-limits';

export const propertySchema = z.object({
    title: z.string().trim().min(3).max(100), location: z.string().trim().min(3).max(150),
    type: z.enum(['House','Land','Commercial']),
    description: z.string().trim().min(10).max(3000).refine(value => countWords(value) <= MAX_DESCRIPTION_WORDS, 'Use no more than 300 words.'),
    price: z.number().int().positive().max(999999999),
    image: z.string().regex(/^(?:\/assets\/[\w.-]+\.(?:jpg|png|webp)|\/api\/property-images\/[a-f\d-]{36})$/),
    status: z.enum(['available','draft']).default('available'),
});

async function limitedForm(req: Request) {
    const reader = req.body?.getReader();
    if (!reader) throw new ApiError(400, 'Please include your property details.');
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > 20 * 1024 * 1024) { await reader.cancel(); throw new ApiError(413, 'The total upload is too large.'); }
        chunks.push(value);
    }
    return new Response(Buffer.concat(chunks), { headers: { 'Content-Type': req.headers.get('content-type') || '' } }).formData();
}

export async function createListing(req: Request, ownerId: string | null, admin: boolean) {
    const multipart = req.headers.get('content-type')?.includes('multipart/form-data');
    const form = multipart ? await limitedForm(req) : null;
    const raw = form ? '' : await req.text();
    if (raw.length > 20000) throw new ApiError(413,'Request is too large.');
    let input;
    try { input = form ? Object.fromEntries(form.entries()) : JSON.parse(raw); } catch { throw new ApiError(400,'Invalid property details.'); }
    const files = form?.getAll('photos').filter((file): file is File => file instanceof File && file.size > 0) || [];
    if (form && (!files.length || files.length > MAX_PROPERTY_PHOTOS)) throw new ApiError(400, 'Upload between 1 and 6 property photos.');
    const p = propertySchema.parse({ ...input, price: Number(input.price), image: input.image || '/assets/property-house.jpg' });
    const prepared: { id: string; key: string; bytes: Buffer; contentType: string }[] = [];
    for (const file of files) {
        if (file.size > MAX_PHOTO_BYTES) throw new ApiError(413, 'Each photo must be 3 MB or smaller.');
        if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new ApiError(400, 'Use JPG, PNG or WebP photos.');
        try {
            const bytes = Buffer.from(await file.arrayBuffer());
            const metadata = imageSize(bytes);
            if (!['jpg','png','webp'].includes(metadata.type || '') || !metadata.width || !metadata.height || metadata.width < 640 || metadata.height < 480 || metadata.width > 2000 || metadata.height > 1600)
                throw new Error('Invalid image format or dimensions');
            const id = randomUUID();
            prepared.push({ id, key: `properties/${ownerId || 'admin'}/${id}.${metadata.type}`, bytes, contentType: metadata.type === 'jpg' ? 'image/jpeg' : `image/${metadata.type}` });
        } catch { throw new ApiError(400, 'Use valid property photos at least 640 × 480 pixels, resized to no more than 2,000 × 1,600 pixels.'); }
    }
    if (prepared.length && !privateStorageConfigured()) throw new ApiError(503, 'Property photo storage is unavailable.');
    const database = await db();
    const uploaded: string[] = [];
    let tx: Awaited<ReturnType<typeof database.transaction>> | undefined;
    const id = randomUUID();
    try {
        for (const photo of prepared) {
            await putPrivateFile(photo.key, photo.bytes, photo.contentType, 'geoking-properties');
            uploaded.push(photo.key);
        }
        tx = await database.transaction('write');
        await tx.execute({ sql: 'INSERT INTO properties(id,title,location,type,description,price,image,status,owner_user_id,approval_status) VALUES(?,?,?,?,?,?,?,?,?,?)', args: [id,p.title,p.location,p.type,p.description,p.price,prepared.length ? `/api/property-images/${prepared[0].id}` : p.image,admin ? p.status : 'draft',ownerId,admin ? 'approved' : 'pending'] });
        for (const [position, photo] of prepared.entries()) await tx.execute({ sql: 'INSERT INTO property_images(id,property_id,storage_key,position) VALUES(?,?,?,?)', args: [photo.id,id,photo.key,position] });
        await tx.commit();
        return id;
    } catch (error) {
        await Promise.all(uploaded.map(key => deletePrivateFile(key,'geoking-properties').catch(() => undefined)));
        throw error;
    } finally { tx?.close(); }
}

export async function withPhotos<T extends Record<string, string | number | null>>(properties: T[]) {
    if (!properties.length) return properties;
    const photos = (await (await db()).execute({ sql: `SELECT id,property_id FROM property_images WHERE property_id IN (${properties.map(() => '?').join(',')}) ORDER BY position`, args: properties.map(p => p.id) })).rows;
    return properties.map(p => ({ ...p, photos: photos.filter(photo => photo.property_id === p.id).map(photo => `/api/property-images/${photo.id}`) }));
}
