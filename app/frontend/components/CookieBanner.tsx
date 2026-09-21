import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "geoking-cookie-consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const handle = (choice: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, date: new Date().toISOString() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[80] animate-fade-in">
      <div className="bg-card border border-border rounded-xl shadow-2xl p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-foreground mb-1">We value your privacy</h3>
            <p className="text-sm text-muted-foreground">
              Geoking Consultancy uses cookies to improve your browsing experience, analyse site traffic, and deliver
              tailored geospatial and property content. Read our{" "}
              <Link to="/cookie-policy" className="text-accent underline">Cookie Policy</Link> for details.
            </p>
          </div>
          <button
            onClick={() => handle("rejected")}
            aria-label="Dismiss"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => handle("rejected")}
            className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => handle("accepted")}
            className="flex-1 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
