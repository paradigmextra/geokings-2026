import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

function configuration() {
    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucket = process.env.R2_BUCKET_NAME;
    if (!accountId || !accessKeyId || !secretAccessKey || !bucket)
        throw new Error('Cloudflare R2 is not configured.');
    return { accountId, accessKeyId, secretAccessKey, bucket };
}

function client() {
    const config = configuration();
    return { bucket: config.bucket, storage: new S3Client({ region: 'auto', endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`, credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey } }) };
}

export function r2Configured() {
    return !!(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_BUCKET_NAME);
}

export async function putPrivateFile(key: string, bytes: Uint8Array, contentType: string) {
    const { bucket, storage } = client();
    await storage.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: bytes, ContentType: contentType }));
}

export async function getPrivateFile(key: string) {
    const { bucket, storage } = client();
    return storage.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
}

export async function deletePrivateFile(key: string) {
    const { bucket, storage } = client();
    await storage.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}
