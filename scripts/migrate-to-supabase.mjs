import { createClient } from '@libsql/client';
import pg from 'pg';
import certificate from '../supabase/ca.json' with { type: 'json' };
if (!process.env.DATABASE_URL?.startsWith('postgres')) throw new Error('Set DATABASE_URL to the Supabase server connection.');
const source = createClient({ url: process.env.SOURCE_DATABASE_URL || 'file:geoking.db' });
const target = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { ca: process.env.DATABASE_SSL_CA || certificate.ca, rejectUnauthorized: true } });
const tables = ['users','properties','payments','saved_properties','sessions','rate_limits'];
try {
    await target.connect();
    await target.query('BEGIN');
    for (const table of tables) {
        const rows = (await source.execute(`SELECT * FROM ${table}`)).rows;
        let copied = 0;
        const { rows: columns } = await target.query('SELECT column_name FROM information_schema.columns WHERE table_schema=$1 AND table_name=$2', ['public', table]);
        const allowed = new Set(columns.map(c => c.column_name));
        for (const row of rows) {
            const keys = Object.keys(row).filter(key => allowed.has(key));
            const result = await target.query(`INSERT INTO public.${table} (${keys.map(k => `"${k}"`).join(',')}) VALUES (${keys.map((_, i) => `$${i+1}`).join(',')}) ON CONFLICT DO NOTHING`, keys.map(key => row[key]));
            copied += result.rowCount;
        }
        console.log(`${table}: ${copied} migrated; ${rows.length - copied} already present.`);
    }
    await target.query('COMMIT');
    console.log('Migration complete. The original local database is preserved.');
} catch (error) {
    await target.query('ROLLBACK').catch(() => undefined);
    console.error('Migration failed; transaction rolled back.', error.code || error.name);
    process.exitCode = 1;
} finally {
    source.close();
    await target.end();
}
