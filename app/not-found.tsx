import Link from 'next/link';
export default function NotFound() {
  return <main className="container py-20 text-center"><p className="section-label">404</p><h1 className="my-4 text-3xl font-bold">We couldn’t find that page</h1><p className="mb-8">Explore Geoking’s GIS, surveying and property services.</p><Link href="/" className="inline-flex min-h-12 items-center rounded-xl bg-primary px-6 text-white">Back to Geoking</Link></main>;
}
