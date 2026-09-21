import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
const heroImg = "/assets/page-hero-contact.jpg";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <SEO
        title="Contact Geoking Consultancy | Lilongwe, Malawi"
        description="Get in touch with Geoking Consultancy in Lilongwe, Malawi. Phone +265 983 333 061 / +265 881 313 475. Email Info@geoking.org."
        canonical="/contact"
        keywords="contact Geoking, GIS consultant Lilongwe, property valuer Malawi, Geoking phone"
      />
      <PageHero title="Contact Us" subtitle="Get in touch with our team. We're here to help with all your GIS and property needs." bgImage={heroImg} />

      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">We'd love to hear from you. Whether you need a quote, have a question, or want to discuss a project, our team is ready to help.</p>

              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Our Office", lines: ["Area 4, Off Paul Kagame Road", "Lilongwe, Malawi"] },
                  { icon: Phone, title: "Phone Numbers", lines: ["+265 983 333 061", "+265 881 313 475"] },
                  { icon: Mail, title: "Email", lines: ["Info@geoking.org"] },
                  { icon: Clock, title: "Office Hours", lines: ["Mon - Fri: 8:00 AM - 5:00 PM", "Sat: 8:00 AM - 12:00 PM"] },
                ].map(item => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-10 h-10 bg-primary/10 text-accent rounded-full flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                      {item.lines.map(l => <p key={l} className="text-sm text-muted-foreground">{l}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-xl border border-border p-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-accent" /> Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                      <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                      <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                      <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+265 xxx xxx xxx" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
                      <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="What is this about?" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us about your project or inquiry..." className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                  </div>
                  <button type="submit" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/265983333061"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white px-5 py-3.5 rounded-full shadow-2xl transition-all hover:scale-105 group"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="hidden sm:inline font-semibold text-sm">Chat on WhatsApp</span>
      </a>
    </Layout>
  );
};

export default Contact;

