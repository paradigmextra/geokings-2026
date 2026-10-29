import ServiceIcon from "@/components/ServiceIcon";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
const heroImg = "/assets/page-hero-services.jpg";
import {
  Building2, FileCheck, Compass, PenTool, Calculator, Map,
  BookOpen, FileText, GraduationCap, ArrowRight
} from "lucide-react";

const allServices = [
  { icon: Building2, title: "Real Property Management", desc: "Comprehensive property management solutions for landlords and property owners across Malawi.", path: "/services/property-management", color: "bg-primary" },
  { icon: FileCheck, title: "Property Valuation", desc: "Accurate and certified property valuations for transactions, insurance, and legal purposes.", path: "/services/valuation", color: "bg-primary" },
  { icon: Compass, title: "Land Surveying Equipment Supply", desc: "Quality surveying instruments and equipment from leading global manufacturers.", path: "/services/equipment", color: "bg-brand-orange" },
  { icon: PenTool, title: "Architectural Services", desc: "Creative architectural design and planning for residential and commercial projects.", path: "/services/architecture", color: "bg-brand-orange" },
  { icon: Calculator, title: "Quantity Surveying", desc: "Expert cost management and quantity surveying for construction projects.", path: "/services/quantity-surveying", color: "bg-brand-orange" },
  { icon: Map, title: "Land Surveying", desc: "Professional cadastral and topographic surveying services across Malawi.", path: "/services/land-surveying", color: "bg-accent" },
  { icon: BookOpen, title: "Land Laws Training", desc: "Professional training programs on Malawi land laws and regulations.", path: "/services/land-laws", color: "bg-accent" },
  { icon: FileText, title: "Land Registration / Title Deed", desc: "Facilitation of land registration and title deed processing.", path: "/services/registration", color: "bg-primary" },
  { icon: GraduationCap, title: "GIS Related Trainings", desc: "Comprehensive GIS training programs for professionals and organizations.", path: "/services/gis-trainings", color: "bg-accent" },
  { icon: MapPin, title: "Land & House Locator", desc: "Helping clients find and identify suitable land and property locations.", path: "/services/property-management", color: "bg-primary" },
];

import { MapPin } from "lucide-react";

const Services = () => (
  <Layout>
    <SEO
      title="Our Services | GIS, Surveying, Valuation & Architecture in Malawi"
      description="Explore Geoking's full range of services: GIS, land surveying, property valuation, architectural design, quantity surveying, training and more across Malawi."
      canonical="/services"
      keywords="GIS services Malawi, land surveying Lilongwe, property valuation, architectural services, quantity surveying"
    />
    <PageHero title="Our Services" subtitle="End-to-end geospatial and property solutions tailored for Malawi." bgImage={heroImg} />

    <section className="py-20">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((s) => (
            <div key={s.title} className="service-card">
              <ServiceIcon path={s.path} />
              <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
              <Link to={s.path} className="text-accent text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="hero-gradient py-16">
      <div className="container text-center text-primary-foreground">
        <h2 className="font-heading text-3xl font-bold mb-4">Need a Custom Solution?</h2>
        <p className="opacity-90 mb-6 max-w-lg mx-auto">Contact us today for a tailored quote on any of our services.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary-foreground/20 transition-colors">
          Request a Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </Layout>
);

export default Services;

