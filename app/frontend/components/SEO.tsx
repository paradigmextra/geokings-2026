// Metadata is rendered on the server by app/[[...slug]]/page.tsx.
// Keep the existing view props as documentation while routes share the Next.js metadata source.
interface SEOProps { title: string; description: string; canonical?: string; image?: string; type?: string; keywords?: string }
export default function SEO(_props: SEOProps) { return null; }
