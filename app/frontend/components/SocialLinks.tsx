import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { socialLinks } from '../../content/socials';

export function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.5 3.5A11.9 11.9 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65A11.9 11.9 0 0 0 12.05 24C18.61 24 24 18.66 24 12.11c0-3.18-1.25-6.17-3.5-8.61ZM12.05 22a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37A9.8 9.8 0 0 1 2.16 12c0-5.45 4.44-9.89 9.89-9.89A9.9 9.9 0 0 1 22 12.11C22 17.56 17.5 22 12.05 22Zm5.42-7.62c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.18.2-.35.23-.65.08-.3-.15-1.25-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.03 1.02-1.03 2.48s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"/></svg>;
}
export default function SocialLinks() {
  const items = [
    { label: 'Facebook', href: socialLinks.facebook, Icon: Facebook },
    { label: 'Instagram', href: socialLinks.instagram, Icon: Instagram },
    { label: 'LinkedIn', href: socialLinks.linkedin, Icon: Linkedin },
    { label: 'WhatsApp', href: socialLinks.whatsapp, Icon: WhatsAppIcon },
  ];
  const style = 'grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10';
  return <nav aria-label="Geoking social media" className="flex flex-wrap items-center gap-3">{items.map(({ label, href, Icon }) => href ? <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className={style}><Icon className="h-5 w-5" aria-hidden="true"/></a> : <button key={label} type="button" disabled aria-label={`${label} link not added yet`} title={`${label} link not added yet`} className={style}><Icon className="h-5 w-5" aria-hidden="true"/></button>)}</nav>;
}
