
//import { Helmet } from "react-helmet-async"; on l'utilise ps en reàct 19
import { Helmet } from "@dr.pogodin/react-helmet";

const SEO = ({
  title = "Institut Cortex – Formations & Masters en ligne",
  description = "Institut Cortex (Conakry) : formations certifiantes et Masters 100 % en ligne en partenariat avec CCL (Maroc), ASC Annecy (France) et Master Learn (Royaume-Uni). Filières : Management, Ingénierie, Finance, Santé, Génie Civil…",
  image = "/img/cortex-logo.png",
  keywords = [
    "Institut Cortex",
    "CCL",
    "ASC Annecy",
    "Master Learn",
    "Masters en ligne",
    "Formation professionnelle Guinée",
    "Management",
    "Ingénierie",
    "Finance",
    "Santé",
    "Génie civil",
    "QHSE",
    "Gestion de projet",
    "Ressources humaines",
    "Supply Chain"
  ],
  url,
  type = "website",
  siteName = "Institut Cortex | CCL · ASC Annecy · Master Learn",
  twitterHandle, // laisse vide si tu n'as pas de compte officiel
  children
}) => {
  // Schéma principal : organisme de formation
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Institut Cortex",
    url,
    logo: image,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Conakry",
      addressCountry: "GN"
    },
    // Partenariats (réseau)
    memberOf: [
      {
        "@type": "Organization",
        "name": "Centre des Compétences & Leadership (CCL)",
        "url": "https://www.ccl.ma"
      },
      {
        "@type": "CollegeOrUniversity",
        "name": "ASC Annecy (France)"
      },
      {
        "@type": "CollegeOrUniversity",
        "name": "Master Learn (Royaume-Uni)"
      }
    ],
    // Domaines couverts
    knowsAbout: [
      "Management et stratégie",
      "Contrôle de gestion",
      "Finance d’entreprise",
      "Audit interne",
      "Ingénierie & SI",
      "QHSE",
      "Gestion de projet (PMP)",
      "Logistique & Supply Chain",
      "Santé / Santé publique",
      "Génie civil"
    ]
  };

  // Schéma local succinct (point de présence à Conakry)
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Institut Cortex",
    url,
    logo: image,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Conakry",
      addressCountry: "GN"
    }
  };

  return (
    <Helmet>
      <title>{title}</title>

      {/* Meta de base */}
      <meta name="description" content={description} />
      {keywords?.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="content-language" content="fr" />
      <meta name="application-name" content={siteName} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter (facultatif si pas de handle) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

      {/* Favicons */}
      <link rel="icon" type="image/png" href="/img/cortex-logo.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/img/cortex-logo.png" />
      <html lang="fr" />

      {/* JSON-LD : Organisation + Local */}
      <script type="application/ld+json">
        {JSON.stringify([orgSchema, localSchema])}
      </script>

      {children}
    </Helmet>
  );
};

export default SEO;
