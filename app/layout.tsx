import './frontend/index.css';
import type { Metadata, Viewport } from 'next';
import { Manrope, Source_Sans_3 } from 'next/font/google';
import { siteUrl } from './content/site';
const bodyFont = Source_Sans_3({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const headingFont = Manrope({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title: 'Geoking Consultancy | GIS & Property Services in Malawi',
  description: 'GIS mapping, land surveying, property valuation and property management in Malawi.',
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#1b7e75' };
const business = {
  '@context': 'https://schema.org', '@type': 'ProfessionalService',
  '@id': `${siteUrl}/#business`, name: 'Geoking Consultancy', url: siteUrl,
  logo: `${siteUrl}/assets/logo.png`, image: `${siteUrl}/assets/hero-bg.jpg`,
  telephone: '+265983333061', email: 'Info@geoking.org', foundingDate: '2022-05-12',
  address: { '@type': 'PostalAddress', streetAddress: 'Area 4, Off Paul Kagame Road', addressLocality: 'Lilongwe', addressCountry: 'MW' },
  areaServed: { '@type': 'Country', name: 'Malawi' },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '12:00' },
  ],
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-MW"><body className={`${bodyFont.variable} ${headingFont.variable}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business).replace(/</g, '\\u003c') }} />
    {children}
  </body></html>;
}
