// @vitest-environment node
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { db } from './db';
import { verifyPayment } from './payments';
let database: Awaited<ReturnType<typeof db>>;
beforeAll(async () => {
    process.env.DATABASE_URL = 'file::memory:';
    process.env.PAYCHANGU_SECRET_KEY = 'test-only';
    database = await db();
    await database.execute("INSERT INTO properties(id,title,location,type,description,price,image) VALUES('property','Test','Lilongwe','Land','Test property',1000,'/assets/property-land.jpg')");
    await database.execute("INSERT INTO payments(id,user_id,property_id,title,amount) VALUES('reference','client','property','Test',1000)");
});
afterAll(() => { vi.unstubAllGlobals(); database.close(); });
function response(overrides: Record<string, unknown> = {}) {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ status: 'success', data: { tx_ref: 'reference', currency: 'MWK', amount: 1000, status: 'success', ...overrides } })));
}
describe('Verified property payments', () => {
    it('rejects wrong amounts, currencies and references', async () => {
        for (const mismatch of [{ amount: 1 }, { currency: 'USD' }, { tx_ref: 'other' }]) {
            response(mismatch);
            await expect(verifyPayment('reference')).rejects.toThrow('could not be verified');
            expect((await database.execute("SELECT status FROM properties WHERE id='property'")).rows[0].status).toBe('available');
        }
    });
    it('keeps reservations pending for retryable provider failures', async () => {
        response({ status: 'failed' });
        expect(await verifyPayment('reference')).toBe('pending');
        await expect(database.execute("INSERT INTO payments(id,user_id,property_id,title,amount) VALUES('other','other-client','property','Test',1000)")).rejects.toThrow();
    });
    it('atomically marks the payment paid and property sold, then handles duplicates', async () => {
        response();
        expect(await verifyPayment('reference')).toBe('paid');
        expect((await database.execute("SELECT status FROM properties WHERE id='property'")).rows[0].status).toBe('sold');
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Must not call provider twice')));
        expect(await verifyPayment('reference')).toBe('paid');
    });
});
