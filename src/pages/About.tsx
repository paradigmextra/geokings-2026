import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/page-hero-about.jpg";
import founderImg from "@/assets/founder-chifundo.jpg";
import { Eye, Target, Shield, Lightbulb, CheckCircle, Award, Linkedin, Mail, GraduationCap } from "lucide-react";

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
        <p className="text-muted-foreground mb-4">Geoking Consultancy was founded on 12 May 2022 in Malawi with a vision to transform the land and property management landscape through innovative geospatial solutions.</p>
        <p className="text-muted-foreground mb-4">Led by a Malawian business magnate with vast technical and academic experience, the firm has rapidly grown to become a trusted partner for individuals, organizations, and government agencies seeking professional GIS, surveying, property valuation, and real estate services.</p>
      </div>
    </section>

    {/* Founder Profile */}
    <section className="py-20 bg-muted/40">
      <div className="container max-w-5xl">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-2">Leadership</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Meet Our Founder</h2>
        </div>

        <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
          {/* Decorative gradient stripe */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

          <div className="grid md:grid-cols-5 gap-0">
            {/* Image */}
            <div className="md:col-span-2 relative bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:p-10 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-accent/40 to-primary/40 blur-xl opacity-60" />
                <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden ring-4 ring-background shadow-2xl">
                  <img
                    src={founderImg}
                    alt="Chifundo Witness, Founder of Geoking"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Chifundo Witness
              </h3>
              <p className="text-accent font-semibold mt-1 mb-5">Founder</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Chifundo Witness is the founder of Geoking, with a strong focus on geospatial solutions,
                land management, and digital innovation. He is dedicated to using technology to solve
                real-world challenges in land systems, agriculture, and urban development in Malawi.
              </p>

              {/* Qualifications */}
              <div className="mb-6 p-4 rounded-xl bg-muted/60 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4 h-4 text-accent" />
                  <h4 className="font-heading text-sm font-semibold text-foreground uppercase tracking-wide">Qualifications</h4>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>BSc in Geography (Major: GIS)</span></li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>MSc in Project Management</span></li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary">Geospatial Solutions</span>
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-accent/10 text-accent">Land Management</span>
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary">Digital Innovation</span>
              </div>
              <div className="flex gap-3 mt-6">
                <a href="https://www.linkedin.com/in/chifundo-mbewe-631338b0?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="mailto:cwitness@geokings.com" aria-label="Email" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
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
