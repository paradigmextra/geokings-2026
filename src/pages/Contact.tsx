import Layout from "@/components/Layout";
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
      <section className="page-hero">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="opacity-90 max-w-2xl mx-auto">Get in touch with our team. We're here to help with all your GIS and property needs.</p>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">We'd love to hear from you. Whether you need a quote, have a question, or want to discuss a project, our team is ready to help.</p>

              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Our Office", lines: ["Area 3, Off Paul Kagame Road", "Lilongwe, Malawi"] },
                  { icon: Phone, title: "Phone Numbers", lines: ["+265 999 123 456", "+265 888 234 567"] },
                  { icon: Mail, title: "Email", lines: ["info@geokings.mw"] },
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
    </Layout>
  );
};

export default Contact;
