import { useEffect, useState } from "react";
const logo = "/assets/logo.png";

const SplashScreen = () => {
  const [hidden, setHidden] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const sessionShown = sessionStorage.getItem("geoking-splash-shown");
    if (sessionShown) {
      setHidden(true);
      return;
    }
    const fadeTimer = setTimeout(() => setFadeOut(true), 4500);
    const hideTimer = setTimeout(() => {
      setHidden(true);
      sessionStorage.setItem("geoking-splash-shown", "1");
    }, 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-secondary transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="absolute w-56 h-56 rounded-full border-4 border-transparent border-t-accent border-r-accent/40 animate-spin" style={{ animationDuration: "1.8s" }} />
        {/* Inner pulse ring */}
        <div className="absolute w-44 h-44 rounded-full border-2 border-accent/30 animate-ping" style={{ animationDuration: "2s" }} />
        {/* White circle with logo */}
        <div className="relative w-36 h-36 rounded-full bg-background shadow-2xl flex items-center justify-center animate-scale-in">
          <img src={logo} alt="Geoking Consultancy" className="w-24 h-24 object-contain" />
        </div>
      </div>
      <div className="absolute bottom-20 text-center animate-fade-in">
        <h1 className="font-heading text-2xl font-bold text-primary-foreground tracking-wide">
          GEOKING <span className="text-accent">CONSULTANCY</span>
        </h1>
        <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60 mt-2">Geospatial & Property Solutions</p>
      </div>
    </div>
  );
};

export default SplashScreen;
