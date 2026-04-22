import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import testimonialVictor from "@/assets/testimonial-victor.jpg";
import testimonialGrace from "@/assets/testimonial-grace.jpg";
import testimonialPeter from "@/assets/testimonial-peter.jpg";
import testimonialChisomo from "@/assets/testimonial-chisomo.jpg";
import { motion } from "framer-motion";
import {
  Building2, FileCheck, Compass, PenTool, Calculator, Map,
  BookOpen, FileText, GraduationCap, MapPin, Users, CheckCircle,
  ArrowRight, Play, Target, Eye, Star, Quote, Home as HomeIcon
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const popIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

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

const testimonials = [
  { name: "Victor Mlongoti", role: "Digital Strategist", text: "Geoking transformed how we approach land surveying. Their accuracy and professionalism are unmatched in Malawi.", rating: 5, image: testimonialVictor },
  { name: "Grace Banda", role: "Agricultural Officer, Salima", text: "The GIS mapping services helped us optimize crop distribution across 200+ hectares. Truly remarkable work.", rating: 4, image: testimonialGrace },
  { name: "Peter Mwale", role: "Real Estate Investor", text: "Their property valuation was thorough and transparent. I now use Geoking for all my real estate transactions.", rating: 3, image: testimonialPeter },
  { name: "Chisomo Nkhoma", role: "Urban Planner, Mzuzu", text: "Professional, timely, and incredibly knowledgeable. Geoking is leading the GIS revolution in Malawi.", rating: 4, image: testimonialChisomo },
];

const featuredProperties = [
  { title: "House for Sale", price: "Coming Soon", location: "Area 47, Lilongwe", type: "House", desc: "Modern 3-bedroom house with spacious living areas." },
  { title: "House for Sale", price: "Coming Soon", location: "City Centre, Lilongwe", type: "Commercial", desc: "Prime commercial plot in central business district." },
  { title: "House for Sale", price: "Coming Soon", location: "Area 25, Lilongwe", type: "Land", desc: "Ready for development residential land." },
];

const Index = () => (
  <Layout>
    {/* Hero with background image masked in brand colours */}
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Brand colour mask - clipping mask effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(195,70%,18%,0.88)] to-[hsl(174,65%,30%,0.82)]" />

      <div className="container relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur px-4 py-1.5 rounded-full text-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Malawi's Premier Geospatial Consultancy
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Transforming<br />
              <span className="text-accent">Land & Property</span><br />
              Management
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg opacity-90 mb-8 max-w-lg"
            >
              Expert GIS consultancy, land surveying, property management, and real estate solutions. Empowering Malawi with cutting-edge geospatial technology and professional services.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/services" className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary-foreground/20 transition-colors">
                Explore Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/properties" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                <Play className="w-4 h-4" /> Browse Properties
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-white shadow-2xl flex items-center justify-center">
                <img src={logo} alt="Geoking Consultancy" className="w-52 h-52 object-contain" />
              </div>
              <div className="absolute -top-2 -right-2 bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20 text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Est. 2022
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="container relative z-10 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-primary-foreground/10 backdrop-blur rounded-lg p-4 text-center text-primary-foreground border border-primary-foreground/10"
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
            initial={{ opacity: 0, x: -30 }}
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
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "3+", label: "Years Experience" },
              { value: "10+", label: "Services Offered" },
              { value: "500+", label: "Parcels Surveyed" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((item, i) => (
              <div key={item.label} className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-accent mb-1">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="bg-muted py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="service-card"
            >
              <div className={`w-12 h-12 ${s.color} text-primary-foreground rounded-lg flex items-center justify-center mb-4`}>
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
              <Link to="/services" className="text-accent text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
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

    {/* Vision & Mission */}
    <section className="py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center"><Eye className="w-5 h-5" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground">Becoming the leading geospatial firm across generations and nations, setting the standard for innovation, accuracy, and excellence in land and property solutions.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent text-accent-foreground rounded-lg flex items-center justify-center"><Target className="w-5 h-5" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground">Our Mission</h3>
            </div>
            <p className="text-muted-foreground">Delivering accurate, reliable geospatial services including mapping, satellite imagery, spatial analysis and support for industries like urban planning, agriculture, disaster management, and navigation.</p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Featured Properties with images */}
    <section className="bg-muted py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label mb-2 block">Property Marketplace</span>
          <h2 className="font-heading text-3xl font-bold text-foreground">Featured Properties</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((p, i) => (
            <motion.div
              key={p.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group"
            >
              <div className="h-48 hero-gradient flex items-center justify-center relative">
                <Building2 className="w-16 h-16 text-primary-foreground/30 group-hover:scale-110 transition-transform duration-500" />
              </div>
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

    {/* Testimonials */}
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label flex items-center justify-center gap-2 mb-2"><Star className="w-4 h-4" /> Testimonials</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">What Our Clients Say</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Trusted by property developers, agricultural officers, urban planners, and real estate investors across Malawi.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-accent/20 absolute top-4 right-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-accent/30 shrink-0">
                  <img src={t.image} alt={t.name} loading="lazy" width={64} height={64} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="relative overflow-hidden py-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(195,70%,18%,0.92)] to-[hsl(174,65%,30%,0.88)]" />
      <div className="container relative z-10 text-center text-primary-foreground">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to Get Started?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="opacity-90 mb-8 max-w-lg mx-auto text-lg"
        >
          Let's discuss your next GIS, surveying, or property project. Our team is ready to deliver excellence.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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

    {/* Portfolio Preview */}
    <section className="bg-muted py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label mb-2 block">Our Work</span>
          <h2 className="font-heading text-3xl font-bold text-foreground">Recent Projects</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Showcasing some of our most impactful GIS, surveying, and property management projects across Malawi.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Lilongwe City Land Audit", cat: "GIS Projects", desc: "GIS-based land audit covering 500+ parcels for Lilongwe City Council." },
            { title: "Area 25 Housing Survey", cat: "Survey Projects", desc: "Full cadastral survey for a 200-unit housing development." },
            { title: "Commercial Complex Design", cat: "Architectural", desc: "Modern 3-storey commercial complex design in City Centre." },
          ].map((p, i) => (
            <motion.div
              key={p.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="service-card"
            >
              <span className="text-xs font-semibold text-accent mb-2 block">{p.cat}</span>
              <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/portfolio" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            View Full Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
