import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { serviceData } from '../../content/services';

export default function Footer() {
  return <footer className="bg-[#102e34] text-white">
    <div className="bg-[#f1f3ec] text-secondary">
      <div className="container grid gap-7 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-primary">Your next project starts here</p><h2 className="max-w-2xl font-heading text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-5xl">A clearer view.<br/>A better way forward.</h2></div>
        <Link to="/contact" className="inline-flex min-h-14 w-fit items-center gap-8 rounded-full bg-secondary px-7 font-semibold text-white transition-colors hover:bg-primary">Let’s talk about your project <ArrowUpRight size={21} aria-hidden="true"/></Link>
      </div>
    </div>
    <div className="container pt-12 sm:pt-16">
      <div className="grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-[1.25fr_.7fr_1.4fr] lg:gap-16">
        <div>
          <Link to="/" aria-label="Geoking home" className="inline-flex items-center gap-3"><img src="/assets/logo.png" alt="" width={48} height={48} className="h-12 w-12 rounded-xl bg-white p-1"/><span className="font-heading text-xl font-bold tracking-tight">GEOKING<span className="text-teal-300">.</span></span></Link>
          <p className="mt-5 max-w-xs text-base leading-relaxed text-white/70">Local knowledge.<br/>Geospatial precision.<br/>Property decisions made clearer.</p>
          <address className="mt-6 text-sm not-italic leading-relaxed text-white/70">Area 4, Off Paul Kagame Road<br/>Lilongwe, Malawi</address>
          <p className="mt-3 text-xs leading-relaxed text-white/60">Mon–Fri 08:00–17:00 · Sat 08:00–12:00</p>
        </div>
        <nav aria-label="Footer explore"><h3 className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-teal-200">Explore</h3><ul className="space-y-1 text-sm">{[['About Geoking','/about'],['Properties','/properties'],['Our work','/portfolio'],['Insights','/blog'],['Contact','/contact'],['Client portal','/client'],['Agent portal','/agent-portal']].map(([label,path]) => <li key={path}><Link to={path} className="inline-flex min-h-10 items-center text-white/80 transition-colors hover:text-teal-200">{label}</Link></li>)}</ul></nav>
        <nav aria-label="Footer services"><h3 className="mb-4 text-xs font-semibold uppercase tracking-[.18em] text-teal-200">Our expertise</h3><ul className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{Object.entries(serviceData).map(([slug,service]) => <li key={slug}><Link to={`/services/${slug}`} className="flex min-h-11 items-center py-2 text-sm leading-snug text-white/80 transition-colors hover:text-teal-200">{service.title}</Link></li>)}</ul></nav>
      </div>
      <div className="grid gap-6 border-b border-white/15 py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div><p className="mb-2 text-xs text-white/60">Have a site, property or idea in mind?</p><a href="mailto:Info@geoking.org" className="inline-flex min-h-11 items-center gap-3 font-heading text-2xl font-semibold sm:text-3xl">Info@geoking.org <ArrowUpRight size={22} aria-hidden="true"/></a></div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm"><a href="tel:+265983333061" className="flex min-h-11 items-center text-white/80 hover:text-teal-200">+265 983 333 061</a><a href="tel:+265881313475" className="flex min-h-11 items-center text-white/80 hover:text-teal-200">+265 881 313 475</a><a href="https://web.facebook.com/geokingconsultancy/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-teal-200">Facebook <ArrowUpRight size={15} aria-hidden="true"/></a></div>
      </div>
      <div className="flex flex-col justify-between gap-4 py-6 text-xs text-white/60 md:flex-row md:items-center"><p>© {new Date().getFullYear()} Geoking Consultancy.</p><nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2"><Link to="/privacy-policy" className="inline-flex min-h-10 items-center hover:text-white">Privacy</Link><Link to="/terms-of-service" className="inline-flex min-h-10 items-center hover:text-white">Terms</Link><Link to="/cookie-policy" className="inline-flex min-h-10 items-center hover:text-white">Cookies</Link></nav><p className="text-white/40">Rooted in Malawi. Looking ahead.</p></div>
    </div>
  </footer>;
}
