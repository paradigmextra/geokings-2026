import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services", children: [
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
  { label: "Properties", path: "/properties" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Training", path: "/services/gis-trainings" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
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
        <div className="hidden lg:flex items-center gap-1">
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
                <div className="absolute top-full left-0 mt-1 w-64 bg-card rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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

        <Link to="/contact" className="hidden lg:inline-flex bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
          Get a Quote
        </Link>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background pb-4">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                to={item.path}
                onClick={() => { if (!item.children) setMobileOpen(false); else setServicesOpen(!servicesOpen); }}
                className="block px-6 py-3 text-sm font-medium text-foreground hover:text-accent"
              >
                {item.label}
              </Link>
              {item.children && servicesOpen && item.children.map((child) => (
                <Link key={child.path} to={child.path} onClick={() => setMobileOpen(false)} className="block px-10 py-2 text-sm text-muted-foreground hover:text-accent">
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="px-6 pt-2">
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block text-center bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold">
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
