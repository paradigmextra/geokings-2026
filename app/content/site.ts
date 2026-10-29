import { serviceData } from './services';
import { posts } from './posts';

// Set SITE_URL to the public HTTPS origin when deploying to a different domain.
export const siteUrl = (process.env.SITE_URL || 'https://geoking.org').replace(/\/$/, '');
export const pageInfo: Record<string, { title: string; description: string }> = {
  '/': { title: 'GIS, Land Surveying & Property Services in Malawi | Geoking', description: 'Geoking Consultancy in Lilongwe offers GIS mapping, land surveying, property valuation, property management and GIS training across Malawi. Discuss your project.' },
  '/about': { title: 'About Geoking Consultancy | Geospatial Experts in Malawi', description: 'Meet Geoking Consultancy, founded in Malawi in 2022. Learn about our team, vision and mission for accurate geospatial and property services.' },
  '/services': { title: 'GIS, Surveying & Property Consultancy Services | Malawi', description: 'Explore land surveying, GIS mapping and training, property valuation, architecture, quantity surveying and land registration services in Malawi.' },
  '/properties': { title: 'Property Listings in Malawi | Geoking Consultancy', description: 'Browse available land, houses and commercial properties in Malawi. Contact Geoking for listing details, viewing arrangements and property guidance.' },
  '/portfolio': { title: 'GIS & Surveying Project Portfolio | Geoking Malawi', description: 'Explore Geoking’s geospatial, land surveying, architectural and property management project portfolio in Malawi.' },
  '/blog': { title: 'GIS, Land & Property Insights in Malawi | Geoking', description: 'Read Geoking’s insights on GIS technology, property valuation, land management and urban planning in Malawi.' },
  '/contact': { title: 'Contact Geoking | GIS & Property Consultancy in Lilongwe', description: 'Discuss your GIS, surveying or property project with Geoking in Area 4, Lilongwe. Call +265 983 333 061 or send your enquiry on WhatsApp.' },
  '/privacy-policy': { title: 'Privacy Policy | Geoking Consultancy', description: 'How Geoking Consultancy handles your personal information and privacy.' },
  '/terms-of-service': { title: 'Terms of Service | Geoking Consultancy', description: 'Terms governing use of Geoking Consultancy’s website and services.' },
  '/cookie-policy': { title: 'Cookie Policy | Geoking Consultancy', description: 'Learn about cookies and your privacy choices on the Geoking website.' },
  '/admin': { title: 'Administrator Sign In | Geoking', description: 'Geoking administrator portal.' },
  '/client': { title: 'Client Portal | Geoking', description: 'Sign in to your Geoking client account.' },
  '/agent-portal': { title: 'Agent Portal | Geoking', description: 'Geoking agent access.' },
};
for (const [slug, service] of Object.entries(serviceData)) {
  pageInfo[`/services/${slug}`] = { title: `${service.title} in Malawi | Geoking`, description: `${service.overview} Contact Geoking in Lilongwe to discuss your project.` };
}
for (const [slug, post] of Object.entries(posts)) {
  pageInfo[`/blog/${slug}`] = { title: `${post.title} | Geoking`, description: post.intro.slice(0, 157).replace(/\s+\S*$/, '') + '…' };
}
export const privatePaths = ['/admin', '/client', '/agent-portal'];
export const publicPaths = Object.keys(pageInfo).filter(path => !privatePaths.includes(path));
