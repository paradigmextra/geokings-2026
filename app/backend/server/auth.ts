import { cookies } from 'next/headers';
import { createHash, randomBytes } from 'node:crypto';
import { db } from './db';
export class ApiError extends Error {
    constructor(public status: number, message: string) { super(message); }
}
export const digest = (s: string) => createHash('sha256').update(s).digest('hex');
export type PortalRole = 'admin' | 'client';
const sessionCookie = (role: PortalRole) => `geoking_${role}_session`;
export async function currentUser(role: PortalRole) {
    const token = (await cookies()).get(sessionCookie(role))?.value;
    if (!token)
        return null;
    const result = await (await db()).execute({ sql: 'SELECT u.id,u.name,u.email,u.role,u.account_type,u.kyc_status,u.kyc_id_number,u.kyc_phone,u.kyc_address,CASE WHEN u.kyc_document_key IS NULL THEN 0 ELSE 1 END AS kyc_document_uploaded,u.created_at FROM users u JOIN sessions s ON u.id=s.user_id WHERE s.token=? AND s.expires>? AND u.role=?', args: [digest(token), Date.now(), role] });
    return result.rows[0] || null;
}
export async function requireUser(role: PortalRole) {
    const user = await currentUser(role);
    if (!user)
        throw new ApiError(401, 'Please sign in to continue.');
    return user;
}
export async function startSession(id: string, role: PortalRole) {
    const token = randomBytes(32).toString('hex');
    await (await db()).execute({ sql: 'INSERT INTO sessions(token,user_id,expires) VALUES(?,?,?)', args: [digest(token), id, Date.now() + 7 * 86400000] });
    (await cookies()).set(sessionCookie(role), token, { httpOnly: true, secure: new URL(process.env.APP_URL || 'http://localhost:3000').protocol === 'https:', sameSite: 'lax', path: '/', maxAge: 7 * 86400 });
}
export async function endSession(role: PortalRole) {
    const jar = await cookies();
    const token = jar.get(sessionCookie(role))?.value;
    if (token)
        await (await db()).execute({ sql: 'DELETE FROM sessions WHERE token=?', args: [digest(token)] });
    jar.delete(sessionCookie(role));
}
export async function rateLimit(key: string) {
    const database = await db();
    const now = Date.now();
    await database.execute({ sql: 'INSERT INTO rate_limits(key,count,reset) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN rate_limits.reset<? THEN 1 ELSE rate_limits.count+1 END, reset=CASE WHEN rate_limits.reset<? THEN excluded.reset ELSE rate_limits.reset END', args: [digest(key), now + 900000, now, now] });
    const r = await database.execute({ sql: 'SELECT count FROM rate_limits WHERE key=?', args: [digest(key)] });
    if (Number(r.rows[0].count) > 10)
        throw new ApiError(429, 'Too many attempts. Please try again in 15 minutes.');
}
