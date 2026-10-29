import { useEffect, useId, useRef, useState } from 'react';

const figures = [
  { value: 3, suffix: '+', label: 'Years experience' },
  { value: 10, suffix: '+', label: 'Services offered' },
  { value: 500, suffix: '+', label: 'Parcels surveyed' },
  { value: 100, suffix: '%', label: 'Client satisfaction' },
];

export default function CompanyNumbers() {
  const panel = useRef<HTMLElement>(null);
  const headingId = useId();
  // Send the final values in the initial HTML, including when JavaScript is unavailable.
  const [progress, setProgress] = useState(1);
  useEffect(() => {
    const element = panel.current;
    if (!element) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    const stop = () => {
      if (!reducedMotion.matches) return;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      setProgress(1);
    };
    if (!reducedMotion.matches) {
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer?.disconnect();
        setProgress(0);
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = Math.min((now - start) / 1800, 1);
          setProgress(1 - Math.pow(1 - elapsed, 3));
          if (elapsed < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      }, { threshold: 0.2 });
      observer.observe(element);
    }
    reducedMotion.addEventListener('change', stop);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      reducedMotion.removeEventListener('change', stop);
    };
  }, []);

  return <section ref={panel} aria-labelledby={headingId} className="relative overflow-hidden rounded-[1.75rem] bg-secondary p-6 text-white sm:p-9">
    <svg aria-hidden="true" viewBox="0 0 480 420" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full text-teal-200/10" fill="none" stroke="currentColor" strokeWidth="1"><path d="m-40 310 280-170 280 170M-40 270 240 100l280 170M-40 230 240 60l280 170M-40 190 240 20l280 170M0 420 280 250m-200 170 280-170m-200 170 280-170m-200 170 280-170"/></svg>
    <div className="relative flex items-center justify-between gap-3 border-b border-white/15 pb-5">
      <h3 id={headingId} className="text-xs font-semibold uppercase tracking-[.16em] text-teal-200 sm:text-sm">Geoking in numbers</h3>
      <span className="shrink-0 text-[11px] text-white/60 sm:text-xs">Since 2022</span>
    </div>
    <dl className="relative grid grid-cols-2">
      {figures.map((figure, index) => <div key={figure.label} className={`flex min-w-0 flex-col py-7 sm:py-8 ${index % 2 === 0 ? 'border-r border-white/15 pr-4 sm:pr-7' : 'pl-5 sm:pl-8'} ${index < 2 ? 'border-b border-white/15' : 'pb-1 sm:pb-2'}`}>
        <dt className="order-2 mt-3 text-xs font-medium leading-relaxed text-white/75 sm:text-sm">{figure.label}</dt>
        <dd className="order-1 font-heading text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none tracking-[-.06em] [font-variant-numeric:tabular-nums]">
          <span className="sr-only">{figure.value}{figure.suffix}</span>
          <span aria-hidden="true"><span className="company-count">{Math.round(figure.value * progress)}</span><span className="ml-1 align-top text-[.55em] leading-tight text-teal-200">{figure.suffix}</span></span>
        </dd>
      </div>)}
    </dl>
  </section>;
}
