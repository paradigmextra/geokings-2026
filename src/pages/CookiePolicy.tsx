import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import heroImg from "@/assets/page-hero-contact.jpg";

const CookiePolicy = () => (
  <Layout>
    <PageHero title="Cookie Policy" subtitle="How and why Geoking Consultancy uses cookies on this website." bgImage={heroImg} />
    <section className="py-16">
      <div className="container max-w-4xl">
        <p className="text-muted-foreground"><strong>Last updated:</strong> {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">1. What Are Cookies?</h2>
        <p className="text-muted-foreground">Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences, keep you signed in, and understand how visitors use the site.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">2. Cookies We Use</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li><strong>Strictly necessary cookies</strong> — required for core functionality such as page navigation, the agent portal sign-in, and the property-search filter. The site cannot function properly without them.</li>
          <li><strong>Preference cookies</strong> — remember your language, region, and consent choice.</li>
          <li><strong>Analytics cookies</strong> — anonymously measure how visitors interact with our GIS, training, and property pages so we can improve them.</li>
          <li><strong>Marketing cookies</strong> — used only with your consent to show relevant Geoking property and training adverts on partner platforms.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">3. Third-Party Cookies</h2>
        <p className="text-muted-foreground">We may use trusted services such as Google Analytics, mapping providers, and social-media plugins (e.g. our Facebook page). These providers may set their own cookies subject to their privacy policies.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">4. Managing Your Consent</h2>
        <p className="text-muted-foreground">When you first visit our site, a banner asks you to accept or reject non-essential cookies. You may change your choice at any time by clearing your browser cookies for this site, which will trigger the banner again.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">5. Browser Controls</h2>
        <p className="text-muted-foreground">Most browsers let you block or delete cookies via their settings. Disabling strictly necessary cookies may prevent parts of the site, such as the agent portal, from working.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">6. Changes to This Policy</h2>
        <p className="text-muted-foreground">We may update this Cookie Policy to reflect changes in technology or law. The "last updated" date above shows when it was most recently revised.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">7. Contact</h2>
        <p className="text-muted-foreground">Questions about cookies? Email <a className="text-accent" href="mailto:Info@geoking.org">Info@geoking.org</a> or call +265 983 333 061.</p>
      </div>
    </section>
  </Layout>
);

export default CookiePolicy;
