import { useEffect, useState } from 'react';
import PageLoader from './PageLoader';

/** Initial homepage animation ends on readiness, never after a mandatory wait. */
export default function SplashScreen({ initialPath }: { initialPath: string }) {
  const [homeStart] = useState(initialPath === '/');
  const [visible, setVisible] = useState(homeStart);
  useEffect(() => {
    if (!homeStart) return;
    try { if (sessionStorage.getItem('geoking-splash-shown')) { setVisible(false); return; } } catch { /* Storage may be disabled. */ }
    const finish = () => {
      setVisible(false);
      try { sessionStorage.setItem('geoking-splash-shown', '1'); } catch { /* Readiness does not depend on storage. */ }
    };
    if (document.readyState === 'complete') { finish(); return; }
    // A slow image must not prevent visitors using the already-rendered homepage.
    const timeout = window.setTimeout(() => { window.removeEventListener('load', onLoad); finish(); }, 1200);
    const onLoad = () => { window.clearTimeout(timeout); finish(); };
    window.addEventListener('load', onLoad, { once: true });
    return () => { window.clearTimeout(timeout); window.removeEventListener('load', onLoad); };
  }, [homeStart]);
  if (!visible) return null;
  return <><noscript><style>{'.initial-site-splash{display:none!important}'}</style></noscript><PageLoader mode="splash"/></>;
}
