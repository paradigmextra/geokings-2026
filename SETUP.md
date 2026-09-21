# Geoking admin and client portal

This application runs on Next.js with API route handlers and a persistent libSQL database. All browser code is under `app/frontend`; database, authentication, API, and payment code is under `app/backend`. The small `app/api` route only exposes the backend through Next.js.

## Local setup

Requires Node.js 20.9+ (Node 24 recommended).

```sh
npm install
node scripts/setup-local.mjs
npm run admin:create
npm run dev
```

Open `/admin` and use username `admin` with password `admin`. These requested local credentials are also recorded in `ADMIN-ACCESS.local`, which is excluded from Git. Set `ADMIN_USERNAME`, `ADMIN_PASSWORD` (1–72 UTF-8 bytes), and `ADMIN_NAME` in `.env.local` before running `npm run admin:create` to use different credentials. Running that command again updates the administrator and revokes its existing sessions. Change the default credentials before any public deployment.

Clients register and sign in at `/client` as buyers or sellers. Sellers submit their details and an ID document for administrator KYC review before they can submit property listings. Seller listings also require administrator approval before appearing to buyers or on the public website. Rejected KYC submissions can be corrected and re-uploaded. Both portals use one shared layout, design system, and API.

No fictitious properties or prices are seeded. Add actual listings in Admin → Properties. Drafts are hidden from clients. Images currently use the three supplied property assets; uploading photos is not implemented.

## Cloudflare R2 for private KYC documents

Create a private R2 Standard bucket, create an R2 API token with Object Read & Write access limited to that bucket, and set `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, and `R2_BUCKET_NAME`. Do not enable the public `r2.dev` URL for this bucket. The server accepts JPG, PNG, WebP, and PDF files up to 5 MB. Documents are retrieved through an administrator-authenticated API route and are never exposed in public listing data. Re-uploading replaces the database reference and deletes the previous R2 object.

## PayChangu / mobile money

Set these **server-side** environment values:

- `APP_URL`: the site's origin (for example `https://your-domain.com`), also used to validate mutation origins.
- `PAYCHANGU_SECRET_KEY`: your PayChangu sandbox secret key first; use a live key only after testing.
- `PAYCHANGU_WEBHOOK_SECRET`: the webhook signing secret configured in your PayChangu dashboard.

Configure PayChangu's webhook URL as `https://your-domain.com/api/payments/webhook` and enable checkout payment notifications. Local webhook testing needs an HTTPS tunnel and matching `APP_URL`. The checkout redirects to `/client`, where the server verifies the transaction. Webhooks also verify the signature and independently retrieve the transaction. Reference, MWK currency, amount, and successful provider status must match before recording a payment and marking the property sold. Never mark a property paid based on browser query parameters.

Checkout charges the full property price in MWK. Legal transfer remains a separate process with Geoking. There are no pretend successful payments. Without PayChangu credentials the payment button is disabled and API requests return a configuration error.

The database reserves a property for one active checkout to prevent double purchases. Pending transactions remain reserved because a failed attempt or network timeout may still leave a payable provider session. Clients can resume a generated checkout and admins can recheck provider status. A timeout during checkout creation may require operator reconciliation with PayChangu. Do not manually release a reservation until the provider confirms the checkout cannot settle. Refunds, reservation expiry, and cancellation workflows are not implemented.

## Production

Use a persistent hosted libSQL/Turso `DATABASE_URL` and `DATABASE_AUTH_TOKEN` for serverless hosting. A local `file:` database is suitable only for a single server with a persistent writable disk and backups, not ephemeral Vercel storage. Add all environment variables to your host and run `npm run admin:create` against that database from a trusted environment. Set a unique administrator username and strong password. No admin is created automatically at runtime.

```sh
npm run typecheck
npm test
npm run build
npm start
```

Authentication uses bcrypt password hashes and hashed random session tokens in HTTP-only, SameSite cookies (Secure on HTTPS). Authorization is checked in every protected API endpoint. Account deletion revokes sessions and removes favourites; historical payments remain with the customer detached. Admin accounts and users with pending payments cannot be deleted through the dashboard. Authentication is rate-limited per login identifier in the database. Set `TRUST_PROXY=true` only behind a proxy that replaces `X-Forwarded-For` to additionally rate-limit by IP. Apply a production edge rate limit to public registration. Email verification and self-service password reset are not yet provided.

The API initializes its tables on first use. Back up the database before future schema changes. Run the integration test against an isolated database; never against production.

References: [Next.js migration guide](https://nextjs.org/docs/app/guides/migrating/from-vite), [PayChangu checkout](https://developer.paychangu.com/docs/standard-checkout), [verification](https://developer.paychangu.com/docs/transaction-verification), [webhooks](https://developer.paychangu.com/docs/webhooks).
