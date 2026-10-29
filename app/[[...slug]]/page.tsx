import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PublicApp from '../public-app';
import { pageInfo, privatePaths, siteUrl } from '../content/site';
type Props = { params: Promise<{ slug?: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = '/' + ((await params).slug || []).join('/');
  const info = pageInfo[path];
  if (!info) return { title: 'Page Not Found | Geoking', robots: { index: false, follow: false } };
  return {
    ...info, alternates: { canonical: path },
    robots: { index: !privatePaths.includes(path), follow: !privatePaths.includes(path) },
    openGraph: { ...info, type: path.startsWith('/blog/') ? 'article' : 'website', url: path, siteName: 'Geoking Consultancy', locale: 'en_MW', images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Geoking Consultancy — GIS and property services in Malawi' }] },
    twitter: { card: 'summary_large_image', ...info, images: [`${siteUrl}/opengraph-image`] },
  };
}
export default async function Page({ params }: Props) {
  const path = '/' + ((await params).slug || []).join('/');
  if (!pageInfo[path]) notFound();
  return <PublicApp />;
}
