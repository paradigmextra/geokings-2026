import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";
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
import Portal from './views/Portal';

const queryClient = new QueryClient();
function PublicExtras() {
  const { pathname } = useLocation();
  return ['/admin','/client'].includes(pathname) ? null : <><SplashScreen /><PageLoader /><CookieBanner /></>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <PublicExtras />
        <Routes>
          <Route path="/admin" element={<Portal admin />} />
          <Route path="/client" element={<Portal />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
