# Geoking search and mobile launch

The site now serves page content and unique metadata in its initial HTML. Titles, descriptions, canonicals, Open Graph cards, a generated sitemap and business structured data use the same public origin. Account portals are marked noindex. Unknown routes return HTTP 404. Set `SITE_URL` to the final public HTTPS domain; set `APP_URL` to the same origin for authenticated requests. The default public domain is the existing `https://geoking.org`.

## Organic search launch

1. Deploy, verify domain ownership in Google Search Console, and submit `/sitemap.xml`.
2. Confirm the office address, phone, hours and services match the real business and Google Business Profile. Do not add unverified ratings or qualifications to structured data.
3. Inspect the homepage and a service URL in Search Console. Check canonicals, rendered content and mobile indexing.
4. Measure real mobile Core Web Vitals after deployment. Local checks do not establish production performance or search ranking.
5. Publish original project information and helpful local service content. Review existing testimonials, project counts and portfolio claims for accuracy before advertising.

## Search advertising preparation

No advertising campaign has been launched or billed. Google Ads access, a budget, confirmed service coverage and conversion configuration are needed before launch.

| Ad group | Example intent | Landing page |
| --- | --- | --- |
| Land surveying | land surveying Malawi; surveyor Lilongwe | `/services/land-surveying` |
| Property valuation | property valuation Malawi; property valuer Lilongwe | `/services/valuation` |
| Property management | property management Lilongwe | `/services/property-management` |
| GIS training | GIS training Malawi; QGIS training Malawi | `/services/gis-trainings` |

Start with tightly matched service terms and locations the business actually serves. Review search terms and exclude unrelated job searches, free downloads and unsupported services. Direct each ad to its matching service page, which includes a quote enquiry and a service-specific WhatsApp message.

Example land surveying copy to review:

- Headline: Land Surveying in Malawi
- Headline: Discuss Your Survey Project
- Description: Boundary and topographic surveys. Speak with Geoking in Lilongwe about your site and request a quote.

Use campaign URLs such as `/services/land-surveying?utm_source=google&utm_medium=cpc&utm_campaign=land_surveying_malawi`. These query variants retain the clean service canonical.

## Measurement

Add the business's actual Google Ads / GA4 identifiers through an approved consent-aware analytics setup. No placeholder tracking IDs are installed. Distinguish `call_click`, `whatsapp_click` and `enquiry_prepared` from confirmed enquiries or sales; a click does not prove that a call connected or that a message was sent. The contact form opens WhatsApp with a draft; it does not claim to submit a server enquiry. Never send client names, emails, phone numbers or message contents into analytics events.

Useful outcome measures: qualified enquiries, cost per qualified enquiry, booked site visits and completed service engagements. Agree on a budget and success criteria before enabling paid traffic.

References: [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Google mobile-first guidance](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing), [Google Ads landing pages](https://support.google.com/google-ads/answer/14086), [Next.js metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).
