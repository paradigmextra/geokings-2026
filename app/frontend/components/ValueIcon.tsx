const illustrations: Record<string, React.ReactNode> = {
  Innovation: <><path d="m9 30 15-7 15 7-15 8-15-8Zm0 7 15 8 15-8"/><path d="M24 5c-6 0-10 4-10 9 0 4 3 6 5 9h10c2-3 5-5 5-9 0-5-4-9-10-9Z" fill="var(--value-fill)"/><path d="m21 12 5-3-3 7h5l-6 6M5 12l3 1m32 0 3-1M24 1v1"/></>,
  Accuracy: <><path d="M8 17V8h9m14 0h9v9M8 31v9h9m14 0h9v-9"/><circle cx="24" cy="24" r="12"/><path d="M24 8v7m0 18v7M8 24h7m18 0h7"/><path d="m20 25 3 3 6-7" strokeWidth="2.5"/><circle cx="24" cy="24" r="18" strokeDasharray="1 5" opacity=".3"/></>,
  Trust: <><path d="m5 20 9-9 9 3 10-3 10 9-6 8-7 10-8 3-10-10-7-11Z" fill="var(--value-fill)"/><path d="m14 11 9 3-7 8 4 4 9-7 8 9M12 31l5-5m0 10 5-5m0 10 5-5m1-8 7 7M5 20l7-7m24 0 7 7"/></>,
  Professionalism: <><path d="M11 6h26v29H11Z"/><path d="M17 13h14m-14 6h9m-9 6h6"/><circle cx="31" cy="32" r="7" fill="var(--value-fill)"/><path d="m27 38-2 8 6-3 6 3-2-8m-7-6 2 2 4-4"/></>,
  'Technology-Driven': <><path d="m7 32 17-8 17 8-17 9-17-9Zm0 7 17 8 17-8"/><rect x="15" y="8" width="18" height="18" rx="4" fill="var(--value-fill)"/><path d="M20 3v5m8-5v5M20 26v4m8-4v4M10 13h5m-5 8h5m18-8h5m-5 8h5M20 13h8v8h-8Z"/></>,
};
export default function ValueIcon({ value }: { value: string }) {
  return <div aria-hidden="true" className="relative mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full border border-primary/15 bg-gradient-to-br from-teal-50 to-white text-primary [--value-fill:#ccfbf1]">
    <span className="absolute inset-2 rounded-full border border-primary/10" />
    <svg width="52" height="52" viewBox="0 0 48 50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="relative">{illustrations[value]}</svg>
    <span className="absolute bottom-1 right-2 h-3 w-3 rounded-full bg-amber-400 ring-4 ring-white" />
  </div>;
}
