import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import logo from "@/assets/logo.png";
import {
  Building2, FileCheck, Compass, PenTool, Calculator, Map,
  BookOpen, FileText, GraduationCap, MapPin, Users, CheckCircle,
  ArrowRight, Play, Target, Eye
} from "lucide-react";

const stats = [
  { icon: MapPin, value: "500+", label: "Parcels Surveyed" },
  { icon: Building2, value: "200+", label: "Properties Managed" },
  { icon: Users, value: "1,000+", label: "Clients Served" },
  { icon: CheckCircle, value: "50+", label: "Projects Completed" },
];

const services = [
  { icon: Building2, title: "Real Property Management", desc: "Comprehensive property management solutions for landlords and property owners across Malawi.", color: "bg-primary" },
  { icon: FileCheck, title: "Property Valuation", desc: "Accurate and certified property valuations for transactions, insurance, and legal purposes.", color: "bg-primary" },
  { icon: Compass, title: "Land Surveying Equipment Supply", desc: "Quality surveying instruments and equipment from leading global manufacturers.", color: "bg-brand-orange" },
  { icon: PenTool, title: "Architectural Services", desc: "Creative architectural design and planning for residential and commercial projects.", color: "bg-brand-orange" },
  { icon: Calculator, title: "Quantity Surveying", desc: "Expert cost management and quantity surveying for construction projects.", color: "bg-brand-orange" },
  { icon: Map, title: "Land Surveying", desc: "Professional cadastral and topographic surveying services across Malawi.", color: "bg-accent" },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="hero-gradient relative overflow-hidden">
      <div className="container py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground">
            <span className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur px-4 py-1.5 rounded-full text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Malawi's Premier GIS Consultancy
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transforming<br />
              <span className="text-accent">Land & Property</span><br />
              Management
            </h1>
            <p className="text-lg opacity-90 mb-8 max-w-lg">
              Expert GIS consultancy, land surveying, property management, and real estate solutions. Empowering Malawi with cutting-edge geospatial technology and professional services.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary-foreground/20 transition-colors">
                Explore Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/properties" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                <Play className="w-4 h-4" /> Browse Properties
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center">
                <img src={logo} alt="Geokings" className="w-52 h-52 object-contain" />
              </div>
              <div className="absolute -top-2 -right-2 bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20 text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Est. 2022
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="container pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 text-center text-primary-foreground border border-primary-foreground/10">
              <s.icon className="w-5 h-5 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs opacity-70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave */}
      <svg viewBox="0 0 1440 60" className="w-full block -mb-px" preserveAspectRatio="none">
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="hsl(0 0% 97%)" />
      </svg>
    </section>

    {/* Services */}
    <section className="bg-muted py-20">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section-label flex items-center justify-center gap-2 mb-2"><CheckCircle className="w-4 h-4" /> What We Offer</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Comprehensive GIS & Property Solutions</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">From land surveying to property management, we provide end-to-end solutions for all your land and geospatial needs in Malawi.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="service-card">
              <div className={`w-12 h-12 ${s.color} text-primary-foreground rounded-lg flex items-center justify-center mb-4`}>
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
              <Link to="/services" className="text-accent text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-8 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center"><Eye className="w-5 h-5" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground">Becoming the leading geospatial firm across generations and nations, setting the standard for innovation, accuracy, and excellence in land and property solutions.</p>
          </div>
          <div className="p-8 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent text-accent-foreground rounded-lg flex items-center justify-center"><Target className="w-5 h-5" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground">Our Mission</h3>
            </div>
            <p className="text-muted-foreground">Delivering accurate, reliable geospatial services including mapping, satellite imagery, spatial analysis and support for industries like urban planning, agriculture, disaster management, and navigation.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Featured Properties */}
    <section className="bg-muted py-20">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section-label mb-2 block">Property Marketplace</span>
          <h2 className="font-heading text-3xl font-bold text-foreground">Featured Properties</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "3 Bedroom House in Area 47", price: "MWK 85,000,000", location: "Area 47, Lilongwe" },
            { title: "Commercial Plot in City Centre", price: "MWK 120,000,000", location: "City Centre, Lilongwe" },
            { title: "Residential Land in Area 25", price: "MWK 15,000,000", location: "Area 25, Lilongwe" },
          ].map((p) => (
            <div key={p.title} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
              <div className="h-48 hero-gradient flex items-center justify-center">
                <Building2 className="w-16 h-16 text-primary-foreground/30" />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-foreground mb-1">{p.title}</h3>
                <p className="text-accent font-bold text-lg mb-1">{p.price}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/properties" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            View All Properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
