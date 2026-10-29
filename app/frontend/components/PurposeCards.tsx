import { Globe2, Telescope, Navigation2, ScanLine } from 'lucide-react';

export default function PurposeCards() {
  return <section className="py-16 sm:py-20" aria-label="Our vision and mission">
    <div className="container grid gap-5 md:grid-cols-2 sm:gap-6">
      {[
        { title: 'Our Vision', label: 'Looking further', Icon: Telescope, Detail: Globe2, dark: false, text: 'Becoming the leading geospatial firm across generations and nations, setting the standard for innovation, accuracy, and excellence in land and property solutions.' },
        { title: 'Our Mission', label: 'Moving with purpose', Icon: Navigation2, Detail: ScanLine, dark: true, text: 'Delivering accurate, reliable geospatial services including mapping, satellite imagery, spatial analysis and support for urban planning, agriculture, disaster management, and navigation.' },
      ].map(({ title, label, Icon, Detail, dark, text }) => <article key={title} className={`relative overflow-hidden rounded-3xl border p-6 sm:p-9 ${dark ? 'border-secondary bg-secondary text-white' : 'border-primary/15 bg-muted/60 text-secondary'}`}>
        <div aria-hidden="true" className={`absolute -right-12 -top-12 h-48 w-48 rounded-full border-[24px] ${dark ? 'border-white/5' : 'border-primary/5'}`} />
        <div aria-hidden="true" className={`relative mb-7 grid h-20 w-20 place-items-center rounded-2xl border shadow-sm ${dark ? 'border-white/20 bg-white/10 text-teal-200' : 'border-primary/20 bg-white text-primary'}`}>
          <Icon size={38} strokeWidth={1.6} />
          <span className={`absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-full border-4 ${dark ? 'border-secondary bg-teal-200 text-secondary' : 'border-muted bg-primary text-white'}`}><Detail size={16} strokeWidth={1.8} /></span>
        </div>
        <p className={`mb-2 text-xs font-semibold uppercase tracking-[.18em] ${dark ? 'text-teal-200' : 'text-primary'}`}>{label}</p>
        <h2 className="font-heading mb-4 text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className={`max-w-lg text-base leading-relaxed sm:text-lg ${dark ? 'text-white/80' : 'text-muted-foreground'}`}>{text}</p>
      </article>)}
    </div>
  </section>;
}
