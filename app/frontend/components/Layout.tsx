import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileContact from './MobileContact';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="public-layout min-h-screen flex flex-col">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <TopBar />
    <Navbar />
    <main id="main-content" tabIndex={-1} className="flex-1 min-w-0">{children}</main>
    <Footer />
    <MobileContact />
  </div>
);

export default Layout;
