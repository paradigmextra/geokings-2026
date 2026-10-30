import PageLoader from '@/components/PageLoader';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import PageHero from '@/components/PageHero';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';
import type { Property } from '@/lib/portal-types';
const money = (n: number) => new Intl.NumberFormat('en-MW', { style: 'currency', currency: 'MWK', maximumFractionDigits: 0 }).format(n);
export default function Properties() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [type, setType] = useState('All');
    useEffect(() => { api('properties').then(r => setProperties(r.properties)).catch(e => setError(e.message)).finally(() => setLoading(false)); }, []);
    const filtered = properties.filter(p => (type === 'All' || p.type === type) && `${p.title} ${p.location}`.toLowerCase().includes(search.toLowerCase()));
    return <Layout><SEO title="Properties for Sale in Malawi | Geoking Real Estate" description="Browse houses, land and commercial properties across Malawi." canonical="/properties"/><PageHero title="Properties" subtitle="Find your next opportunity across Malawi." bgImage="/assets/page-hero-properties.jpg"/><section className="container py-8 sm:py-12"><div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"><Input className="w-full sm:min-w-48 sm:flex-1" aria-label="Search properties" placeholder="Search by title or location" value={search} onChange={e => setSearch(e.target.value)}/><select className="h-10 w-full rounded-md border bg-background px-4 sm:w-auto" aria-label="Property type" value={type} onChange={e => setType(e.target.value)}>{['All', 'House', 'Land', 'Commercial'].map(v => <option key={v}>{v}</option>)}</select><Button className="w-full sm:w-auto" asChild><Link to="/client">Sign in / Create account</Link></Button></div>{loading ? <PageLoader mode="inline"/> : error ? <p role="alert" className="text-destructive">{error}</p> : !filtered.length ? <div className="rounded-2xl border p-8 text-center text-muted-foreground sm:p-12">No properties available yet. Please check back soon.</div> : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map(p => <article key={p.id} className="overflow-hidden rounded-2xl border bg-card shadow-sm"><img src={p.image} alt={p.title} className="w-full h-48 object-cover"/><div className="p-5 sm:p-6"><p className="text-xs capitalize text-muted-foreground mb-2">{p.type} · {p.status}</p><h2 className="font-semibold">{p.title}</h2><p className="text-primary font-bold text-lg my-2">{money(Number(p.price))}</p><p className="text-sm text-muted-foreground flex gap-1"><MapPin size={16}/>{p.location}</p><p className="text-sm mt-3 text-muted-foreground line-clamp-2">{p.description}</p><Button className="mt-5 w-full" asChild><Link to="/client">View in client portal</Link></Button></div></article>)}</div>}</section></Layout>;
}
