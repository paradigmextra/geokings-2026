# Geoking application setup

The application uses Next.js route handlers, Supabase PostgreSQL and private Supabase Storage. Buyer, seller and administrator accounts retain the existing bcrypt/password and HTTP-only session authentication. Application accounts are in `public.users`; this integration does not create Supabase Auth identities.

## Supabase

Use the migrations in `supabase/migrations` in order. They create eight application tables with foreign keys, indexes, checks and row-level security: users, sessions, properties, property_images, payments, saved_properties, contact_messages and rate_limits.

The migrations create a `geoking_backend` role without login. Assign that role a strong generated password from a trusted database administration session, then use its Supabase pooler connection in `DATABASE_URL`. The role has only application-table access. Anonymous and Supabase authenticated API roles cannot read private application data. The publishable key is never a server credential.

Required environment values:

- `DATABASE_URL`: restricted PostgreSQL pooler connection, with URL-encoded password.
- `NEXT_PUBLIC_SUPABASE_URL`: the project HTTPS URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: public project key.
- `SUPABASE_SERVICE_ROLE_KEY`: server-only key for private file storage.
- `APP_URL`: exact site origin, used for request-origin checking and HTTPS cookie settings.
- `SITE_URL`: public origin for canonical URLs and search metadata.

The supplied project has already been provisioned and the local environment configured. The temporary management access token is not needed at runtime and is not saved in the repository. The official Supabase root certificate is included in `supabase/ca.json`; PostgreSQL TLS certificate and hostname verification remain enabled.

Create two **private** storage buckets:

- `geoking-kyc`: maximum 5 MB; JPEG, PNG, WebP and PDF documents.
- `geoking-properties`: maximum 3 MB; JPEG, PNG and WebP images.

No public storage policy is required. KYC files are retrieved only through an administrator-authorized API. Unapproved property photos are available only to the owner and administrators. Approved photos are served through the application; the bucket remains private.

For migration of an existing local database:

```sh
npm run db:migrate:supabase
```

The original local database is preserved. Migration inserts run in a transaction and existing primary keys are not overwritten. Back up both databases before migrating a separate installation.

## Localhost

```sh
npm ci
# Set .env.local using .env.example and the values above.
npm run dev
```

Open http://localhost:3000. Administrator access is at `/admin`; buyer and seller registration is at `/client`. Existing local administrator credentials are preserved. Use Account/Settings to change the password, or configure `ADMIN_USERNAME`, `ADMIN_PASSWORD` and `ADMIN_NAME` and run `npm run admin:create` from a trusted environment. Do not use the development admin/admin credentials for a public deployment.

A `file:` DATABASE_URL is retained for isolated SQLite development/tests only. Hosted Workers must use the Supabase PostgreSQL connection.

## Cloudflare Workers

The repository contains `wrangler.jsonc` and `open-next.config.ts`. The Worker name and self-reference service must both be **geokings-2026**. This fixes the deployment failure caused by a generated self-reference to the old starter package name.

Cloudflare Workers Builds can use:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

Wrangler's checked-in build command packages the Next.js output with OpenNext before upload. The adapter and Wrangler are pinned in package-lock.json; deployment does not run a migration wizard or generate configuration. The OpenNext CLI also supports `npm run build:cloudflare` and `npm run deploy`.

Add the Supabase database connection and storage service key as **Worker secrets**, and configure the other environment values on the Worker. Build-environment variables alone do not configure runtime secrets. Set APP_URL to the actual HTTPS Worker/custom-domain origin, not localhost. Add NEXT_PUBLIC values to the build environment as well. No local environment file is committed or uploaded.

`GEOKING_RUNTIME=cloudflare` is configured in Wrangler. Database pools are scoped and closed per Worker request so TCP connections are not shared across request contexts. The SQLite package is aliased to its web driver in the Worker bundle; production uses PostgreSQL. Native image processing is avoided in API handlers: the browser resizes upload images, and the server verifies format, dimensions, photo count and byte limits. Next/Image serves existing assets without a paid Cloudflare Images binding.

## Listings, enquiries and payments

Sellers must complete KYC before submitting listings. Seller submissions are drafts pending admin approval and remain hidden from the catalogue and buyer dashboards. Admin → Listing approvals allows photo/detail review, approval or rejection. Only approved available properties can be purchased by buyer accounts.

The upload form accepts up to six photos, 3 MB each and up to 20 megapixels, with minimum dimensions 640 x 480. It prepares images to fit within 2,000 x 1,600 pixels. The server also checks image signatures/dimensions and limits the total multipart body to 20 MB. Titles allow 100 characters, locations 150, and descriptions 300 words / 3,000 characters. Photo references, descriptions, prices and review state are stored in PostgreSQL.

Public enquiries and signed-in contact messages are saved to the admin Contact section. Signed-in users can see their own enquiries and administrator replies. Public enquiries retain the sender's supplied contact details for a direct response; this application does not send reply emails automatically.

Set server-side `PAYCHANGU_SECRET_KEY` and `PAYCHANGU_WEBHOOK_SECRET` to activate checkout. Configure the webhook at `https://your-origin/api/payments/webhook`. Reference, currency, full asking price and successful provider status are checked before payment is marked paid and the property sold. A unique database index prevents two active purchases of one property. Pending checkouts remain reserved until reconciled with the provider. No test payment is reported as a real sale.

Legal transfer is arranged separately with Geoking. Without payment credentials, checkout remains disabled with a clear explanation. Payment cancellation, refunds, email verification and self-service password reset are not implemented.

## Verification

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:integration
# Against the configured running Supabase-backed localhost app:
npm run verify:supabase
node scripts/verify-public.mjs
npm run build:cloudflare
```

The Supabase verification creates uniquely named temporary accounts, listings and files, tests buyer/seller/admin boundaries and cleans up those exact fixtures. Run it only against a development or staging installation. It does not make a real payment.
