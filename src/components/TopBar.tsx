import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, UserCircle, Settings } from "lucide-react";

const TopBar = () => (
  <div className="hero-gradient text-primary-foreground text-sm py-2">
    <div className="container flex justify-between items-center">
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +265 999 123 456</span>
        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> info@geokings.mw</span>
        <span className="hidden md:flex items-center gap-1"><MapPin className="w-3 h-3" /> Lilongwe, Malawi</span>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/agent-portal" className="flex items-center gap-1 hover:underline"><UserCircle className="w-3 h-3" /> Agent Portal</Link>
      </div>
    </div>
  </div>
);

export default TopBar;
