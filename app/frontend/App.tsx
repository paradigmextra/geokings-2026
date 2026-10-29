import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Routes, Route, useLocation, createPath, type To } from "react-router-dom";
import { usePathname, useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
import { useMemo } from 'react';
import { MotionConfig } from 'framer-motion';
import ScrollToTop from "./components/ScrollToTop";
import Index from "./views/Index";
import About from "./views/About";
import Services from "./views/Services";
import ServiceDetail from "./views/ServiceDetail";
import Properties from "./views/Properties";
import Portfolio from "./views/Portfolio";
import Blog from "./views/Blog";
import BlogPost from "./views/BlogPost";
import Contact from "./views/Contact";
import AgentPortal from "./views/AgentPortal";
import PrivacyPolicy from "./views/PrivacyPolicy";
import TermsOfService from "./views/TermsOfService";
import CookiePolicy from "./views/CookiePolicy";
import CookieBanner from "./components/CookieBanner";
import NotFound from "./views/NotFound";
const Portal = dynamic(() => import('./views/Portal'), { loading: () => <p className="container py-10">Loading your portal...</p> });

const queryClient = new QueryClient();
function PublicExtras() {
  const { pathname } = useLocation();
  return ['/admin','/client'].includes(pathname) ? null : <CookieBanner />;
}

const App = () => {
  const pathname = usePathname();
  const router = useRouter();
  const navigator = useMemo(() => ({
    createHref: (to: To) => typeof to === 'string' ? to : createPath(to),
    go: (delta: number) => window.history.go(delta),
    push: (to: To) => router.push(typeof to === 'string' ? to : createPath(to)),
    replace: (to: To) => router.replace(typeof to === 'string' ? to : createPath(to)),
  }), [router]);
  return (
  <MotionConfig reducedMotion="user">
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router location={pathname} navigator={navigator}>
        <ScrollToTop />
        <PublicExtras />
        <Routes>
          <Route path="/admin" element={<Portal key="admin" admin />} />
          <Route path="/client" element={<Portal key="client" />} />
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agent-portal" element={<AgentPortal />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
  </MotionConfig>
); };

export default App;
