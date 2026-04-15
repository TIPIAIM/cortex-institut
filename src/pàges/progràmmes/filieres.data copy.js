/**
 * @typedef {Object} Filiere
 * @property {string} slug                       // URL slug (/programme/:slug)
 * @property {string} title                      // Titre de filière
 * @property {string[]} programs                 // Programmes (rétro-compatible)
 * @property {string} [description]              // Courte description
 * @property {string[]} [outcomes]               // Bénéfices/points forts (3–5 bullets)
 * @property {string} [iconName]                 // Nom d’icône (lucide-react) ex: 'briefcase', 'shield', 'cpu'
 * @property {string} [accent]                   // Couleur accent (hex)
 * @property {string} [heroKey]                  // Clé d’image dans imagess (ex: 'loreàt', 'DirecteurInstitutCortex2')
 * @property {Object} [meta]                     // Métadonnées affichables
 * @property {string} [meta.level]               // "Certifiant" | "Master" | "Pro"
 * @property {string} [meta.mode]                // "En ligne" | "Hybride"
 * @property {string} [meta.duration]            // "6–12 mois", etc.
 * @property {string[]} [keywords]               // Mots-clés SEO/filtres
 */

/** @type {Filiere[]} */
export const filieres = [
  {
    slug: "management-leadership",
    title: "Management & Leadership",
    iconName: "briefcase",
    accent: "#F2C94C",
    heroKey: "mànegem",
    description:
      "Piloter la stratégie, aligner les équipes et transformer les organisations par la performance et le leadership.",
    outcomes: [
      "Vision & diagnostic stratégiques",
      "Pilotage par KPIs & tableaux de bord",
      "Leadership & conduite du changement",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "6–12 mois" },
    keywords: ["stratégie", "leadership", "management", "transformation"],
    programs: [
      "Management & Stratégie d’Entreprise",
      "Gestion de Projet & Leadership (prépa PMP®)",
      "Responsables PMO : structurer et piloter",
      "Devenir Stratège : vision → impact",
      "Leadership Féminin",
      "Coopératives : gouvernance & impact",
    ],
  },
  {
    slug: "finance-controle",
    title: "Finance & Contrôle de gestion",
    iconName: "banknote",
    accent: "#29B6F6",
    heroKey: "finànce",
    //"àutàbleàu",
    description:
      "Maîtriser les fondamentaux financiers, le contrôle de gestion et le reporting pour une création de valeur durable.",
    outcomes: [
      "Lecture & analyse des états financiers",
      "Budgets, prévisions, trésorerie",
      "Tableaux de bord & performance",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "6–12 mois" },
    keywords: ["finance", "contrôle de gestion", "IFRS", "audit"],
    programs: [
      "Finance d’Entreprise (lecture états financiers)",
      "Contrôle de Gestion 2.0 (Tableaux de bord)",
      "Audit financier & comptable",
      "IFRS : comptabilité internationale",
      "Finance verte & investissements ESG",
      "Reporting ESG & bailleurs de fonds",
    ],
  },
  {
    slug: "ressources-humaines",
    title: "Ressources Humaines",
    iconName: "users",
    accent: "#9B51E0",
    heroKey: "ressourceshumaines",
    description:
      "Développer les talents, structurer les parcours et renforcer la performance sociale de l’organisation.",
    outcomes: [
      "Recrutement & entretiens structurés",
      "GEPP (ex-GPEC) & cartographie des compétences",
      "Rémunération, formation & QVT",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "4–9 mois" },
    keywords: ["RH", "recrutement", "formation", "QVT"],
    programs: [
      "Positionner la fonction RH",
      "Recrutement & entretiens structurés",
      "GEPP (ex-GPEC) : parcours & compétences",
      "Formation : plan & dispositifs",
      "Rémunération & politique salariale",
      "Climat social & QVT",
    ],
  },
  {
    slug: "qhse",
    title: "QHSE & Conformité",
    iconName: "shield",
    accent: "#27AE60",
    heroKey: "khse",
    description:
      "Mettre en place un système intégré qualité, hygiène, sécurité, environnement et assurer la conformité.",
    outcomes: [
      "Systèmes de management QHSE (ISO)",
      "Audit interne & amélioration continue",
      "Sécurité & résilience opérationnelle",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "4–9 mois" },
    keywords: ["QHSE", "ISO", "audit", "conformité"],
    programs: [
      "Gestion intégrée QHSE (normes ISO)",
      "Audit interne (prépa CIA)",
      "Audit systèmes d’information (prépa CISA)",
      "Smart & Secure : pilotage à l’ère digitale",
      "Plans d’expériences (DOE)",
      "PME : conformité & process",
    ],
  },
  {
    slug: "ingenierie-si",
    title: "Ingénierie & Systèmes d’Information",
    iconName: "cpu",
    accent: "#2D9CDB",
    heroKey: "ingénierie",
    description:
      "Concevoir, moderniser et gouverner les systèmes d’information et l’ingénierie au service du business.",
    outcomes: [
      "Architecture & ERP",
      "Modélisation SIG (QGIS/ArcGIS)",
      "Énergétique & génie électrique",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "6–12 mois" },
    keywords: ["ERP", "SIG", "QGIS", "électrique"],
    programs: [
      "Ingénierie ERP & SI : fondamentaux → agilité",
      "Cartographier les ressources minières (QGIS)",
      "Topographie & géomorphologie (QGIS/ArcGIS)",
      "Dimensionnement électrique & protection",
      "CVC : climatisation & ventilation",
      "Assainissement : conception & maintenance",
    ],
  },
  {
    slug: "sante",
    title: "Santé",
    iconName: "heart-pulse",
    accent: "#EB5757",
    heroKey: "Sant",
    description:
      "Renforcer l’expertise clinique, la gestion hospitalière et la santé publique grâce à des parcours ciblés.",
    outcomes: [
      "Échographie & imagerie",
      "Gestion hospitalière",
      "Épidémiologie & santé publique",
    ],
    meta: { level: "Certifiant", mode: "En ligne", duration: "3–6 mois" },
    keywords: ["santé", "échographie", "gestion hospitalière"],
    programs: [
      "Échographie abdo/pelvienne (certif)",
      "Épidémiologie & urgences sanitaires",
      "Gestion hospitalière",
      "Santé publique & communautaire",
      "Médecine du travail",
      "Échographie d’urgence / Doppler / Gynéco",
    ],
  },
  {
    slug: "genie-civil-btp",
    title: "Génie Civil & BTP",
    iconName: "building-2",
    accent: "#F2994A",
    heroKey: "bàtiment",
    description:
      "Concevoir, dimensionner et piloter les projets BTP avec une maîtrise des outils métiers.",
    outcomes: [
      "Hydraulique & modélisation (EPANET, HEC-RAS)",
      "Géotechnique & structures",
      "Gestion financière & planning chantier",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "6–12 mois" },
    keywords: ["BTP", "EPANET", "HEC-RAS", "Revit", "MS Project"],
    programs: [
      "Modélisation réseaux hydrauliques (EPANET, HEC-RAS, COVADIS)",
      "Géotechnique & dimensionnement chaussées",
      "Gestion de projets BTP (MS Project & Revit)",
      "Gestion financière des projets BTP",
      "Structures (Robot / Tekla) & modélisation 3D",
      "Zéro retard avec Excel : pilotage chantier",
    ],
  },
  {
    slug: "supply",
    title: "Supply Chain & Logistique",
    iconName: "boxes",
    accent: "#56CCF2",
    heroKey: "suply",
    description:
      "Optimiser les flux de bout en bout : achats, stocks, transport et distribution.",
    outcomes: [
      "Cartographie & pilotage des flux",
      "Gestion des stocks & entrepôts",
      "KPI, coûts & audit logistique",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "4–9 mois" },
    keywords: ["supply chain", "achats", "stocks", "transport"],
    programs: [
      "SCM : concepts & cartographie des flux",
      "Achats & évaluation fournisseurs",
      "Stocks & entrepôts (ABC, JIT…)",
      "Transports & réseaux de distribution",
      "Lean & flux internes",
      "KPI, coûts & audit logistique",
    ],
  },
];

/** Dictionnaire d’accès rapide par slug */
export const filieresBySlug = Object.fromEntries(
  filieres.map((f) => [f.slug, f])
);

/** Helper : récupérer une filière par slug (ou null) */
export const getFiliereBySlug = (slug) => filieresBySlug[slug] || null;

/**
 * Helper : découper les filières en colonnes pour méga-menu
 * @param {number} cols nombre de colonnes (par défaut 4)
 * @returns {Filiere[][]}
 */
export function splitForMegaMenu(cols = 4) {
  const out = Array.from({ length: cols }, () => []);
  filieres.forEach((f, i) => out[i % cols].push(f));
  return out;
}




//--------------


/**
 * @typedef {Object} ProgramCard
 * @property {string} id
 * @property {string} title
 * @property {string} [type]
 * @property {string} [summary]
 * @property {string} [duration]
 * @property {string} [schedule]
 * @property {string} [volume]
 * @property {string} [price]
 * @property {string} [certification]
 * @property {string[]} [target]
 * @property {string[]} [modules]
 * @property {string} [docHref]
 */

/**
 * @typedef {Object} Filiere
 * @property {string} slug
 * @property {string} title
 * @property {string[]} programs
 * @property {string} [description]
 * @property {string[]} [outcomes]
 * @property {string} [iconName]
 * @property {string} [accent]
 * @property {string} [heroKey]
 * @property {Object} [meta]
 * @property {string} [meta.level]
 * @property {string} [meta.mode]
 * @property {string} [meta.duration]
 * @property {string[]} [keywords]
 * @property {ProgramCard[]} [programCards]
 */

const publicDoc = (fileName) => encodeURI(`/docs/${fileName}`);

const MEDICAL_SCHEDULE = "2 séances / semaine · 16h00 – 18h00";
const MEDICAL_DURATION = "8 semaines";
const MEDICAL_VOLUME = "32 heures";

/** @type {Filiere[]} */
export const filieres = [
  {
    slug: "management-leadership",
    title: "Management & Leadership",
    iconName: "briefcase",
    accent: "#F2C94C",
    heroKey: "mànegem",
    description:
      "Piloter la stratégie, aligner les équipes et transformer les organisations par la performance et le leadership.",
    outcomes: [
      "Vision & diagnostic stratégiques",
      "Pilotage par KPIs & tableaux de bord",
      "Leadership & conduite du changement",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "6–12 mois" },
    keywords: ["stratégie", "leadership", "management", "transformation"],
    programs: [
      "Management & Stratégie d’Entreprise",
      "Gestion de Projet & Leadership (prépa PMP®)",
      "Responsables PMO : structurer et piloter",
      "Devenir Stratège : vision → impact",
      "Leadership Féminin",
      "Coopératives : gouvernance & impact",
    ],
  },

  {
    slug: "developpement-commercial-marketing",
    title: "Développement Commercial & Marketing",
    iconName: "megaphone",
    accent: "#F2994A",
    heroKey: "Responsablecommercialegroupe5",
    description:
      "Renforcer la stratégie commerciale, l’innovation marketing, la performance des équipes et l’expérience client dans un contexte africain en pleine transformation.",
    outcomes: [
      "Stratégie commerciale & positionnement",
      "Leadership commercial & management d’équipes",
      "Digital, data marketing & fidélisation client",
    ],
    meta: { level: "Pro", mode: "Hybride / Executive", duration: "6 modules" },
    keywords: [
      "marketing",
      "commercial",
      "business development",
      "digital",
      "CRM",
    ],
    programs: [
      "Programme DCM 2026 – Développement Commercial et Marketing",
    ],
    programCards: [
      {
        id: "dcm-2026",
        title: "Développement Commercial et Marketing",
        type: "Programme DCM 2026",
        summary:
          "Programme destiné aux directeurs et cadres dirigeants pour piloter la stratégie commerciale, la marque, la data marketing et la performance des équipes.",
        duration: "6 modules",
        price: "3 950 000 GNF / 395 €",
        certification:
          "Certificat Professionnel Développement Commercial et Marketing (LDCM)",
        target: [
          "Directeurs commerciaux et marketing",
          "Chefs de département ventes et stratégie",
          "Responsables business development et communication",
          "Entrepreneurs et dirigeants d’entreprises",
          "Consultants en développement commercial",
        ],
        modules: [
          "Gouvernance et stratégie commerciale",
          "Intelligence de marché et innovation marketing",
          "Leadership commercial et management des équipes",
          "Stratégie digitale et data marketing",
          "Gestion de la relation client et expérience client",
          "Performance commerciale, reporting et pilotage",
        ],
        docHref: publicDoc(
          "Programme_Developpement_Commercial_et_Marketing_pour_Directeurs_2026 (1).pdf"
        ),
      },
    ],
  },

  {
    slug: "finance-controle",
    title: "Finance & Contrôle de gestion",
    iconName: "banknote",
    accent: "#29B6F6",
    heroKey: "finànce",
    description:
      "Maîtriser les fondamentaux financiers, le contrôle de gestion, le reporting et les mécanismes de gouvernance budgétaire pour une création de valeur durable.",
    outcomes: [
      "Lecture & analyse des états financiers",
      "Budgets, prévisions, trésorerie",
      "Tableaux de bord & performance",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "6–12 mois" },
    keywords: [
      "finance",
      "contrôle de gestion",
      "IFRS",
      "audit",
      "gouvernance financière",
      "budget public",
    ],
    programs: [
      "Exécution budgétaire et gouvernance financière publique",
      "Finance d’Entreprise (lecture états financiers)",
      "Contrôle de Gestion 2.0 (Tableaux de bord)",
      "Audit financier & comptable",
      "IFRS : comptabilité internationale",
      "Finance verte & investissements ESG",
      "Reporting ESG & bailleurs de fonds",
    ],
    programCards: [
      {
        id: "exec-budget-gouv-fin-publique",
        title: "Exécution budgétaire et gouvernance financière publique",
        type: "Formation certifiante",
        summary:
          "Programme conçu pour renforcer les compétences en gestion, exécution, contrôle du budget public, transparence et redevabilité financière.",
        duration: "8 modules",
        volume: "31 heures environ",
        price: "4 850 000 GNF / 485 €",
        certification:
          "Formation certifiante – Institut Cortex / Cortex Holding",
        target: [
          "Gestionnaires financiers",
          "Comptables publics",
          "Agents d’ordonnancement / ordonnateurs",
          "Contrôleurs financiers",
          "Responsables administratifs",
          "Chargés de projets publics",
          "Collectivités territoriales",
          "Organisations publiques ou parapubliques",
        ],
        modules: [
          "Introduction aux finances publiques",
          "Cadre juridique et réglementaire",
          "Cycle budgétaire de l’État",
          "Exécution budgétaire – processus détaillé",
          "Outils et documents de gestion",
          "Contrôle interne & contrôles extérieurs",
          "Gouvernance financière publique",
          "Gestion des risques & irrégularités financières",
        ],
        docHref: publicDoc("EXECUTION BUDGETAIRE ET FINANCE PUBLIQUE.pdf"),
      },
    ],
  },

  {
    slug: "ressources-humaines",
    title: "Ressources Humaines",
    iconName: "users",
    accent: "#9B51E0",
    heroKey: "ressourceshumaines",
    description:
      "Développer les talents, structurer les parcours et renforcer la performance sociale de l’organisation.",
    outcomes: [
      "Recrutement & entretiens structurés",
      "GEPP (ex-GPEC) & cartographie des compétences",
      "Rémunération, formation & QVT",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "4–9 mois" },
    keywords: ["RH", "recrutement", "formation", "QVT"],
    programs: [
      "Positionner la fonction RH",
      "Recrutement & entretiens structurés",
      "GEPP (ex-GPEC) : parcours & compétences",
      "Formation : plan & dispositifs",
      "Rémunération & politique salariale",
      "Climat social & QVT",
    ],
  },

  {
    slug: "qhse",
    title: "QHSE & Conformité",
    iconName: "shield",
    accent: "#27AE60",
    heroKey: "khse",
    description:
      "Mettre en place un système intégré qualité, hygiène, sécurité, environnement et assurer la conformité.",
    outcomes: [
      "Systèmes de management QHSE (ISO)",
      "Audit interne & amélioration continue",
      "Sécurité & résilience opérationnelle",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "4–9 mois" },
    keywords: ["QHSE", "ISO", "audit", "conformité"],
    programs: [
      "Gestion intégrée QHSE (normes ISO)",
      "Audit interne (prépa CIA)",
      "Audit systèmes d’information (prépa CISA)",
      "Smart & Secure : pilotage à l’ère digitale",
      "Plans d’expériences (DOE)",
      "PME : conformité & process",
    ],
  },

  {
    slug: "ingenierie-si",
    title: "Ingénierie & Systèmes d’Information",
    iconName: "cpu",
    accent: "#2D9CDB",
    heroKey: "ingénierie",
    description:
      "Concevoir, moderniser et gouverner les systèmes d’information et l’ingénierie au service du business.",
    outcomes: [
      "Architecture & ERP",
      "Modélisation SIG (QGIS/ArcGIS)",
      "Énergétique & génie électrique",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "6–12 mois" },
    keywords: ["ERP", "SIG", "QGIS", "électrique"],
    programs: [
      "Ingénierie ERP & SI : fondamentaux → agilité",
      "Cartographier les ressources minières (QGIS)",
      "Topographie & géomorphologie (QGIS/ArcGIS)",
      "Dimensionnement électrique & protection",
      "CVC : climatisation & ventilation",
      "Assainissement : conception & maintenance",
    ],
  },

  {
    slug: "sante",
    title: "Santé",
    iconName: "heart-pulse",
    accent: "#EB5757",
    heroKey: "Sant",
    description:
      "Renforcer l’expertise clinique, la gouvernance hospitalière, la qualité des soins et la santé publique grâce à des parcours certifiants ciblés.",
    outcomes: [
      "Gouvernance hospitalière & leadership",
      "Épidémiologie, santé publique & prévention",
      "Qualité des soins, genre & développement",
    ],
    meta: {
      level: "Certifiant",
      mode: "En ligne",
      duration: "8 semaines / programme",
    },
    keywords: [
      "santé",
      "gouvernance hospitalière",
      "épidémiologie",
      "santé publique",
      "qualité des soins",
      "genre",
    ],
    programs: [
      "Certificat en Gouvernance Hospitalière et Leadership Stratégique",
      "Certificat en Genre, Santé et Développement",
      "Certificat en Gestion Épidémiologique et Urgences Sanitaires",
      "Certificat en Management de la Qualité dans le Secteur de la Santé",
      "Certificat en Santé Publique : Prévention, Promotion et Amélioration de la Santé",
      "Échographie abdo/pelvienne (certif)",
      "Gestion hospitalière",
      "Santé publique & communautaire",
      "Médecine du travail",
      "Échographie d’urgence / Doppler / Gynéco",
    ],
    programCards: [
      {
        id: "gouv-hospitaliere-leadership",
        title: "Certificat en Gouvernance Hospitalière et Leadership Stratégique",
        type: "Certificat professionnel",
        summary:
          "Programme orienté gouvernance, leadership, performance hospitalière, RH hospitalières, gestion financière et sécurité des patients.",
        duration: MEDICAL_DURATION,
        schedule: MEDICAL_SCHEDULE,
        volume: MEDICAL_VOLUME,
        certification:
          "Certificat en Gestion Hospitalière et Leadership Stratégique (accrédité)",
        target: [
          "Directeurs et cadres d’hôpitaux",
          "Médecins chefs de service",
          "Infirmiers(ères) chefs et cadres paramédicaux",
          "Responsables administratifs et financiers du secteur santé",
          "Gestionnaires de cliniques et structures privées de santé",
        ],
        modules: [
          "Système de santé et gouvernance hospitalière",
          "Leadership stratégique en milieu hospitalier",
          "Organisation et gestion administrative hospitalière",
          "Gestion des ressources humaines hospitalières",
          "Gestion financière et performance hospitalière",
          "Qualité des soins, sécurité des patients et communication institutionnelle",
        ],
        docHref: publicDoc(
          "01 Fiche programme Certificat en Gouvernance Hospitalière et Leadership Stratégique.docx"
        ),
      },
      {
        id: "genre-sante-developpement",
        title: "Certificat en Genre, Santé et Développement",
        type: "Certificat professionnel",
        summary:
          "Programme pour analyser les inégalités de genre, intégrer l’approche genre dans les projets santé et développement, et concevoir des actions sensibles au genre.",
        duration: MEDICAL_DURATION,
        schedule: MEDICAL_SCHEDULE,
        volume: MEDICAL_VOLUME,
        certification:
          "Certificat en Genre, Santé et Développement – Institut Cortex",
        target: [
          "Professionnels de la santé et du développement",
          "Chargé(e)s de projets et de programmes",
          "Cadres d’ONG, d’institutions publiques et d’organisations internationales",
          "Responsables communautaires",
          "Étudiants et professionnels souhaitant se spécialiser en genre et développement",
        ],
        modules: [
          "Concepts fondamentaux du genre et du développement",
          "Approches théoriques et analytiques du genre",
          "Genre et santé",
          "Genre, éducation, travail et autonomisation économique",
          "Genre et politiques publiques / développement durable",
          "Intégration du genre dans les projets et pratiques professionnelles",
        ],
        docHref: publicDoc(
          "02 Fiche programme Certificat en Genre, Santé et Développement.docx"
        ),
      },
      {
        id: "gestion-epidemiologique-urgences-sanitaires",
        title: "Certificat en Gestion Épidémiologique et Urgences Sanitaires",
        type: "Certificat professionnel",
        summary:
          "Programme axé sur la surveillance sanitaire, l’investigation des épidémies, la coordination de la riposte et la résilience communautaire.",
        duration: MEDICAL_DURATION,
        schedule: MEDICAL_SCHEDULE,
        volume: MEDICAL_VOLUME,
        certification:
          "Certificat en Gestion Épidémiologique et Urgences Sanitaires – Institut Cortex",
        target: [
          "Agents et cadres de santé",
          "Responsables de surveillance épidémiologique",
          "Acteurs d’ONG et organisations humanitaires",
          "Responsables de programmes sanitaires",
          "Agents de protection civile",
          "Décideurs locaux impliqués dans la gestion des crises",
        ],
        modules: [
          "Fondamentaux de l’épidémiologie",
          "Surveillance épidémiologique & systèmes d’alerte",
          "Investigation des épidémies & analyse des données",
          "Prévention, contrôle & riposte sanitaire",
          "Gestion des urgences sanitaires & coordination",
          "Communication de crise, gouvernance & résilience",
        ],
        docHref: publicDoc(
          "03 Fiche programme Certificat en Gestion Épidémiologique et Urgences Sanitaires.docx"
        ),
      },
      {
        id: "management-qualite-sante",
        title:
          "Certificat en Management de la Qualité dans le Secteur de la Santé",
        type: "Certificat professionnel",
        summary:
          "Programme pour structurer un système de management de la qualité, piloter les risques, auditer les pratiques et conduire l’amélioration continue en santé.",
        duration: MEDICAL_DURATION,
        schedule: MEDICAL_SCHEDULE,
        volume: MEDICAL_VOLUME,
        certification:
          "Certificat professionnel en Management de la Qualité dans le Secteur de la Santé – Institut Cortex",
        target: [
          "Cadres et responsables hospitaliers",
          "Responsables qualité et hygiène",
          "Médecins, infirmiers chefs, sages-femmes",
          "Gestionnaires d’établissements de santé",
          "Responsables ONG et projets santé",
        ],
        modules: [
          "Fondements du management de la qualité en santé",
          "Normes, référentiels et cadres réglementaires",
          "Mise en place d’un Système de Management de la Qualité (SMQ)",
          "Gestion des risques et sécurité des patients",
          "Audit qualité et évaluation des performances",
          "Amélioration continue, communication et projet qualité",
        ],
        docHref: publicDoc(
          "04 Fiche programme certificat management de la qualité.docx"
        ),
      },
      {
        id: "sante-publique-prevention-promotion",
        title:
          "Certificat en Santé Publique : Prévention, Promotion et Amélioration de la Santé",
        type: "Certificat professionnel",
        summary:
          "Programme centré sur les déterminants de la santé, la prévention, la promotion, la santé environnementale et la gouvernance sanitaire.",
        duration: MEDICAL_DURATION,
        schedule: MEDICAL_SCHEDULE,
        volume: MEDICAL_VOLUME,
        certification:
          "Certificat en Santé Publique : Prévention, Promotion et Amélioration de la Santé – Institut Cortex",
        target: [
          "Agents et cadres du secteur santé",
          "ONG et acteurs communautaires",
          "Responsables de programmes sanitaires",
          "Étudiants en sciences de la santé et sociales",
          "Collectivités locales et institutions publiques",
        ],
        modules: [
          "Fondements de la santé publique",
          "Déterminants de la santé & inégalités",
          "Prévention en santé publique",
          "Promotion de la santé & communication",
          "Santé environnementale & priorités sanitaires",
          "Planification, gouvernance & résilience sanitaire",
        ],
        docHref: publicDoc(
          "05 Fiche programme Certificat en Santé Publique Prévention Promotion et Amélioration de la Santé.docx"
        ),
      },
    ],
  },

  {
    slug: "genie-civil-btp",
    title: "Génie Civil & BTP",
    iconName: "building-2",
    accent: "#F2994A",
    heroKey: "bàtiment",
    description:
      "Concevoir, dimensionner et piloter les projets BTP avec une maîtrise des outils métiers.",
    outcomes: [
      "Hydraulique & modélisation (EPANET, HEC-RAS)",
      "Géotechnique & structures",
      "Gestion financière & planning chantier",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "6–12 mois" },
    keywords: ["BTP", "EPANET", "HEC-RAS", "Revit", "MS Project"],
    programs: [
      "Modélisation réseaux hydrauliques (EPANET, HEC-RAS, COVADIS)",
      "Géotechnique & dimensionnement chaussées",
      "Gestion de projets BTP (MS Project & Revit)",
      "Gestion financière des projets BTP",
      "Structures (Robot / Tekla) & modélisation 3D",
      "Zéro retard avec Excel : pilotage chantier",
    ],
  },

  {
    slug: "supply",
    title: "Supply Chain & Logistique",
    iconName: "boxes",
    accent: "#56CCF2",
    heroKey: "suply",
    description:
      "Optimiser les flux de bout en bout : achats, stocks, transport, distribution et performance logistique dans des contextes généraux ou sectoriels spécialisés.",
    outcomes: [
      "Cartographie & pilotage des flux",
      "Gestion des stocks & entrepôts",
      "KPI, coûts, risques & digitalisation",
    ],
    meta: { level: "Pro", mode: "En ligne", duration: "2 mois à 5 modules" },
    keywords: [
      "supply chain",
      "achats",
      "stocks",
      "transport",
      "logistique minière",
      "ERP",
    ],
    programs: [
      "Diplôme professionnel en Logistique, Achats et Supply Chain",
      "Logistique & Supply Chain Management dans le secteur minier",
      "SCM : concepts & cartographie des flux",
      "Achats & évaluation fournisseurs",
      "Stocks & entrepôts (ABC, JIT…)",
      "Transports & réseaux de distribution",
      "Lean & flux internes",
      "KPI, coûts & audit logistique",
    ],
    programCards: [
      {
        id: "supply-chain-2026",
        title: "Diplôme professionnel en Logistique, Achats et Supply Chain",
        type: "Programme 2026",
        summary:
          "Programme structuré autour de la logistique moderne, des achats, des entrepôts, du transport international, de la gestion des risques et de la performance.",
        duration: "5 modules",
        price: "3 950 000 GNF / 395 €",
        certification:
          "Certificat Professionnel en Logistique et Supply Chain Management",
        modules: [
          "Introduction à la logistique moderne et au Supply Chain Management",
          "Gestion des approvisionnements et des achats",
          "Gestion des stocks et entrepôts",
          "Transport, distribution et logistique internationale",
          "Planification, prévision et gestion des risques logistiques",
        ],
        docHref: publicDoc(
          "Programme_Logistique_et_Supply_Chain_Management_2026.pdf"
        ),
      },
      {
        id: "logistique-miniere",
        title: "Logistique & Supply Chain Management dans le secteur minier",
        type: "Programme sectoriel",
        summary:
          "Programme spécialisé pour planifier, organiser, piloter et optimiser la chaîne logistique minière dans le respect des coûts, délais, sécurité et normes HSE.",
        duration: "2 mois",
        schedule: "Samedi et dimanche · 12h00 – 14h00",
        certification: "Programme de spécialisation logistique minière",
        target: [
          "Agents et responsables logistiques",
          "Superviseurs de sites miniers",
          "Agents d’approvisionnement et magasins",
          "Cadres des entreprises minières et sous-traitantes",
          "Étudiants en logistique, transport, mines, génie industriel",
        ],
        modules: [
          "Introduction à la logistique minière",
          "Gestion des approvisionnements miniers",
          "Gestion des stocks & magasins miniers",
          "Transport & manutention dans les mines",
          "Logistique de site & opérations minières",
          "HSE & conformité dans la logistique minière",
          "Pilotage & performance de la supply chain minière",
          "Digitalisation & outils logistiques",
        ],
        docHref: publicDoc("PROGRAMME LOGISTIQUE MINIER.pdf"),
      },
    ],
  },
];

/** Dictionnaire d’accès rapide par slug */
export const filieresBySlug = Object.fromEntries(
  filieres.map((f) => [f.slug, f])
);

/** Helper : récupérer une filière par slug (ou null) */
export const getFiliereBySlug = (slug) => filieresBySlug[slug] || null;

/**
 * Helper : découper les filières en colonnes pour méga-menu
 * @param {number} cols
 * @returns {Filiere[][]}
 */
export function splitForMegaMenu(cols = 4) {
  const out = Array.from({ length: cols }, () => []);
  filieres.forEach((f, i) => out[i % cols].push(f));
  return out;
}