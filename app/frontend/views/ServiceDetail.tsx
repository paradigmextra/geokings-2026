import Training from "./Training";
import { serviceData } from "../../content/services";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight, CheckCircle } from "lucide-react";



const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  if (slug === "gis-trainings") return <Training />;

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
        <h1 className="font-heading px-4 text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
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

          <div className="flex flex-col gap-3 sm:flex-row"><Link to="/contact" className="inline-flex justify-center items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            Discuss Your Project <ArrowRight className="w-4 h-4" />
          </Link>
          <a href={`https://wa.me/265983333061?text=${encodeURIComponent(`Hello Geoking, I would like a quote for ${service.title} in Malawi.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary px-6 py-3 font-semibold text-primary">Get a quote on WhatsApp</a></div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;

