export default function HeroBrandSeal({ compact = false }: { compact?: boolean }) {
  return <div className="relative hero-logo-float shrink-0" data-compact={compact ? 'true' : undefined}>
    <div className={`${compact ? 'h-20 w-20 min-[375px]:h-24 min-[375px]:w-24 sm:h-28 sm:w-28' : 'h-80 w-80'} flex items-center justify-center rounded-full bg-white shadow-2xl`}>
      <img src="/assets/logo.png" alt="Geoking Consultancy" className={`${compact ? 'h-16 w-16 min-[375px]:h-20 min-[375px]:w-20 sm:h-24 sm:w-24' : 'h-52 w-52'} object-contain`}/>
    </div>
    <span className={compact ? 'absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/30 bg-secondary px-2.5 py-1 text-[9px] font-semibold tracking-wide text-white' : 'absolute -right-2 -top-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold text-white backdrop-blur'}>Est. 2022</span>
  </div>;
}
