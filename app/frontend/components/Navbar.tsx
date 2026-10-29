import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronDown, ArrowUpRight, Home, CircleUserRound, BriefcaseBusiness, Building2, Images, GraduationCap, Newspaper, MessageCircle } from 'lucide-react';
const logo = '/assets/logo.png';

const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: CircleUserRound },
  { label: "Services", path: "/services", icon: BriefcaseBusiness, children: [
    { label: "Real Property Management", path: "/services/property-management" },
    { label: "Property Valuation", path: "/services/valuation" },
    { label: "Land Surveying Equipment", path: "/services/equipment" },
    { label: "Architectural Services", path: "/services/architecture" },
    { label: "Quantity Surveying", path: "/services/quantity-surveying" },
    { label: "Land Surveying", path: "/services/land-surveying" },
    { label: "Land Laws Training", path: "/services/land-laws" },
    { label: "Land Registration", path: "/services/registration" },
    { label: "GIS Trainings", path: "/services/gis-trainings" },
  ]},
  { label: "Properties", path: "/properties", icon: Building2 },
  { label: "Portfolio", path: "/portfolio", icon: Images },
  { label: "Training", path: "/services/gis-trainings", icon: GraduationCap },
  { label: "Blog", path: "/blog", icon: Newspaper },
  { label: "Contact", path: "/contact", icon: MessageCircle },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { setMobileOpen(false); setServicesOpen(false); }, [pathname]);
  useEffect(() => {
    if (!mobileOpen) return;
    const triggerElement = trigger.current;
    const background = document.querySelector<HTMLElement>('.public-layout');
    const previousInert = background?.inert || false;
    if (background) background.inert = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
      if (event.key !== 'Tab') return;
      const controls = Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') || []).filter(el => el.getClientRects().length > 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const handleResize = () => { if (window.innerWidth >= 1280) setMobileOpen(false); };
    document.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (background) background.inert = previousInert;
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleResize);
      triggerElement?.focus();
    };
  }, [mobileOpen]);
  return <>
    <nav aria-label="Main navigation" className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="container flex h-[4.5rem] items-center justify-between gap-4 xl:h-20">
        <Link to="/" aria-label="Geoking Consultancy home" className="flex items-center gap-3">
          <img src={logo} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
          <div><span className="font-heading text-lg font-extrabold tracking-tight text-secondary">GEOKING<span className="text-primary">.</span></span><p className="text-[10px] font-semibold uppercase tracking-[.24em] text-muted-foreground">Consultancy</p></div>
        </Link>
        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map(item => <div key={item.label} className="group relative">
            <Link to={item.path} aria-current={pathname === item.path ? 'page' : undefined} className={`flex min-h-11 items-center gap-1 rounded-lg px-3 text-sm font-semibold transition-colors ${pathname === item.path ? 'bg-primary/5 text-primary' : 'text-secondary hover:bg-muted'}`}>{item.label}{item.children && <ChevronDown size={13} />}</Link>
            {item.children && <div className="invisible absolute left-0 top-full z-50 w-72 rounded-xl border bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {item.children.map(child => <Link key={child.path} to={child.path} className="block rounded-lg px-3 py-3 text-sm text-secondary hover:bg-muted">{child.label}</Link>)}
            </div>}
          </div>)}
        </div>
        <Link to="/client" className="hidden min-h-11 items-center gap-3 rounded-full bg-secondary px-5 text-sm font-semibold text-white xl:inline-flex">Client portal <ArrowUpRight size={16}/></Link>
        <button ref={trigger} type="button" aria-label="Open navigation" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(true)} className="flex min-h-12 items-center gap-2 rounded-full border border-secondary/15 bg-white px-4 text-sm font-semibold text-secondary xl:hidden"><span>Menu</span><Menu size={20} aria-hidden="true"/></button>
      </div>
    </nav>
    {mobileOpen && typeof document !== 'undefined' && createPortal(
      <div className="fixed inset-0 z-[120] bg-secondary/50 backdrop-blur-sm">
        <button tabIndex={-1} type="button" aria-label="Close navigation backdrop" onClick={() => setMobileOpen(false)} className="absolute inset-0 h-full w-full" />
        <div ref={panel} id="mobile-navigation" role="dialog" aria-modal="true" aria-labelledby="navigation-title" className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-white text-secondary shadow-2xl">
          <div className="flex shrink-0 items-center justify-between border-b px-6 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
            <div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-primary">Geoking Consultancy</p><h2 id="navigation-title" className="font-heading mt-1 text-xl font-bold">Explore Geoking</h2></div>
            <button ref={closeButton} type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="grid h-12 w-12 place-items-center rounded-full border border-secondary/15 bg-muted text-secondary"><X size={22}/></button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4">
            <nav aria-label="Mobile navigation">
              {navItems.map((item, index) => <div key={item.label} className="border-b border-secondary/10">
                <div className="flex items-center">
                  <Link to={item.path} onClick={() => setMobileOpen(false)} aria-current={pathname === item.path ? 'page' : undefined} className={`flex min-h-14 min-w-0 flex-1 items-center gap-4 py-3 font-heading text-lg font-semibold ${pathname === item.path ? 'text-primary' : 'text-secondary'}`}><span aria-hidden="true" className="w-5 text-[10px] font-medium tracking-widest text-primary/65">{String(index + 1).padStart(2, '0')}</span>{item.label}{!item.children && <ArrowUpRight size={17} className="ml-auto text-primary/60" aria-hidden="true"/>}</Link>
                  {item.children && <button type="button" aria-label={servicesOpen ? 'Hide service links' : 'Show service links'} aria-expanded={servicesOpen} aria-controls="mobile-services" onClick={() => setServicesOpen(value => !value)} className="ml-2 grid h-12 w-12 place-items-center rounded-full bg-muted text-primary"><ChevronDown size={19} className={servicesOpen ? 'rotate-180' : ''}/></button>}
                </div>
                {item.children && servicesOpen && <div id="mobile-services" className="mb-3 rounded-xl bg-[#f1f6f3] px-4 py-2">{item.children.map(child => <Link key={child.path} to={child.path} onClick={() => setMobileOpen(false)} className="flex min-h-12 items-center border-b border-primary/10 py-3 text-sm font-medium leading-snug text-secondary last:border-0">{child.label}</Link>)}</div>}
              </div>)}
            </nav>
            <Link to="/client" onClick={() => setMobileOpen(false)} className="mt-6 flex min-h-12 items-center justify-between rounded-xl bg-secondary px-5 font-semibold text-white">Client portal <ArrowUpRight size={18}/></Link>
            <a href="tel:+265983333061" className="mt-4 flex min-h-11 items-center justify-center text-sm font-semibold text-primary">Talk to us · +265 983 333 061</a>
          </div>
          <div className="shrink-0 border-t bg-[#f6f7f3] px-6 pt-3 pb-[max(.75rem,env(safe-area-inset-bottom))] text-xs text-muted-foreground">Land. Property. Possibility. <span className="float-right">Malawi</span></div>
        </div>
      </div>, document.body)}
  </>;
}
