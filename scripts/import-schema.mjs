import { createClient } from '@libsql/client';
import { readFile } from 'node:fs/promises';

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url?.startsWith('libsql://'))
    throw new Error('Set DATABASE_URL to your hosted libsql:// Turso URL in .env.local.');
if (!authToken)
    throw new Error('Set DATABASE_AUTH_TOKEN to your Turso database token in .env.local.');

const schema = await readFile(new URL('../database/schema.sql', import.meta.url), 'utf8');
const database = createClient({ url, authToken });

try {
    await database.executeMultiple(schema);
    const tables = await database.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
    console.log(`Database schema imported. Tables: ${tables.rows.map(row => row.name).join(', ')}`);
}
finally {
    database.close();
}
