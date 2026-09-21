import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * PageLoader: shows a circular loading ring (no logo) for 3 seconds
 * each time the route changes (after the initial splash screen).
 */
const PageLoader = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    // Skip the very first mount - the SplashScreen handles initial load
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-secondary/95 backdrop-blur-sm animate-fade-in">
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div
          className="absolute w-32 h-32 rounded-full border-4 border-transparent border-t-accent border-r-accent/40 animate-spin"
          style={{ animationDuration: "1.2s" }}
        />
        {/* Inner pulse ring */}
        <div
          className="absolute w-24 h-24 rounded-full border-2 border-accent/40 animate-ping"
          style={{ animationDuration: "1.8s" }}
        />
        {/* Center dot */}
        <div className="w-4 h-4 rounded-full bg-accent animate-pulse" />
      </div>
    </div>
  );
};

export default PageLoader;
