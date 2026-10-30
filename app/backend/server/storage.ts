import * as r2 from './r2';

const bucket = 'geoking-kyc';
function configuration() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    return url && key ? { url, key } : null;
}
export function privateStorageConfigured() {
    return !!configuration() || r2.r2Configured();
}
async function storage(path: string, method: string, body?: Uint8Array, contentType?: string) {
    const config = configuration();
    if (!config) throw new Error('Private document storage is not configured.');
    const response = await fetch(`${config.url}/storage/v1/${path}`, {
        method, cache: 'no-store', signal: AbortSignal.timeout(30000),
        headers: { apikey: config.key, Authorization: `Bearer ${config.key}`, ...(contentType ? { 'Content-Type': contentType } : {}) },
        ...(body ? { body: new Blob([Buffer.from(body)], { type: contentType }) } : {}),
    });
    if (!response.ok) throw new Error(`Private document storage request failed (${response.status}).`);
    return response;
}
function objectPath(key: string, store = bucket) {
    return `${store}/${key.split('/').map(encodeURIComponent).join('/')}`;
}
export async function putPrivateFile(key: string, bytes: Uint8Array, contentType: string, store = bucket) {
    if (!configuration()) return r2.putPrivateFile(key, bytes, contentType);
    await storage(`object/${objectPath(key, store)}`, 'POST', bytes, contentType);
}
export async function getPrivateFile(key: string, store = bucket) {
    if (!configuration()) return r2.getPrivateFile(key);
    const response = await storage(`object/authenticated/${objectPath(key, store)}`, 'GET');
    return { ContentType: response.headers.get('content-type') || undefined, Body: { transformToByteArray: async () => new Uint8Array(await response.arrayBuffer()) } };
}
export async function deletePrivateFile(key: string, store = bucket) {
    if (!configuration()) return r2.deletePrivateFile(key);
    await storage(`object/${objectPath(key, store)}`, 'DELETE');
}
