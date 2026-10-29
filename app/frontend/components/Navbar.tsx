import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Home, CircleUserRound, BriefcaseBusiness, Building2, Images, GraduationCap, Newspaper, MessageCircle, LogIn } from "lucide-react";
const logo = "/assets/logo.png";

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

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); setServicesOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!mobileOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [mobileOpen]);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container flex items-center justify-between h-[4.5rem] xl:h-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-background shadow-md flex items-center justify-center ring-2 ring-accent/30">
            <img src={logo} alt="Geoking Consultancy Logo" className="h-9 w-9 object-contain" />
          </div>
          <div className="leading-tight">
            <span className="font-heading font-bold text-secondary text-lg">GEO</span>
            <span className="font-heading font-bold text-accent text-lg">KING</span>
            <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">Consultancy</p>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                to={item.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                  location.pathname === item.path ? "text-accent" : "text-foreground hover:text-accent"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown className="w-3 h-3" />}
              </Link>
              {item.children && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-card rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50">
                  {item.children.map((child) => (
                    <Link key={child.path} to={child.path} className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-accent transition-colors first:rounded-t-lg last:rounded-b-lg">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <Link to="/client" className="hidden xl:inline-flex bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
          Client portal
        </Link>

        {/* Mobile toggle */}
        <button aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden grid h-11 w-11 place-items-center rounded-xl bg-muted text-secondary transition-colors hover:bg-primary hover:text-white">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-navigation" className="absolute inset-x-0 top-full max-h-[calc(100dvh-8rem)] overflow-y-auto border-t border-border bg-background/98 p-3 pb-6 shadow-2xl backdrop-blur-xl xl:hidden">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <button type="button" onClick={() => setServicesOpen(open => !open)} aria-expanded={servicesOpen}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${location.pathname.startsWith(item.path) ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted hover:text-accent'}`}>
                  <item.icon className="h-5 w-5" />{item.label}
                  <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link to={item.path} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${location.pathname === item.path ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted hover:text-accent'}`}>
                  <item.icon className="h-5 w-5" />{item.label}
                </Link>
              )}
              {item.children && servicesOpen && item.children.map((child) => (
                <Link key={child.path} to={child.path} onClick={() => setMobileOpen(false)} className="block rounded-lg py-2.5 pl-12 pr-4 text-sm text-muted-foreground hover:bg-muted hover:text-accent">
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="px-6 pt-2">
            <Link to="/client" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20">
              <LogIn className="h-4 w-4" /> Client portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
