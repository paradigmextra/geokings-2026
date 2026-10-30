/** Shared brand animation; the caller controls its real loading lifetime. */
export default function PageLoader({ mode = 'screen' }: { mode?: 'screen' | 'navigation' | 'splash' | 'inline' }) {
  if (mode === 'navigation') return <div role="progressbar" aria-label="Opening page" className="brand-navigation-progress pointer-events-none fixed inset-x-0 top-0 z-[150] overflow-hidden"/>;
  const splash = mode === 'splash';
  return <div role="status" aria-label={splash ? 'Loading Geoking' : 'Loading page'} className={splash ? 'initial-site-splash fixed inset-0 z-[140] grid place-items-center bg-secondary' : mode === 'inline' ? 'grid min-h-48 place-items-center' : 'grid min-h-[100dvh] place-items-center bg-[#fafbf8]'}>
    <div className={`relative brand-loading-mark ${splash ? 'h-40 w-40' : 'h-16 w-16'}`} aria-hidden="true">
      <div className={`brand-loading-ring absolute inset-0 rounded-full border-2 ${splash ? 'border-white/15 border-t-teal-200' : 'border-primary/15 border-t-primary'}`}/>
      <div className={`absolute grid place-items-center rounded-full bg-white ${splash ? 'inset-4 shadow-lg' : 'inset-1.5'}`}><img src="/assets/logo.png" alt="" width={splash ? 96 : 40} height={splash ? 96 : 40} className={splash ? 'h-24 w-24 object-contain' : 'h-10 w-10 object-contain'}/></div>
    </div>
  </div>;
}
