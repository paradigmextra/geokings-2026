import { defineCloudflareConfig } from '@opennextjs/cloudflare';
const config = defineCloudflareConfig();
// Cloudflare's build step must create the Worker before Wrangler's deploy hook.
// Keep the inner Next build separate to prevent recursively invoking OpenNext.
config.buildCommand = 'npm run build:next';
export default config;
