import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Clock3, BookOpenText } from 'lucide-react';
import Layout from '@/components/Layout';
import EditorialHero from '@/components/EditorialHero';
import InsightArtwork from '@/components/InsightArtwork';
import { posts as content } from '../../content/posts';

const articles = [
  { slug: 'urban-planning-lilongwe', excerpt: 'How geospatial data can help address rapid urbanisation in Malawi’s capital city.', date: '2026-02-15', category: 'Urban Planning' },
  { slug: 'property-valuation-guide', excerpt: 'Understand what influences property values and why an independent valuation matters.', date: '2026-02-10', category: 'Property' },
  { slug: 'gis-technology-agriculture', excerpt: 'Explore the role of geospatial technology in precision farming and crop management.', date: '2026-02-03', category: 'GIS Technology' },
  { slug: 'understanding-malawi-land-laws', excerpt: 'An introduction to the Land Act 2016 and the questions property owners should ask.', date: '2026-01-15', category: 'Land Laws' },
].map(article => ({ ...article, title: content[article.slug].title, readingTime: Math.max(1, Math.ceil([content[article.slug].intro, ...content[article.slug].sections.map(section => section.body)].join(' ').split(/\s+/).length / 220)) }));
const topics = ['All insights', 'Land Laws', 'GIS Technology', 'Property', 'Urban Planning'];
function DateAndRead({ article }: { article: typeof articles[number] }) {
  return <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1.5"><CalendarDays size={14} aria-hidden="true"/><time dateTime={article.date}>{new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(article.date))}</time></span><span className="inline-flex items-center gap-1.5"><Clock3 size={14} aria-hidden="true"/>{article.readingTime} min read</span></div>;
}
export default function Blog() {
  const [topic, setTopic] = useState('All insights');
  const filtered = articles.filter(article => topic === 'All insights' || article.category === topic);
  const [featured, ...rest] = filtered;
  return <Layout>
    <EditorialHero eyebrow="Insights" title="A fresh perspective on land & property." description="Ideas, practical guides and local perspectives on GIS, land management and property decisions in Malawi." image="/assets/page-hero-blog.jpg" imageAlt="A laptop displaying articles and mapping content"/>
    <section className="py-14 sm:py-20"><div className="container">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><span className="section-label">From the Geoking team</span><h2 className="font-heading mt-2 text-3xl font-semibold">Explore our latest thinking.</h2></div><p className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite"><BookOpenText size={18} className="text-primary"/>{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}</p></div>
      <div aria-label="Filter articles by topic" className="mb-9 flex flex-wrap gap-2">{topics.map(label => <button key={label} type="button" aria-pressed={topic === label} onClick={() => setTopic(label)} className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${topic === label ? 'border-primary bg-primary text-white' : 'border-border bg-white text-secondary hover:border-primary'}`}>{label}</button>)}</div>
      {featured && <article className="mb-7 grid overflow-hidden rounded-3xl border bg-[#f5f8f2] md:grid-cols-2"><div className="relative aspect-[16/10] overflow-hidden bg-[#eaf2ee] md:aspect-auto md:min-h-80"><InsightArtwork topic={featured.category}/></div><div className="flex flex-col justify-center p-6 sm:p-9"><p className="mb-4 text-xs font-semibold uppercase tracking-[.15em] text-primary">{topic === 'All insights' ? 'Latest insight' : featured.category}</p><DateAndRead article={featured}/><h3 className="font-heading mt-4 text-2xl font-semibold leading-snug text-secondary sm:text-3xl"><Link to={`/blog/${featured.slug}`} className="hover:text-primary">{featured.title}</Link></h3><p className="mt-4 leading-relaxed text-muted-foreground">{featured.excerpt}</p><Link to={`/blog/${featured.slug}`} className="mt-6 inline-flex min-h-11 w-fit items-center gap-4 font-semibold text-primary">Read the article <ArrowUpRight size={18}/></Link></div></article>}
      <div className="grid gap-6 md:grid-cols-3">{rest.map(article => <article key={article.slug} className="overflow-hidden rounded-2xl border bg-white"><div className="aspect-[16/10] overflow-hidden bg-[#eaf2ee]"><InsightArtwork topic={article.category}/></div><div className="p-6"><p className="mb-3 text-xs font-semibold uppercase tracking-[.12em] text-primary">{article.category}</p><DateAndRead article={article}/><h3 className="font-heading mt-4 text-xl font-semibold leading-snug text-secondary"><Link to={`/blog/${article.slug}`} className="hover:text-primary">{article.title}</Link></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p><Link to={`/blog/${article.slug}`} aria-label={`Read ${article.title}`} className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-primary">Read article <ArrowUpRight size={17}/></Link></div></article>)}</div>
    </div></section>
  </Layout>;
}
