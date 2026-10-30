import { useState, type FormEvent } from 'react';

import { Link } from 'react-router-dom';

import { PhoneCall, MailOpen, MapPinned, Clock3, ArrowUpRight, Send, MessageCircle } from 'lucide-react';

import Layout from '@/components/Layout';

import EditorialHero from '@/components/EditorialHero';

import { WhatsAppIcon } from '@/components/SocialLinks';

import { api } from '@/lib/api';

import { serviceData } from '../../content/services';



const fieldStyle = 'mt-2 min-h-12 w-full rounded-xl border border-input bg-white px-4 py-3 text-base font-normal text-secondary placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30';

export default function Contact() {

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const [prepared, setPrepared] = useState(false);

  const [busy,setBusy] = useState(false);

  const [error,setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault(); setBusy(true);setError('');setPrepared(false);

    try { await api('contact/public','POST',form); setPrepared(true); setForm({name:'',email:'',phone:'',subject:'',message:''}); }

    catch(error) {setError((error as Error).message);} finally {setBusy(false);}

  }

  return <Layout>

    <EditorialHero eyebrow="Contact" title="Good projects start with a conversation." description="A property question, a survey, or training for your team? Tell us what you have in mind. Our Lilongwe team will help you take the next step." image="/assets/property-commercial.jpg" imageAlt="A modern commercial building in an urban setting">

      <a href="#enquiry" className="inline-flex min-h-12 items-center gap-4 rounded-full bg-white px-6 font-semibold text-secondary">Make an enquiry <ArrowUpRight size={18}/></a>

    </EditorialHero>

    <section className="py-12 sm:py-16"><div className="container grid gap-4 md:grid-cols-3">

      <article className="rounded-2xl border border-primary/15 bg-[#f5f8f2] p-6"><PhoneCall aria-hidden="true" size={28} strokeWidth={1.6} className="mb-5 text-primary"/><h2 className="font-heading text-xl font-semibold text-secondary">Speak with our team</h2><p className="mt-2 text-sm text-muted-foreground">For service questions and project enquiries.</p><a href="tel:+265983333061" className="mt-4 flex min-h-11 items-center gap-2 font-semibold text-primary">+265 983 333 061 <ArrowUpRight size={16}/></a><a href="tel:+265881313475" className="flex min-h-11 items-center text-sm text-secondary">+265 881 313 475</a></article>

      <article className="rounded-2xl border border-primary/15 bg-[#f5f8f2] p-6"><WhatsAppIcon className="mb-5 h-7 w-7 text-primary"/><h2 className="font-heading text-xl font-semibold text-secondary">Start a WhatsApp chat</h2><p className="mt-2 text-sm text-muted-foreground">Share a little about your site, property or training needs.</p><a href="https://wa.me/265983333061" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary">Chat with Geoking <ArrowUpRight size={16}/></a></article>

      <article className="rounded-2xl border border-primary/15 bg-[#f5f8f2] p-6"><MailOpen aria-hidden="true" size={28} strokeWidth={1.6} className="mb-5 text-primary"/><h2 className="font-heading text-xl font-semibold text-secondary">Send us an email</h2><p className="mt-2 text-sm text-muted-foreground">Prefer email? Send your project details directly to our team.</p><a href="mailto:Info@geoking.org" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary">Info@geoking.org <ArrowUpRight size={16}/></a></article>

    </div></section>

    <section id="enquiry" className="pb-14 sm:pb-20"><div className="container grid items-start gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">

      <div><p className="section-label mb-3">Tell us what you need</p><h2 className="font-heading text-3xl font-semibold text-secondary sm:text-4xl">Let’s make your<br/>next step clearer.</h2><p className="mt-5 max-w-md leading-relaxed text-muted-foreground">Use the form to prepare an enquiry. We’ll open a WhatsApp draft for you to review and send, so you stay in control of your message.</p>

        <div className="mt-8 space-y-6 rounded-2xl border bg-muted/40 p-6"><div className="flex items-start gap-4"><MapPinned size={25} strokeWidth={1.6} className="shrink-0 text-primary" aria-hidden="true"/><div><h3 className="font-semibold text-secondary">Visit our office</h3><address className="mt-2 text-sm not-italic leading-relaxed text-muted-foreground">Area 4, Off Paul Kagame Road<br/>Lilongwe, Malawi</address><a href="https://www.google.com/maps/search/?api=1&query=Area%204%20Paul%20Kagame%20Road%20Lilongwe%20Malawi" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">Find the area on Maps <ArrowUpRight size={16}/></a></div></div><div className="flex items-start gap-4 border-t pt-5"><Clock3 size={25} strokeWidth={1.6} className="shrink-0 text-primary" aria-hidden="true"/><div><h3 className="font-semibold text-secondary">Office hours</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Monday–Friday: 08:00–17:00<br/>Saturday: 08:00–12:00</p></div></div></div>

      </div>

      <div className="rounded-3xl border bg-[#f6f8f3] p-5 sm:p-8"><div className="mb-6 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/15 bg-white text-primary"><MessageCircle size={24} strokeWidth={1.6}/></div><div><h3 className="font-heading text-xl font-semibold text-secondary">Your project enquiry</h3><p className="mt-1 text-xs text-muted-foreground">Fields marked * are required.</p></div></div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid gap-5 sm:grid-cols-2"><label htmlFor="enquiry-name" className="block text-sm font-semibold text-secondary">Full name *<input id="enquiry-name" name="name" autoComplete="name" required maxLength={100} value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder="Your full name" className={fieldStyle}/></label><label htmlFor="enquiry-email" className="block text-sm font-semibold text-secondary">Email address *<input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} placeholder="name@example.com" className={fieldStyle}/></label></div>

          <div className="grid gap-5 sm:grid-cols-2"><label htmlFor="enquiry-phone" className="block text-sm font-semibold text-secondary">Phone number<input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} placeholder="e.g. +265 9XX XXX XXX" className={fieldStyle}/></label><label htmlFor="enquiry-subject" className="block text-sm font-semibold text-secondary">Service of interest<select id="enquiry-subject" name="subject" value={form.subject} onChange={event => setForm({ ...form, subject: event.target.value })} className={fieldStyle}><option value="">Choose a service (optional)</option>{Object.values(serviceData).map(service => <option key={service.title} value={service.title}>{service.title}</option>)}<option>General enquiry</option></select></label></div>

          <label htmlFor="enquiry-message" className="block text-sm font-semibold text-secondary">How can we help? *<textarea id="enquiry-message" name="message" required maxLength={2950} rows={5} value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} placeholder="Tell us about your project, its location and what you need. For training, include your preferred topic and number of participants." className={`${fieldStyle} resize-y font-normal`}/></label>

          <button type="submit" disabled={busy} className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-secondary">{busy ? 'Sending…' : 'Send enquiry'} <Send size={18} aria-hidden="true"/></button>

          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

          {prepared && <p role="status" className="rounded-xl border border-primary/20 bg-white p-3 text-sm text-primary">Your enquiry has been received. The Geoking team will use your contact details to respond.</p>}

          <p className="text-xs leading-relaxed text-muted-foreground">Your enquiry is securely saved for the Geoking team. Read our <Link to="/privacy-policy" className="underline underline-offset-2">privacy policy</Link> for information about your details.</p>

        </form>

      </div>

    </div></section>

  </Layout>;

}

