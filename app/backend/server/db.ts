import { AsyncLocalStorage } from 'node:async_hooks';
import { Pool, types, type PoolClient } from 'pg';
import certificate from '../../../supabase/ca.json';

type Value = string | number | bigint | boolean | null | Uint8Array;
type Statement = string | { sql: string; args?: Value[] };
type Row = Record<string, string | number | null>;
type Result = { rows: Row[]; rowsAffected: number };
interface Transaction {
    execute(statement: Statement): Promise<Result>;
    commit(): Promise<void>;
    close(): void;
}
interface Database {
    execute(statement: Statement): Promise<Result>;
    transaction(mode?: string): Promise<Transaction>;
    batch(statements: Statement[], mode?: string): Promise<Result[]>;
    close(): void | Promise<void>;
}

types.setTypeParser(20, Number);
types.setTypeParser(1184, value => value);
let sharedDatabase: Database;
const requests = new AsyncLocalStorage<{ database?: Database }>();
export async function withDatabase<T>(run: () => Promise<T>): Promise<T> {
    if (process.env.GEOKING_RUNTIME !== 'cloudflare') return run();
    const scope: { database?: Database } = {};
    return requests.run(scope, async () => { try { return await run(); } finally { await scope.database?.close(); } });
}

function parameters(statement: Statement) {
    const { sql, args = [] } = typeof statement === 'string' ? { sql: statement } : statement;
    let index = 0;
    // Preserve question marks inside quoted SQL literals.
    const text = sql.replace(/'(?:''|[^'])*'|\?/g, token => token === '?' ? `$${++index}` : token);
    if (index !== args.length) throw new Error('Incorrect database parameter count');
    return { text, values: args };
}

export async function db(): Promise<Database> {
    const url = process.env.DATABASE_URL;
    if (!url?.startsWith('postgres')) {
        if (process.env.NODE_ENV === 'production' && !url) throw new Error('DATABASE_URL is required.');
        return await (await import('./sqlite')).db() as unknown as Database;
    }
    const scope = requests.getStore();
    let database = scope?.database || sharedDatabase;
    if (!database) {
        const pool = new Pool({ connectionString: url, ssl: { ca: process.env.DATABASE_SSL_CA || certificate.ca, rejectUnauthorized: true }, max: 2, connectionTimeoutMillis: 30000, idleTimeoutMillis: 60000, query_timeout: 20000, statement_timeout: 15000, keepAlive: true });
        pool.on('error', () => console.error('The database connection was interrupted.'));
        const execute = async (statement: Statement, connection: Pool | PoolClient = pool): Promise<Result> => {
            const result = await connection.query(parameters(statement));
            return { rows: result.rows, rowsAffected: result.rowCount || 0 };
        };
        const transaction = async (): Promise<Transaction> => {
            const connection = await pool.connect();
            try { await connection.query('BEGIN ISOLATION LEVEL SERIALIZABLE'); }
            catch (error) { connection.release(); throw error; }
            let committed = false;
            let closed = false;
            return {
                execute: statement => execute(statement, connection),
                async commit() { await connection.query('COMMIT'); committed = true; },
                close() {
                    if (closed) return;
                    closed = true;
                    if (committed) connection.release();
                    else void connection.query('ROLLBACK').catch(() => undefined).finally(() => connection.release());
                },
            };
        };
        database = {
            execute,
            transaction,
            async batch(statements) {
                const tx = await transaction();
                try {
                    const results = [];
                    for (const statement of statements) results.push(await tx.execute(statement));
                    await tx.commit();
                    return results;
                } finally { tx.close(); }
            },
            close() { return pool.end(); },
        };
    }
    if (scope) scope.database = database;
    else sharedDatabase = database;
    return database;
}
