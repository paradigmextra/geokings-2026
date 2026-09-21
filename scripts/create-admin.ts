import { db } from '../app/backend/server/db';
import { hash } from 'bcryptjs';
import { randomUUID } from 'node:crypto';
const username = (process.env.ADMIN_USERNAME || process.env.ADMIN_EMAIL || 'admin').trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
if (!/^[a-z0-9._@+-]{1,254}$/.test(username) || !password || Buffer.byteLength(password) > 72)
    throw new Error('Set ADMIN_USERNAME and ADMIN_PASSWORD (1–72 bytes) in .env.local.');
const database = await db();
await database.execute({ sql: 'INSERT INTO users(id,name,email,password,role) VALUES(?,?,?,?,?) ON CONFLICT(email) DO UPDATE SET password=excluded.password, role=excluded.role, name=excluded.name', args: [randomUUID(), process.env.ADMIN_NAME || 'Administrator', username, await hash(password, 12), 'admin'] });
await database.execute({ sql: 'DELETE FROM sessions WHERE user_id IN (SELECT id FROM users WHERE email=?)', args: [username] });
console.log('Administrator account ready. Sign in at /admin.');
database.close();
