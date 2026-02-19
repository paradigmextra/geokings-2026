import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, CheckCircle } from "lucide-react";

const serviceData: Record<string, { title: string; overview: string; features: string[]; benefits: string[]; industries: string[] }> = {
  "property-management": {
    title: "Real Property Management",
    overview: "We provide comprehensive property management solutions that help landlords and property owners maximize returns while minimizing stress.",
    features: ["Tenant screening & placement", "Rent collection & accounting", "Property maintenance", "Legal compliance", "Regular property inspections"],
    benefits: ["Maximize rental income", "Reduce vacancy rates", "Professional tenant relations", "Full financial reporting"],
    industries: ["Residential", "Commercial", "Industrial"],
  },
  "valuation": {
    title: "Property Valuation",
    overview: "Accurate, certified property valuations for various purposes including sales, insurance, taxation, and legal proceedings.",
    features: ["Market value assessments", "Insurance valuations", "Mortgage valuations", "Compensation valuations", "Asset valuations"],
    benefits: ["Certified professionals", "Accurate market data", "Legally recognized reports", "Quick turnaround"],
    industries: ["Banking", "Insurance", "Real Estate", "Government"],
  },
  "equipment": {
    title: "Land Surveying Equipment Supply",
    overview: "Quality surveying instruments from leading global manufacturers, with full support and training.",
    features: ["Total stations", "GPS/GNSS receivers", "Drones for mapping", "Software solutions", "Accessories & spare parts"],
    benefits: ["Genuine products", "After-sales support", "Training included", "Competitive pricing"],
    industries: ["Surveying firms", "Engineering", "Construction", "Mining"],
  },
  "architecture": {
    title: "Architectural Services",
    overview: "Creative architectural design and planning for residential and commercial projects across Malawi.",
    features: ["Concept design", "Detailed drawings", "3D visualization", "Project supervision", "Building permits"],
    benefits: ["Innovative designs", "Cost-effective solutions", "Regulatory compliance", "Timely delivery"],
    industries: ["Residential", "Commercial", "Institutional"],
  },
  "quantity-surveying": {
    title: "Quantity Surveying",
    overview: "Expert cost management and quantity surveying services for construction projects of all sizes.",
    features: ["Bills of quantities", "Cost estimates", "Tender documentation", "Contract administration", "Final accounts"],
    benefits: ["Cost control", "Value engineering", "Risk management", "Professional reports"],
    industries: ["Construction", "Infrastructure", "Real Estate Development"],
  },
  "land-surveying": {
    title: "Land Surveying",
    overview: "Professional cadastral and topographic surveying services across Malawi.",
    features: ["Boundary surveys", "Topographic surveys", "Engineering surveys", "Subdivision surveys", "As-built surveys"],
    benefits: ["High accuracy", "Modern equipment", "Licensed professionals", "Legal compliance"],
    industries: ["Real Estate", "Construction", "Agriculture", "Government"],
  },
  "land-laws": {
    title: "Land Laws Training",
    overview: "Professional training programs covering Malawi's land laws, policies, and regulatory framework.",
    features: ["Land Act training", "Customary land rights", "Land registration procedures", "Dispute resolution", "Policy updates"],
    benefits: ["Expert facilitators", "Practical approach", "Certificates provided", "Customizable programs"],
    industries: ["Legal", "Government", "NGOs", "Real Estate"],
  },
  "registration": {
    title: "Land Registration / Title Deed Facilitation",
    overview: "We facilitate the land registration process and help clients obtain title deeds efficiently.",
    features: ["Application preparation", "Document verification", "Liaison with authorities", "Title deed processing", "Status tracking"],
    benefits: ["Faster processing", "Reduced errors", "Professional guidance", "Transparent fees"],
    industries: ["Property owners", "Developers", "Legal firms"],
  },
  "gis-trainings": {
    title: "GIS Related Trainings",
    overview: "Comprehensive GIS training programs for professionals and organizations looking to build geospatial capacity.",
    features: ["QGIS & ArcGIS", "Remote sensing", "Spatial analysis", "Database management", "Web GIS"],
    benefits: ["Hands-on approach", "Industry experts", "Certification", "Post-training support"],
    industries: ["Government", "NGOs", "Agriculture", "Urban Planning", "Environment"],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  if (!service) {
    return (
      <Layout>
        <div className="py-20 text-center container">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/services" className="text-accent font-semibold">Back to Services</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="page-hero">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Overview</h2>
          <p className="text-muted-foreground mb-10">{service.overview}</p>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Key Features</h3>
              <ul className="space-y-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-muted-foreground text-sm"><CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Benefits</h3>
              <ul className="space-y-2">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-muted-foreground text-sm"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />{b}</li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="font-heading text-xl font-semibold text-foreground mb-3">Industries Served</h3>
          <div className="flex flex-wrap gap-2 mb-10">
            {service.industries.map((ind) => (
              <span key={ind} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">{ind}</span>
            ))}
          </div>

          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            Request a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
