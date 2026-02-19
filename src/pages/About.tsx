import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/page-hero-about.jpg";
import { Eye, Target, Shield, Lightbulb, CheckCircle, Award } from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "Embracing cutting-edge geospatial technology." },
  { icon: Target, title: "Accuracy", desc: "Precision in every measurement and analysis." },
  { icon: Shield, title: "Trust", desc: "Building lasting relationships through reliability." },
  { icon: Award, title: "Professionalism", desc: "Highest standards in service delivery." },
  { icon: CheckCircle, title: "Technology-Driven", desc: "Leveraging modern tools for better outcomes." },
];

const About = () => (
  <Layout>
    <PageHero title="About Us" subtitle="Learn about Malawi's leading GIS and property consultancy firm." bgImage={heroImg} />

    <section className="py-20">
      <div className="container max-w-4xl">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Company Overview</h2>
        <p className="text-muted-foreground mb-4">Geoking GIS Consultancy was founded on 12 May 2022 in Malawi with a vision to transform the land and property management landscape through innovative geospatial solutions.</p>
        <p className="text-muted-foreground mb-4">Led by a Malawian business magnate with vast technical and academic experience, the firm has rapidly grown to become a trusted partner for individuals, organizations, and government agencies seeking professional GIS, surveying, property valuation, and real estate services.</p>
      </div>
    </section>

    <section className="bg-muted py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="p-8 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center"><Eye className="w-5 h-5" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground">Becoming the leading geospatial firm across generations and nations.</p>
          </div>
          <div className="p-8 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent text-accent-foreground rounded-lg flex items-center justify-center"><Target className="w-5 h-5" /></div>
              <h3 className="font-heading text-xl font-bold text-foreground">Our Mission</h3>
            </div>
            <p className="text-muted-foreground">Delivering accurate, reliable geospatial services including mapping, satellite imagery, spatial analysis and support for urban planning, agriculture, disaster management, and navigation.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container max-w-4xl">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="text-center p-6 rounded-xl border border-border bg-card">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <v.icon className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-semibold text-foreground mb-1">{v.title}</h4>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
