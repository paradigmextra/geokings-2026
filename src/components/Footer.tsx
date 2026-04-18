import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="footer-bg text-secondary-foreground">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-background shadow-md flex items-center justify-center ring-2 ring-accent/30">
              <img src={logo} alt="Geoking" className="h-9 w-9 object-contain" />
            </div>
            <div>
              <span className="font-heading font-bold text-secondary-foreground text-lg">GEO</span>
              <span className="font-heading font-bold text-accent text-lg">KING</span>
              <p className="text-[10px] tracking-widest uppercase opacity-70">Consultancy</p>
            </div>
          </div>
          <p className="text-sm opacity-80 mb-4">Malawi's premier geospatial consultancy providing comprehensive land, property, and GIS solutions since May 2022.</p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full border border-secondary-foreground/30 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-semibold text-lg mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {["Real Property Management","Property Valuation","Land Surveying Equipment Supply","Architectural Services","Quantity Surveying","Land Surveying","Land Laws Training"].map(s => (
              <li key={s}><Link to="/services" className="hover:text-accent transition-colors">{s}</Link></li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {[
              ["About Us", "/about"],
              ["Property Marketplace", "/properties"],
              ["Portfolio", "/portfolio"],
              ["Training Programs", "/services/gis-trainings"],
              ["Blog & Insights", "/blog"],
              ["Contact Us", "/contact"],
              ["Agent Portal", "/agent-portal"],
            ].map(([label, path]) => (
              <li key={path}><Link to={path} className="hover:text-accent transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex gap-2"><MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" /><span>Area 3, Off Paul Kagame Road<br />Lilongwe, Malawi</span></li>
            <li className="flex gap-2"><Phone className="w-4 h-4 text-accent shrink-0" /><span>+265 999 123 456<br />+265 888 234 567</span></li>
            <li className="flex gap-2"><Mail className="w-4 h-4 text-accent shrink-0" /><span>info@geokings.mw</span></li>
            <li className="flex gap-2"><Clock className="w-4 h-4 text-accent shrink-0" /><span>Mon - Fri: 8:00 AM - 5:00 PM<br />Sat: 8:00 AM - 12:00 PM</span></li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-secondary-foreground/10">
      <div className="container py-4 flex flex-col md:flex-row justify-between items-center text-xs opacity-60">
        <p>© 2026 Geoking Consultancy. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-accent">Privacy Policy</a>
          <a href="#" className="hover:text-accent">Terms of Service</a>
          <a href="#" className="hover:text-accent">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
