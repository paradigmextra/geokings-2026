import { Link } from 'react-router-dom';
import { Layers3, Satellite, MapPinned, Database, Globe2, ArrowUpRight, Check, Users, GraduationCap, MessageCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import EditorialHero from '@/components/EditorialHero';

const topics = [
  { Icon: Layers3, title: 'QGIS & ArcGIS', description: 'Build confidence with GIS tools, map layers and the workflows behind a useful map.' },
  { Icon: Satellite, title: 'Remote sensing', description: 'Explore satellite imagery and how it helps you understand land use and environmental change.' },
  { Icon: MapPinned, title: 'Spatial analysis', description: 'Work with location data to identify patterns and support better decisions.' },
  { Icon: Database, title: 'Database management', description: 'Organise geospatial information so it is easier to maintain, query and use.' },
  { Icon: Globe2, title: 'Web GIS', description: 'Learn the principles of publishing maps and sharing geospatial information online.' },
];
const enquiry = 'https://wa.me/265983333061?text=' + encodeURIComponent('Hello Geoking, I would like to enquire about GIS training. Please share the available topics, dates, format and fees.');
export default function Training() {
  return <Layout>
    <EditorialHero eyebrow="GIS training" title="Build skills. See the bigger picture." description="Practical geospatial training for professionals, teams and organisations in Malawi. Tell us what you want to learn, and we’ll help you choose a suitable programme." image="/assets/page-hero-portfolio.jpg" imageAlt="GIS maps and spatial analysis displayed on computer screens">
      <a href={enquiry} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-4 rounded-full bg-white px-6 font-semibold text-secondary">Enquire about training <ArrowUpRight size={18}/></a>
    </EditorialHero>
    <section className="py-14 sm:py-20"><div className="container">
      <div className="mb-9 max-w-2xl"><p className="section-label mb-3">What you can learn</p><h2 className="font-heading text-3xl font-semibold sm:text-4xl">Tools that turn data into insight.</h2><p className="mt-4 text-muted-foreground">Explore our core training topics. Programme content can be discussed around your experience and the work your team needs to do.</p></div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{topics.map(({ Icon, title, description }) => <article key={title} className="rounded-2xl border border-primary/15 bg-white p-6 sm:p-7"><div aria-hidden="true" className="mb-6 grid h-14 w-14 place-items-center rounded-2xl border border-primary/15 bg-primary/5 text-primary"><Icon size={28} strokeWidth={1.6}/></div><h3 className="font-heading text-xl font-semibold text-secondary">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p></article>)}
        <article className="flex flex-col justify-center rounded-2xl bg-secondary p-7 text-white"><Users size={30} strokeWidth={1.6} className="mb-5 text-teal-200"/><h3 className="font-heading text-xl font-semibold">Training for your team</h3><p className="mt-3 text-sm leading-relaxed text-white/75">Government, NGOs, agriculture, urban planning and environmental organisations.</p><Link to="/contact" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-teal-200">Discuss your needs <ArrowUpRight size={17}/></Link></article>
      </div>
    </div></section>
    <section className="bg-muted/60 py-14 sm:py-20"><div className="container grid items-start gap-10 lg:grid-cols-2">
      <div><span className="section-label">The learning experience</span><h2 className="font-heading mt-3 text-3xl font-semibold">Bring your questions.<br/>Leave with practical skills.</h2><ul className="mt-6 space-y-4">{['Hands-on learning with geospatial tools', 'Guidance from industry practitioners', 'Certification and post-training support', 'Customisable programmes for organisations'].map(text => <li key={text} className="flex items-start gap-3 text-muted-foreground"><Check size={20} className="mt-0.5 shrink-0 text-primary"/>{text}</li>)}</ul></div>
      <div className="rounded-3xl border bg-white p-6 sm:p-8"><GraduationCap className="mb-5 text-primary" size={34} strokeWidth={1.6}/><h3 className="font-heading text-2xl font-semibold">Find the right programme</h3><p className="mt-3 leading-relaxed text-muted-foreground">Share your preferred topic, experience level, number of participants and ideal dates. We’ll discuss availability, delivery format and fees with you.</p><a href={enquiry} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-primary px-5 font-semibold text-white"><MessageCircle size={19}/> Ask about the next intake</a><p className="mt-4 text-xs leading-relaxed text-muted-foreground">Dates and fees are confirmed directly with Geoking before booking.</p></div>
    </div></section>
  </Layout>;
}
