import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
const heroImg = "/assets/page-hero-about.jpg";

const PrivacyPolicy = () => (
  <Layout>
    <PageHero title="Privacy Policy" subtitle="How Geoking Consultancy collects, uses, and protects your information." bgImage={heroImg} />
    <section className="py-16">
      <div className="container max-w-4xl prose prose-slate dark:prose-invert">
        <p className="text-muted-foreground"><strong>Last updated:</strong> {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">1. Introduction</h2>
        <p className="text-muted-foreground">Geoking Consultancy ("we", "our", or "us") is a Malawi-based geospatial and property solutions firm. This Privacy Policy explains how we collect, use, store, share, and protect personal data when you use our website, request our GIS or land-survey services, list a property, or interact with us as an agent or client.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">2. Information We Collect</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li><strong>Identity & contact data:</strong> name, phone number, email address, postal address.</li>
          <li><strong>Property & land data:</strong> parcel coordinates, title deeds, valuation records, photographs, and survey data you provide.</li>
          <li><strong>Geospatial data:</strong> GPS locations, GIS layers, and satellite-imagery requests linked to your projects.</li>
          <li><strong>Agent data:</strong> identification, qualifications, and listing history for registered agents.</li>
          <li><strong>Technical data:</strong> IP address, browser type, device information, and cookies (see our Cookie Policy).</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">3. How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>To deliver land surveying, GIS, valuation, and property-management services.</li>
          <li>To process property listings, enquiries, and transactions through our marketplace.</li>
          <li>To comply with Malawian land laws, the Lands Act, and surveyor-registration requirements.</li>
          <li>To improve our website, services, and client communication.</li>
          <li>To send service updates, training invitations, or marketing (only with consent).</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">4. Lawful Basis</h2>
        <p className="text-muted-foreground">We process personal data on the basis of your consent, the performance of a contract for services, our legitimate business interests, and compliance with legal obligations under Malawian law, including the Data Protection Act, 2024.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">5. Sharing Your Information</h2>
        <p className="text-muted-foreground">We do not sell personal data. We may share information with: government departments (e.g. Ministry of Lands, Survey Department) where legally required; verified buyers, sellers, or agents in a transaction you initiate; trusted technology providers hosting our website and storing project data under strict confidentiality.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">6. Data Retention</h2>
        <p className="text-muted-foreground">Survey records, valuation reports, and cadastral data are retained for the period required by Malawian land-law and professional standards (typically a minimum of 10 years). Marketing data is kept until you withdraw consent.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">7. Your Rights</h2>
        <p className="text-muted-foreground">You may request access, correction, or deletion of your personal data, withdraw consent for marketing, or lodge a complaint with the Malawi Communications Regulatory Authority (MACRA). Contact us at <a className="text-accent" href="mailto:Info@geoking.org">Info@geoking.org</a>.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">8. Security</h2>
        <p className="text-muted-foreground">We use encryption, access controls, and secure cloud storage to safeguard geospatial files, deeds, and personal data. However, no transmission over the internet is 100% secure.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">9. Contact</h2>
        <p className="text-muted-foreground">Geoking Consultancy, Area 3, Off Paul Kagame Road, Lilongwe, Malawi. Phone: +265 983 333 061 · Email: Info@geoking.org</p>
      </div>
    </section>
  </Layout>
);

export default PrivacyPolicy;

