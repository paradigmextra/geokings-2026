import SocialLinks from "./SocialLinks";
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { serviceData } from '../../content/services';

export default function Footer() {
  return <footer className="site-footer relative shrink-0 bg-[#102e34] pb-[calc(5rem+env(safe-area-inset-bottom))] text-white md:pb-0">
    <div>
    <div className="bg-[#f1f3ec] text-secondary">
      <div className="container grid gap-7 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">Your next project starts here</p><h2 className="max-w-2xl font-heading text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-5xl">A clearer view.<br/>A better way forward.</h2></div>
        <Link to="/contact" className="inline-flex min-h-14 w-fit items-center gap-4 rounded-full bg-secondary px-5 text-sm font-semibold sm:gap-8 sm:px-7 sm:text-base text-white transition-colors hover:bg-primary">Let’s talk about your project <ArrowUpRight size={21} aria-hidden="true"/></Link>
      </div>
    </div>
    <div className="container pt-12 sm:pt-16">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-white/15 pb-10 lg:grid-cols-[1.25fr_.7fr_1.4fr] lg:gap-16">
        <div className="col-span-2 lg:col-span-1">
          <Link to="/" aria-label="Geoking home" className="inline-flex items-center gap-3"><img src="/assets/logo.png" alt="" width={48} height={48} className="h-12 w-12 rounded-xl bg-white p-1"/><span className="font-heading text-xl font-bold tracking-tight">GEOKING<span className="text-teal-300">.</span></span></Link>
          <p className="mt-5 max-w-xs text-base leading-relaxed text-white/70">Local knowledge.<br/>Geospatial precision.<br/>Property decisions made clearer.</p>
          <address className="mt-6 text-sm not-italic leading-relaxed text-white/70">Area 4, Off Paul Kagame Road<br/>Lilongwe, Malawi</address>
          <p className="mt-3 text-xs leading-relaxed text-white/60">Mon–Fri 08:00–17:00 · Sat 08:00–12:00</p>
        </div>
        <nav aria-label="Footer explore"><h3 className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-teal-200">Explore</h3><ul className="space-y-1 text-sm">{[['About Geoking','/about'],['Properties','/properties'],['Our work','/portfolio'],['Insights','/blog'],['Contact','/contact'],['Client portal','/client'],['Agent portal','/agent-portal']].map(([label,path]) => <li key={path}><Link to={path} className="inline-flex min-h-10 items-center text-white/80 transition-colors hover:text-teal-200">{label}</Link></li>)}</ul></nav>
        <nav aria-label="Footer services"><h3 className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-teal-200">Our expertise</h3><ul className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{Object.entries(serviceData).map(([slug,service]) => <li key={slug}><Link to={`/services/${slug}`} className="flex min-h-11 items-center py-2 text-sm leading-snug text-white/80 transition-colors hover:text-teal-200">{service.title}</Link></li>)}</ul></nav>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/15 py-7"><p className="text-sm font-medium text-white/80">Connect with Geoking</p><SocialLinks/></div>

    </div>
    </div>
    <div className="site-footer-summary container py-8 md:py-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Footer links" className="mt-2 flex flex-wrap gap-x-5 text-sm text-white/85 md:mt-0 md:order-2"><Link to="/about" className="inline-flex min-h-11 items-center hover:text-teal-200">About</Link><Link to="/contact" className="inline-flex min-h-11 items-center hover:text-teal-200">Contact</Link><Link to="/privacy-policy" className="inline-flex min-h-11 items-center hover:text-teal-200">Privacy</Link><Link to="/terms-of-service" className="inline-flex min-h-11 items-center hover:text-teal-200">Terms</Link></nav>
        <p className="border-t border-white/15 pt-4 text-xs text-white/65 md:order-1 md:border-0 md:pt-0">© {new Date().getFullYear()} Geoking Consultancy.</p>
      </div>
    </div>
  </footer>;
}
