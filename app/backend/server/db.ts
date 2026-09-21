import { createClient } from '@libsql/client';
let client: ReturnType<typeof createClient>;
let ready: Promise<void>;
export async function db() {
    if (!client) {
        if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL)
            throw new Error('DATABASE_URL is required');
        client = createClient({ url: process.env.DATABASE_URL || 'file:geoking.db', authToken: process.env.DATABASE_AUTH_TOKEN });
    }
    if (!ready)
        ready = (async () => {
        await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'client', created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS properties (id TEXT PRIMARY KEY, title TEXT NOT NULL, location TEXT NOT NULL, type TEXT NOT NULL, description TEXT NOT NULL, price INTEGER NOT NULL, image TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'available', created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS payments (id TEXT PRIMARY KEY, user_id TEXT, property_id TEXT NOT NULL, title TEXT NOT NULL, amount INTEGER NOT NULL, currency TEXT NOT NULL DEFAULT 'MWK', status TEXT NOT NULL DEFAULT 'pending', checkout_url TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    CREATE UNIQUE INDEX IF NOT EXISTS property_active_payment ON payments(property_id) WHERE status IN ('pending','paid');
    CREATE TABLE IF NOT EXISTS saved_properties (user_id TEXT NOT NULL, property_id TEXT NOT NULL, PRIMARY KEY(user_id, property_id));
    CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, reset INTEGER NOT NULL);
  `);
        const migrations = [
            ['users', 'account_type', "TEXT NOT NULL DEFAULT 'buyer'"],
            ['users', 'kyc_status', "TEXT NOT NULL DEFAULT 'not_submitted'"],
            ['users', 'kyc_id_number', 'TEXT'],
            ['users', 'kyc_phone', 'TEXT'],
            ['users', 'kyc_address', 'TEXT'],
            ['users', 'kyc_document_key', 'TEXT'],
            ['users', 'kyc_document_type', 'TEXT'],
            ['properties', 'owner_user_id', 'TEXT'],
            ['properties', 'approval_status', "TEXT NOT NULL DEFAULT 'approved'"],
        ] as const;
        for (const [table, column, definition] of migrations) {
            const columns = (await client.execute(`PRAGMA table_info(${table})`)).rows;
            if (!columns.some(item => item.name === column))
                await client.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
        }
        })().catch(error => { ready = undefined; throw error; });
    await ready;
    return client;
}
