import { useState } from 'react';
import { Star } from 'lucide-react';
import ClientAvatar from './ClientAvatar';

type Testimonial = { name: string; role: string; text: string; rating: number };
function Review({ review, index }: { review: Testimonial; index: number }) {
  return <figure className="testimonial-card flex w-[min(340px,calc(100vw-3rem))] shrink-0 flex-col rounded-2xl border border-primary/15 bg-[#f6f8f3] p-6 sm:w-[360px] sm:p-7">
    <figcaption className="mb-5 flex items-center gap-3">
      <ClientAvatar variant={index}/>
      <div className="min-w-0"><div className="mb-1.5 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }, (_, star) => <Star key={star} aria-hidden="true" className="h-3.5 w-3.5 fill-primary text-primary"/>)}</div><p className="font-heading text-sm font-bold text-secondary">{review.name}</p><p className="mt-0.5 text-xs text-muted-foreground">{review.role}</p></div>
    </figcaption>
    <blockquote className="mb-6 flex-1 text-[15px] leading-relaxed text-secondary/85">“{review.text}”</blockquote>
    <div aria-hidden="true" className="flex items-center justify-between border-t border-primary/10 pt-4"><span className="font-heading text-xs font-extrabold tracking-[.08em] text-secondary">GEOKING<span className="text-primary">.</span></span><span className="text-[10px] font-semibold uppercase tracking-[.13em] text-primary/75">Client stories</span></div>
  </figure>;
}
export default function Testimonials({ reviews }: { reviews: Testimonial[] }) {
  const [touchPaused, setTouchPaused] = useState(false);
  return <section className="py-16 sm:py-20" aria-labelledby="testimonials-title">
    <div className="container">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <span className="section-label mb-2 block">Testimonials</span>
        <h2 id="testimonials-title" className="font-heading text-3xl font-bold sm:text-4xl">What Our Clients Say</h2>
        <p className="mt-3 text-muted-foreground">Trusted by property developers, agricultural officers, urban planners, and real estate investors across Malawi.</p>
      </div>
      <div className="testimonial-window relative rounded-xl" tabIndex={0} role="region" aria-label="Client testimonials" aria-describedby="testimonial-help" data-paused={touchPaused} onTouchStart={() => setTouchPaused(true)}>
        <p id="testimonial-help" className="sr-only">Testimonials move horizontally. Hover or focus here to pause. On a phone, touch to stop the motion and swipe to browse.</p>
        <div className="testimonial-track">
          {[0, 1].map(copy => <div key={copy} className={`testimonial-group ${copy ? 'testimonial-copy' : ''}`} aria-hidden={copy === 1 ? true : undefined}>
            {reviews.map((review, index) => <Review key={review.name} review={review} index={index}/>)}
          </div>)}
        </div>
      </div>
    </div>
  </section>;
}
