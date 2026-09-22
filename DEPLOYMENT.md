# Free client-testing deployment

The quickest deployment for the current code is one Render web service, one Turso database, and one private Cloudflare R2 bucket. Render runs the Next.js frontend and API together. Turso persists users, listings, sessions, and payments. R2 stores private seller KYC documents.

## 1. Create the persistent services

1. Create a free Turso account and database. Copy the libSQL database URL and database auth token.
   Put the database URL and token in `.env.local`, then import `database/schema.sql` with `npm run db:import`. You can alternatively use the Turso dashboard SQL console or `turso db shell YOUR_DATABASE < database/schema.sql`.
2. In Cloudflare R2, create a **private Standard** bucket named `geoking-kyc`.
3. Create an R2 API token limited to Object Read & Write for this bucket. Do not enable its public `r2.dev` URL.

## 2. Deploy from GitHub to Render

1. Push the latest project changes to the existing GitHub repository.
2. In Render, select **New → Blueprint** and connect the repository.
3. Render detects `render.yaml`. Supply every environment variable marked as secret:

   - `DATABASE_URL`: the Turso/libSQL URL.
   - `DATABASE_AUTH_TOKEN`: the Turso token.
   - `APP_URL`: initially use the generated URL, such as `https://geoking-consultancy.onrender.com`.
   - `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`.
   - `PAYCHANGU_SECRET_KEY` and `PAYCHANGU_WEBHOOK_SECRET` when payment testing is ready.

4. Deploy. If `APP_URL` was not known during creation, copy the generated Render URL into `APP_URL` and redeploy. It must exactly match the browser origin or protected form submissions will be rejected.

## 3. Create the production administrator

On your computer, temporarily put the hosted Turso values and a strong admin password in `.env.local`, then run:

```sh
npm run admin:create
```

Restore your local `.env.local` afterward. Do not use `admin` / `admin` on the public deployment.

## 4. Connect a domain

1. In Render, open the web service and choose **Settings → Custom Domains → Add Custom Domain**.
2. Add either `test.yourdomain.com` for client testing or the final root domain.
3. At the domain's DNS provider, add the exact DNS record Render displays. For a subdomain this is normally a CNAME pointing to the service's `onrender.com` hostname.
4. Return to Render and select **Verify**. Render provisions HTTPS automatically.
5. Change `APP_URL` to the final HTTPS domain and redeploy.
6. When PayChangu is enabled, set its webhook to `https://your-domain/api/payments/webhook`.

## Testing limitation

Render's free web service sleeps after 15 minutes without traffic and can take about a minute to wake. It is suitable for a client preview, not a production launch. Its local filesystem is temporary, which is why this project must use hosted Turso and R2 instead of a local SQLite file.
