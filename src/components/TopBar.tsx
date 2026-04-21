import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, UserCircle, Settings } from "lucide-react";

const TopBar = () => (
  <div className="hero-gradient text-primary-foreground text-xs sm:text-sm py-2">
    <div className="container flex justify-between items-center gap-3">
      <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1 overflow-hidden">
        <a href="tel:+265983333061" className="flex items-center gap-1 whitespace-nowrap shrink-0 hover:underline">
          <Phone className="w-3 h-3 shrink-0" />
          <span>+265 983 333 061</span>
        </a>
        <a href="mailto:Info@geoking.org" className="hidden sm:flex items-center gap-1 whitespace-nowrap min-w-0 hover:underline">
          <Mail className="w-3 h-3 shrink-0" />
          <span className="truncate">Info@geoking.org</span>
        </a>
        <span className="hidden lg:flex items-center gap-1 whitespace-nowrap">
          <MapPin className="w-3 h-3 shrink-0" /> Lilongwe, Malawi
        </span>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <Link to="/agent-portal" className="flex items-center gap-1 hover:underline whitespace-nowrap">
          <UserCircle className="w-3 h-3" />
          <span className="hidden xs:inline sm:inline">Agent Portal</span>
        </Link>
      </div>
    </div>
  </div>
);

export default TopBar;
