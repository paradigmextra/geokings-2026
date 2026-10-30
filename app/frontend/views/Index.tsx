import HeroBrandSeal from "@/components/HeroBrandSeal";
import CompanyNumbers from "@/components/CompanyNumbers";
import PropertyIllustration from "@/components/PropertyIllustration";
import ServiceIcon from "@/components/ServiceIcon";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";
import PurposeCards from "@/components/PurposeCards";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { api } from "@/lib/api";
import type { Property } from "@/lib/portal-types";
const heroBg = "/assets/hero-bg.jpg";
import { motion, type Variants } from "framer-motion";
import {
  Building2, FileCheck, Compass, PenTool, Calculator, Map,
  BookOpen, FileText, GraduationCap, MapPin, Users, CheckCircle,
  ArrowRight, Play, Home as HomeIcon
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" },
  }),
};

const stats = [
  { icon: MapPin, value: "500+", label: "Parcels Surveyed" },
  { icon: Building2, value: "200+", label: "Properties Managed" },
  { icon: Users, value: "1,000+", label: "Clients Served" },
  { icon: CheckCircle, value: "50+", label: "Projects Completed" },
];

const services = [
  { icon: Building2, title: "Real Property Management", path: "/services/property-management", desc: "Comprehensive property management solutions for landlords and property owners across Malawi.", color: "bg-primary" },
  { icon: FileCheck, title: "Property Valuation", path: "/services/valuation", desc: "Accurate and certified property valuations for transactions, insurance, and legal purposes.", color: "bg-primary" },
  { icon: Compass, title: "Land Surveying Equipment Supply", path: "/services/equipment", desc: "Quality surveying instruments and equipment from leading global manufacturers.", color: "bg-brand-orange" },
  { icon: PenTool, title: "Architectural Services", path: "/services/architecture", desc: "Creative architectural design and planning for residential and commercial projects.", color: "bg-brand-orange" },
  { icon: Calculator, title: "Quantity Surveying", path: "/services/quantity-surveying", desc: "Expert cost management and quantity surveying for construction projects.", color: "bg-brand-orange" },
  { icon: Map, title: "Land Surveying", path: "/services/land-surveying", desc: "Professional cadastral and topographic surveying services across Malawi.", color: "bg-accent" },
];

const testimonials = [
  { name: "Victor Mlongoti", role: "Digital Strategist", text: "Geoking transformed how we approach land surveying. Their accuracy and professionalism are unmatched in Malawi.", rating: 5 },
  { name: "Grace Banda", role: "Agricultural Officer, Salima", text: "The GIS mapping services helped us optimize crop distribution across 200+ hectares. Truly remarkable work.", rating: 4 },
  { name: "Peter Mwale", role: "Real Estate Investor", text: "Their property valuation was thorough and transparent. I now use Geoking for all my real estate transactions.", rating: 3 },
  { name: "Chisomo Nkhoma", role: "Urban Planner, Mzuzu", text: "Professional, timely, and incredibly knowledgeable. Geoking is leading the GIS revolution in Malawi.", rating: 4 },
];

const featuredProperties = [
  { title: "House for Sale", price: "Coming Soon", location: "Area 47, Lilongwe", type: "House", desc: "Modern 3-bedroom house with spacious living areas." },
  { title: "Commercial Property", price: "Coming Soon", location: "City Centre, Lilongwe", type: "Commercial", desc: "Prime commercial plot in central business district." },
  { title: "Residential Land", price: "Coming Soon", location: "Area 25, Lilongwe", type: "Land", desc: "Ready for development residential land." },
];

const Index = () => {
  const [liveProperties, setLiveProperties] = useState<Property[]>([]);
  useEffect(() => { api<{ properties: Property[] }>('properties').then(result => setLiveProperties(result.properties.slice(0, 3))).catch(() => undefined); }, []);
  const displayProperties: Array<{ id: string; title: string; location: string; type: string; desc: string; price: string; image?: string }> = liveProperties.length ? liveProperties.map(p => ({ id: p.id, title: p.title, location: p.location, type: p.type, desc: p.description, image: p.image, price: new Intl.NumberFormat('en-MW', { style: 'currency', currency: 'MWK', maximumFractionDigits: 0 }).format(Number(p.price)) })) : featuredProperties.map((p, index) => ({ ...p, id: `placeholder-${index}` }));
  return (
  <Layout>
    {/* Hero with background image masked in brand colours */}
    <section className="relative overflow-hidden">
      {/* Background image */}
      <Image src={heroBg} alt="" fill sizes="100vw" priority className="object-cover" />
      {/* Brand colour mask - clipping mask effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(195,70%,18%,0.88)] to-[hsl(174,65%,30%,0.82)]" />

      <div className="container relative z-10 py-14 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground">
            <div className="mb-5 sm:mb-6">
            <motion.span
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex max-w-full items-center gap-2 bg-primary-foreground/10 backdrop-blur px-3 sm:px-4 py-1.5 rounded-full text-xs leading-relaxed sm:text-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Malawi's Premier Geospatial Consultancy
            </motion.span>
            </div>
            <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6 sm:gap-5 lg:block">
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="min-w-0 font-heading text-[clamp(1.375rem,6.4vw,1.875rem)] sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Transforming<br />
              <span className="text-teal-200">Land & Property</span><br />
              Management
            </motion.h1>
              <div className="shrink-0 lg:hidden"><HeroBrandSeal compact/></div>
            </div>
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg opacity-90 mb-7 sm:mb-8 max-w-lg"
            >
              Expert GIS consultancy, land surveying, property management, and real estate solutions. Empowering Malawi with cutting-edge geospatial technology and professional services.
            </motion.p>
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link to="/services" className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-xl sm:rounded-full font-semibold hover:bg-primary-foreground/20 transition-colors">
                Explore Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/properties" className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl sm:rounded-full font-semibold hover:opacity-90 transition-opacity">
                <Play className="w-4 h-4" /> Browse Properties
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <HeroBrandSeal/>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="container relative z-10 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              initial={false}
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-primary-foreground/10 backdrop-blur rounded-xl p-3 sm:p-4 text-center text-primary-foreground border border-primary-foreground/10"
            >
              <s.icon className="w-5 h-5 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs opacity-70">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave */}
      <svg viewBox="0 0 1440 60" className="w-full block -mb-px relative z-10" preserveAspectRatio="none">
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="hsl(0 0% 97%)" />
      </svg>
    </section>

    {/* About Preview */}
    <section className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4" /> Who We Are</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Malawi's Leading Geospatial & Property Consultancy</h2>
            <p className="text-muted-foreground mb-4">Founded on 12 May 2022, Geoking Consultancy has rapidly established itself as Malawi's premier geospatial and property solutions firm. Led by a visionary founder with vast technical and academic expertise, we deliver innovation across land management, surveying, and real estate.</p>
            <p className="text-muted-foreground mb-6">Our team combines cutting-edge technology with deep local knowledge to serve individuals, organizations, and government agencies across the nation.</p>
            <Link to="/about" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
              Learn More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <CompanyNumbers />
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="bg-muted py-20">
      <div className="container">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label flex items-center justify-center gap-2 mb-2"><CheckCircle className="w-4 h-4" /> What We Offer</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Comprehensive GIS & Property Solutions</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">From land surveying to property management, we provide end-to-end solutions for all your land and geospatial needs in Malawi.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial={false}
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="service-card"
            >
              <ServiceIcon path={s.path} />
              <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
              <Link to={s.path} aria-label={`Learn more about ${s.title}`} className="text-primary text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    <PurposeCards />

    {/* Featured Properties with images */}
    <section className="bg-muted py-20">
      <div className="container">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label mb-2 block">Property Marketplace</span>
          <h2 className="font-heading text-3xl font-bold text-foreground">Featured Properties</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProperties.map((p, i) => (
            <motion.div
              key={p.id}
              custom={i}
              initial={false}
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group"
            >
              <div className="h-48 bg-[#eaf2ee] flex items-center justify-center relative overflow-hidden">{p.image ? <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/> : <PropertyIllustration type={p.type} />}</div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-foreground mb-1">{p.title}</h3>
                <p className="text-accent font-bold text-lg mb-1">{p.price}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2"><MapPin className="w-3 h-3" /> {p.location}</p>
                <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">{p.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/properties" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            View All Properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    <Testimonials reviews={testimonials} />

    {/* CTA Banner */}
    <section className="relative overflow-hidden py-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(195,70%,18%,0.92)] to-[hsl(174,65%,30%,0.88)]" />
      <div className="container relative z-10 text-center text-primary-foreground">
        <motion.h2
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to Get Started?
        </motion.h2>
        <motion.p
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="opacity-90 mb-8 max-w-lg mx-auto text-lg"
        >
          Let's discuss your next GIS, surveying, or property project. Our team is ready to deliver excellence.
        </motion.p>
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary-foreground text-secondary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/services" className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary-foreground/20 transition-colors">
            Our Services
          </Link>
        </motion.div>
      </div>
    </section>

  </Layout>
  );
};

export default Index;

