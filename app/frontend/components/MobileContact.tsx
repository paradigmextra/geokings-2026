import { Phone, MessageCircle } from 'lucide-react';
export default function MobileContact() {
  return <aside aria-label="Contact Geoking" className="mobile-contact fixed inset-x-0 bottom-0 z-[60] grid grid-cols-2 gap-3 border-t bg-background/95 px-4 pt-3 backdrop-blur md:hidden">
    <a href="tel:+265983333061" className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary text-sm font-semibold text-primary"><Phone size={18} aria-hidden="true" />Call Geoking</a>
    <a href="https://wa.me/265983333061?text=Hello%20Geoking%2C%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white"><MessageCircle size={18} aria-hidden="true" />WhatsApp us</a>
  </aside>;
}
