import { useState } from 'react';
import { Pause, Play, Quote, Star } from 'lucide-react';

type Testimonial = { name: string; role: string; text: string; rating: number; image: string };
function Review({ review }: { review: Testimonial }) {
  return <figure className="relative rounded-2xl border border-border bg-card p-6 sm:p-7">
    <Quote aria-hidden="true" className="absolute right-5 top-5 h-8 w-8 text-primary/15" />
    <div className="mb-4 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
      {Array.from({ length: review.rating }, (_, index) => <Star key={index} aria-hidden="true" className="h-4 w-4 fill-amber-500 text-amber-500" />)}
    </div>
    <blockquote className="relative mb-5 text-base leading-relaxed text-foreground">“{review.text}”</blockquote>
    <figcaption className="flex items-center gap-3">
      <img src={review.image} alt="" loading="lazy" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-primary/15" />
      <div><p className="font-semibold text-secondary">{review.name}</p><p className="text-sm text-muted-foreground">{review.role}</p></div>
    </figcaption>
  </figure>;
}
export default function Testimonials({ reviews }: { reviews: Testimonial[] }) {
  const [paused, setPaused] = useState(false);
  return <section className="py-16 sm:py-20" aria-labelledby="testimonials-title">
    <div className="container">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <span className="section-label mb-2 block">Testimonials</span>
        <h2 id="testimonials-title" className="font-heading text-3xl font-bold sm:text-4xl">What Our Clients Say</h2>
        <p className="mt-3 text-muted-foreground">Trusted by property developers, agricultural officers, urban planners, and real estate investors across Malawi.</p>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)} className="testimonial-control mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 text-sm font-semibold text-primary">
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}{paused ? 'Resume scrolling' : 'Pause scrolling'}
        </button>
      </div>
      <div className="testimonial-window relative mx-auto grid max-w-5xl gap-5 md:grid-cols-2" data-paused={paused}>
        {[reviews, [...reviews.slice(2), ...reviews.slice(0, 2)]].map((column, columnIndex) => <div key={columnIndex} className={`testimonial-column ${columnIndex ? 'hidden md:block' : ''}`} aria-hidden={columnIndex === 1 ? true : undefined}>
          <div className="testimonial-track" style={{ animationDuration: columnIndex ? '64s' : '56s' }}>
            {[0, 1].map(copy => <div key={copy} className={`testimonial-group grid gap-5 pb-5 ${copy ? 'testimonial-copy' : ''}`} aria-hidden={copy === 1 ? true : undefined}>
              {column.map(review => <Review key={review.name} review={review} />)}
            </div>)}
          </div>
        </div>)}
      </div>
    </div>
  </section>;
}
