export default {
  reactStrictMode: true,
  agentRules: false,
  devIndicators: false,
  images: { unoptimized: true },
  serverExternalPackages: ['pg', 'pg-cloudflare'],
  // Node traces pg-cloudflare's empty fallback; Workers need its real socket driver.
  outputFileTracingIncludes: { '/*': ['./node_modules/pg-cloudflare/dist/**/*', './node_modules/pg-cloudflare/esm/**/*'] },
};
