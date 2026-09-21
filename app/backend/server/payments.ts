import { db } from './db';
import { ApiError } from './auth';
export async function paychangu(path: string, body?: unknown) {
    if (!process.env.PAYCHANGU_SECRET_KEY)
        throw new ApiError(503, 'Mobile-money payments are not configured yet. Please contact Geoking.');
    const response = await fetch(`https://api.paychangu.com/${path}`, {
        method: body ? 'POST' : 'GET', cache: 'no-store', signal: AbortSignal.timeout(20000),
        headers: { Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`, 'Content-Type': 'application/json', Accept: 'application/json' },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });
    if (!response.ok)
        throw new ApiError(502, 'The payment provider is unavailable. Please try again.');
    return response.json();
}
export async function verifyPayment(id: string) {
    const database = await db();
    const payment = (await database.execute({ sql: 'SELECT * FROM payments WHERE id=?', args: [id] })).rows[0];
    if (!payment)
        throw new ApiError(404, 'Payment not found.');
    if (payment.status === 'paid')
        return 'paid';
    const result = await paychangu(`verify-payment/${encodeURIComponent(id)}`);
    const data = result.data;
    if (result.status !== 'success' || !data || data.tx_ref !== id || data.currency !== payment.currency || Number(data.amount) !== Number(payment.amount))
        throw new ApiError(502, 'Payment details could not be verified.');
    if (data.status === 'success') {
        await database.batch([
            { sql: "UPDATE payments SET status='paid' WHERE id=?", args: [id] },
            { sql: "UPDATE properties SET status='sold' WHERE id=?", args: [payment.property_id] },
        ], 'write');
        return 'paid';
    }
    // Keep the reservation until the provider confirms success. Failed checkout attempts
    // can be retried on the same hosted session; they must not release the property.
    return 'pending';
}
