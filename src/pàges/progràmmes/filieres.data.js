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
