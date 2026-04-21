import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: string;
  keywords?: string;
}

const SITE_URL = "https://geoking.org";

const SEO = ({ title, description, canonical, image, type = "website", keywords }: SEOProps) => {
  const fullTitle = title.includes("Geoking") ? title : `${title} | Geoking Consultancy`;
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const ogImage = image || `${SITE_URL}/android-chrome-512x512.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
