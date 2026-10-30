import type { ApiResult } from './portal-types';
export class ApiRequestError extends Error {
    constructor(message: string, public status: number) { super(message); this.name = 'ApiRequestError'; }
}
export async function api<T = ApiResult>(path: string, method = 'GET', data?: unknown): Promise<T> {
    return request<T>(path, method, data);
}
export function portalApi<T = ApiResult>(portal: 'admin' | 'client', path: string, method = 'GET', data?: unknown): Promise<T> {
    return request<T>(path, method, data, portal);
}
export async function portalUpload<T = ApiResult>(portal: 'admin' | 'client', path: string, data: FormData): Promise<T> {
    const response = await fetch(`/api/${path}`, { method: 'POST', credentials: 'same-origin', headers: { 'X-Geoking-Portal': portal }, body: data });
    const result = await response.json();
    if (!response.ok) throw new ApiRequestError(result.error || 'Upload failed.',response.status);
    return result;
}

async function request<T>(path: string, method: string, data: unknown, portal?: 'admin' | 'client'): Promise<T> {
    const response = await fetch(`/api/${path}`, {
        method,
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', ...(portal ? { 'X-Geoking-Portal': portal } : {}) },
        ...(data ? { body: JSON.stringify(data) } : {}),
    });
    const result = await response.json();
    if (!response.ok)
        throw new ApiRequestError(result.error || 'Request failed.',response.status);
    return result;
}
