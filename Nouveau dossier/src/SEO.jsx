import { Helmet } from "@dr.pogodin/react-helmet";

const SITE_URL = "https://www.institut-cortex.com";
const DEFAULT_IMAGE = "/img/cortex-logo.png";
const ORG_DESCRIPTION =
  "Institut Cortex à Conakry propose des parcours de formation organisés en Grandes Écoles pour étudiants, jeunes professionnels, cadres et managers.";

const CURRENT_TOPICS = [
  "Management & Business",
  "Logistique & Supply Chain",
  "Digital, Technologie & IA",
  "Industrie, Mines & Opérations",
  "Agri-Business & Économie Verte",
  "Projet, Conseil & Employabilité / Transformation",
  "Finance, Comptabilité & Banque",
];

function absoluteUrl(value, fallback = SITE_URL) {
  if (!value) return fallback;
  try {
    return new URL(value, SITE_URL).href;
  } catch {
    return fallback;
  }
}

function canonicalUrl(value) {
  try {
    const parsed = new URL(value || "/", SITE_URL);
    if (parsed.hostname === "institut-cortex.com" || parsed.hostname === "www.institut-cortex.com") {
      parsed.protocol = "https:";
      parsed.hostname = "www.institut-cortex.com";
    }
    parsed.search = "";
    parsed.hash = "";
    return parsed.href;
  } catch {
    return SITE_URL;
  }
}

function currentCanonical() {
  if (typeof window === "undefined") return SITE_URL;
  return canonicalUrl(window.location.pathname || "/");
}

const SEO = ({
  title = "Institut Cortex | Grandes Écoles & formations professionnelles",
  description = "Institut Cortex à Conakry : parcours de formation organisés en Grandes Écoles pour étudiants, jeunes professionnels, cadres et managers.",
  image = DEFAULT_IMAGE,
  imageAlt = "Institut Cortex",
  keywords = [
    "Institut Cortex",
    "Formation professionnelle Guinée",
    "Grandes Écoles Conakry",
    "Cortex Junior Academy",
    "Cortex Executive Academy",
    ...CURRENT_TOPICS,
  ],
  url,
  type = "website",
  siteName = "Institut Cortex",
  twitterHandle,
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  schemas = [],
  children,
}) => {
  const canonical = canonicalUrl(url || currentCanonical());
  const socialImage = absoluteUrl(image, absoluteUrl(DEFAULT_IMAGE));

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "Institut Cortex",
    url: SITE_URL,
    logo: absoluteUrl(DEFAULT_IMAGE),
    description: ORG_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Conakry",
      addressCountry: "GN",
    },
    knowsAbout: CURRENT_TOPICS,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: siteName,
    url: SITE_URL,
    inLanguage: "fr",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const pageSchemas = Array.isArray(schemas) ? schemas.filter(Boolean) : [];
  const jsonLd = [organizationSchema, websiteSchema, ...pageSchemas];

  return (
    <Helmet>
      <html lang="fr" />
      <title>{title}</title>

      <meta name="description" content={description} />
      {keywords?.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="robots" content={robots} />
      <meta name="application-name" content={siteName} />
      <meta name="theme-color" content="#0E2D4F" />
      <meta httpEquiv="content-language" content="fr" />

      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

      <link rel="icon" type="image/png" href="/img/cortex-logo.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/img/cortex-logo.png" />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {children}
    </Helmet>
  );
};

export default SEO;
