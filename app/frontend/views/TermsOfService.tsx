import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
const heroImg = "/assets/page-hero-services.jpg";

const TermsOfService = () => (
  <Layout>
    <PageHero title="Terms of Service" subtitle="The terms governing your use of Geoking Consultancy's website and services." bgImage={heroImg} />
    <section className="py-16">
      <div className="container max-w-4xl">
        <p className="text-muted-foreground"><strong>Last updated:</strong> {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground">By accessing this website or engaging Geoking Consultancy ("Geoking", "we") for geospatial, surveying, valuation, training, or property services, you agree to these Terms of Service and all applicable Malawian laws.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">2. Our Services</h2>
        <p className="text-muted-foreground">Geoking provides Real Property Management, Property Valuation, Land Surveying, Architectural Services, Quantity Surveying, GIS Training, Land Laws Training, and a property marketplace. All professional services are delivered by qualified, registered practitioners in line with the Land Survey Act, the Physical Planning Act, and the standards of the Surveyors Institute of Malawi.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">3. Engagement & Quotes</h2>
        <p className="text-muted-foreground">A formal engagement begins only once a written quotation has been accepted and any required deposit received. Survey schedules depend on weather, accessibility, and approvals from the Department of Surveys.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">4. Use of the Website</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>You agree not to misuse the site, attempt unauthorised access, or upload misleading property listings.</li>
          <li>Property listings on the marketplace are provided by sellers or registered agents; Geoking verifies but does not guarantee every detail.</li>
          <li>All maps, GIS layers, valuation reports, and survey plans produced by Geoking remain our intellectual property until full payment is made.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">5. Agent Portal</h2>
        <p className="text-muted-foreground">Registered agents must provide accurate identification, hold any required licences, and list only properties they are legally authorised to market. Geoking may suspend accounts that breach these terms or Malawian property law.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">6. Fees & Payment</h2>
        <p className="text-muted-foreground">Service fees are quoted in Malawian Kwacha (MWK) unless otherwise agreed. Late payment may attract interest at the Reserve Bank of Malawi base rate plus 5%.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">7. Limitation of Liability</h2>
        <p className="text-muted-foreground">Geoking's liability for any claim relating to its services is limited to the fees paid for the specific service in question. We are not liable for indirect or consequential losses, or for third-party data inaccuracies in publicly available cadastral or satellite datasets.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">8. Confidentiality</h2>
        <p className="text-muted-foreground">All client survey data, deeds, and valuation reports are treated as confidential and handled only by authorised personnel.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">9. Governing Law</h2>
        <p className="text-muted-foreground">These terms are governed by the laws of the Republic of Malawi. Any dispute shall be resolved in the courts of Lilongwe.</p>

        <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-3">10. Contact</h2>
        <p className="text-muted-foreground">Geoking Consultancy · +265 983 333 061 · <a className="text-accent" href="mailto:Info@geoking.org">Info@geoking.org</a></p>
      </div>
    </section>
  </Layout>
);

export default TermsOfService;

