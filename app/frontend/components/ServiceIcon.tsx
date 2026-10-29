import { BookOpen, FileCheck2, GraduationCap, MapPin } from 'lucide-react';

const drawings: Record<string, React.ReactNode> = {
  'property-management': <><path d="M9 40V17l15-9 15 9v23H9Z"/><path d="M19 40V28h10v12M16 20h3m10 0h3M16 25h3m10 0h3"/><circle cx="36" cy="34" r="7" fill="var(--icon-fill)"/><path d="m33 34 2 2 4-4"/></>,
  valuation: <><path d="m7 22 16-13 16 13M11 20v20h19M19 40V28h9"/><circle cx="32" cy="31" r="9" fill="var(--icon-fill)"/><path d="m38 38 6 6M32 25v12m3-9h-5a2 2 0 0 0 0 4h3a2 2 0 0 1 0 4h-5"/></>,
  equipment: <><path d="m18 27-7 16m19-16 7 16M24 27v16M16 27h16M24 20v7"/><rect x="12" y="11" width="24" height="10" rx="3" transform="rotate(-12 24 16)" fill="var(--icon-fill)"/><path d="m20 10-1-5 8-2 1 5M35 10l6-1 2 8-6 1"/><circle cx="23" cy="16" r="2"/></>,
  architecture: <><path d="M9 8h25v32H9Z"/><path d="M15 14h13v8H15Zm0 14h7v6h-7M28 28v6M15 18h5"/><path d="m29 38 12-24 4 2-12 24-5 3 1-5Z" fill="var(--icon-fill)"/></>,
  'quantity-surveying': <><rect x="8" y="7" width="23" height="34" rx="3"/><path d="M13 13h13v7H13ZM14 26h1m8 0h1m-10 6h1m8 0h1"/><path d="M35 8h7v34h-7ZM35 15h4m-4 7h3m-3 7h4m-4 7h3" fill="var(--icon-fill)"/></>,
  'land-surveying': <><path d="m6 16 12-5 12 5 12-5v27l-12 5-12-5-12 5V16ZM18 12v26m12-21v26"/><path d="M34 13c0 6-7 12-7 12s-7-6-7-12a7 7 0 1 1 14 0Z" fill="var(--icon-fill)"/><circle cx="27" cy="13" r="2"/><path d="m10 29 4-2m9 6 3 1m9-3 3-1"/></>,
};
export default function ServiceIcon({ path }: { path: string }) {
  const slug = path.split('/').pop() || '';
  const Fallback = slug === 'land-laws' ? BookOpen : slug === 'registration' ? FileCheck2 : slug === 'gis-trainings' ? GraduationCap : MapPin;
  return <div aria-hidden="true" className="service-icon relative mb-6 grid h-20 w-20 shrink-0 place-items-center rounded-[1.4rem] border border-teal-200 bg-teal-50 text-primary [--icon-fill:#ccfbf1]">
    <span className="absolute inset-1 rounded-[1.1rem] border border-white/80" />
    {drawings[slug] ? <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="relative">{drawings[slug]}</svg> : <Fallback size={36} strokeWidth={1.6} className="relative" />}
    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-white bg-primary" />
  </div>;
}
