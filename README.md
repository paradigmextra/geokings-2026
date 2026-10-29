# Geoking Consultancy — 2026

Mobile-first GIS, land surveying and property services for clients in Malawi. Built with Next.js, React, TypeScript, Tailwind CSS and libSQL, with administrator and client portals.

## Run locally

Requires Node.js 20.9 or newer; Node 24 is recommended.

```sh
npm ci
node scripts/setup-local.mjs
npm run admin:create
npm run dev
```

Open [localhost:3000](http://localhost:3000). Local administrator access is at `/admin`, using `admin` / `admin`. These are local development credentials; choose unique credentials before public deployment. Configuration and local database files are excluded from Git.

See [SETUP.md](./SETUP.md) for database, account, PayChangu and private document storage configuration. Payment and KYC integrations require their actual service credentials.

## Mobile and search

- Source Sans 3 body text and Manrope headings, served through `next/font`.
- Shared vision and mission cards, phone navigation, readable forms and persistent mobile call/WhatsApp actions.
- Server-rendered content, route metadata, canonical URLs, social previews, business structured data, sitemap and noindex account portals.
- Service-specific enquiry links. The contact form prepares a WhatsApp draft for the client to send; it does not submit a server message.

Set `SITE_URL` to the public HTTPS origin when deploying. See [SEARCH-MARKETING.md](./SEARCH-MARKETING.md) for search launch steps and paid campaign preparation. No paid campaigns or advertising trackers are enabled automatically.

## Verify

```sh
npm run typecheck
npm run lint
npm test
npm run build
# With the local server running:
node scripts/verify-public.mjs
```

The public smoke check uses the default production canonical domain `https://geoking.org`. Update its expectations if deploying under another domain.
