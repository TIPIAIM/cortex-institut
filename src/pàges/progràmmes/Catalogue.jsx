// src/components/catalogue/CatalogueBac3.jsx
import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Filter, Search as SearchIcon, Tag } from "lucide-react";
import colors from "../../Styles/colors";

/* ================== Données par défaut ================== */
/* 5 catalogues (haut de page) — remplace les href */
const defaultTopCatalogs = [
  {
    label: "Catalogue Institut Cortex 2024–2025",
    href: "/docs/Catalogue-Institut-2024–2025.pdf",
  },
  {
    label: "Masters ESCA – CCL & CORTEX",
    href: "/docs/catalogue-masters-esca-ccl-cortex.pdf",
  },

  {
    label: "Formations par Filière",
    href: "/docs/Catalogue-des-Formations-par-Filiere-CCL CORTEX.pdf",
  },
];

/* 3 documents utiles (bas de page) — remplace les href */
const defaultBottomFiles = [
  { label: "Fiche d’inscription (PDF)", href: "/docs/fiche-inscription.pdf" },
  { label: "Fiche tarifs / financement (PDF)", href: "/docs/fiche-tarifs.pdf" },
  { label: "Guide d’informations (PDF)", href: "/docs/fiche-infos.pdf" },
];

/* 10 Programmes Bac+3 — titres + débouchés + catégorie + fiche (PDF) */
const defaultBac3 = [
  {
    id: "mgmt-b3",
    title: "Management & Stratégie d’Entreprise  ",
    category: "Management",
    debouches: [
      "Assistant manager",
      "Chef de projet junior",
      "Consultant junior",
      "... Lire la fiche",
    ],
    fiche: "/docs/Catalogue-Institut-2024–2025.pdf",
  },
  {
    id: "fin-b3",
    title: "Finance & Contrôle de Gestion",
    category: "Finance",
    debouches: [
      "Contrôleur de gestion junior",
      "Assistant financier",
      "Analyste junior",
      "... Lire la fiche",
    ],
    fiche: "/docs/Catalogue-Institut-2024–2025.pdf",
  },
  {
    id: "rh-b3",
    title: "Ressources Humaines ",
    category: "Ressources Humaines",
    debouches: [
      "Assistant RH",
      "Chargé RH junior",
      "Talent acquisition junior",
      "... Lire la fiche",
    ],
    fiche: "/docs/Catalogue-Institut-2024–2025.pdf",
  },
  {
    id: "qhse-b3",
    title: "Qualité, Hygiène, Sécurité & Environnement ",
    category: "QHSE",
    debouches: [
      "Assistant QHSE",
      "Animateur HSE",
      "Auditeur interne junior",
      "... Lire la fiche",
    ],
    fiche: "/docs/Catalogue-Institut-2024–2025.pdf",
  },
  {
    id: "isi-b3",
    title: "Ingénierie des Systèmes d’Information (Bac+3)",
    category: "Ingénierie & SI",
    debouches: [
      "Technicien SI",
      "Assistant chef de projet SI",
      "Intégrateur junior",
      "... Lire la fiche",
    ],
    fiche: "/docs/Catalogue-Institut-2024–2025.pdf",
  },
  {
    id: "sante-b3",
    title: "Gestion Hospitalière & Santé (Bac+3)",
    category: "Santé",
    debouches: [
      "Assistant gestion hospitalière",
      "Coordonnateur santé",
      "Gestionnaire junior",
      "... Lire la fiche",
    ],
    fiche: "/docs/Catalogue-Institut-2024–2025.pdf",
  },
  {
    id: "btp-b3",
    title: "Génie Civil & BTP (Bac+3)",
    category: "Génie Civil & BTP",
    debouches: [
      "Conducteur de travaux junior",
      "Projeteur",
      "Technicien méthodes",
    ],
    fiche: "/docs/Catalogue-Institut-2024–2025.pdf",
  },
  {
    id: "supply-b3",
    title: "Logistique & Supply Chain (Bac+3)",
    category: "Supply Chain",
    debouches: [
      "Assistant supply chain",
      "Gestionnaire stock",
      "Coordinateur logistique",
      "... Lire la fiche",
    ],
    fiche: "/docs/Catalogue-Institut-2024–2025.pdf",
  },
  {
    id: "mkt-b3",
    title: "Marketing & Communication Digitale (Bac+3)",
    category: "Marketing",
    debouches: [
      "Community manager",
      "Assistant marketing",
      "Chargé de contenu",
      "... Lire la fiche",
    ],
    fiche: "/docs/Catalogue-Institut-2024–2025.pdf",
  },
  {
    id: "ent-b3",
    title: "Entrepreneuriat & Innovation (Bac+3)",
    category: "Entrepreneuriat",
    debouches: [
      "Fondateur de start-up",
      "Intrapreneur",
      "Assistant incubateur",
      "... Lire la fiche",
    ],
    fiche: "/docs/Catalogue-Institut-2024–2025.pdf",
  },
];

/* ================== Composant principal ================== */
export default function CatalogueBac3({
  topCatalogs = defaultTopCatalogs,
  programs = defaultBac3,
  title = "Catalogue 2025–2026 Bac+3",
  subtitle = "Découvrez nos programmes Bac+3 et leurs débouchés. Téléchargez chaque fiche détaillée.",
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Tous");
  const filtersRef = useRef(null);

  const categories = useMemo(() => {
    const uniques = Array.from(new Set(programs.map((p) => p.category)));
    return ["Tous", ...uniques];
  }, [programs]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return programs.filter((p) => {
      const matchCat = cat === "Tous" || p.category === cat;
      const hay = `${p.title} ${p.category} ${p.debouches.join(
        " "
      )}`.toLowerCase();
      const matchTxt = !s || hay.includes(s);
      return matchCat && matchTxt;
    });
  }, [programs, q, cat]);

  return (
    <Page>
      {/* En-tête + 5 boutons catalogue */}
      <Head
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <TopDownloads>
          {topCatalogs.map((c, i) => (
            <a key={i} href={c.href} download>
              <Download size={16} /> {c.label}
            </a>
          ))}
        </TopDownloads>
      </Head>

      {/* Filtres + recherche */}
      <Filters
        ref={filtersRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.35 }}
      >
        <Chips role="tablist" aria-label="Filtrer par catégorie">
          {categories.map((c) => (
            <Chip
              key={c}
              role="tab"
              aria-selected={cat === c}
              $active={cat === c}
              onClick={() => setCat(c)}
            >
              {c === "Tous" ? <Filter size={14} /> : <Tag size={14} />} {c}
            </Chip>
          ))}
        </Chips>
      </Filters>

      {/* Liste des 10 programmes — cartes “débouchés uniquement” */}
      <SectionTitle>
        <span>Bac+3</span> Programmes
      </SectionTitle>

      <Grid
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.04 } },
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.map((p) => (
            <Card
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              exit={{ opacity: 0, y: 6 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.35 }}
            >
              <Badge title={`Catégorie : ${p.category}`}>{p.category}</Badge>
              <h3>{p.title}</h3>

              <Small>Débouchés</Small>
              <Ul>
                {p.debouches.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </Ul>

              <Actions>
                <a className="primary" href={p.fiche} download>
                  <Download size={16} /> Télécharger la fiche
                </a>
              </Actions>
            </Card>
          ))}
        </AnimatePresence>
      </Grid>

      {/* Bas de page : 3 documents utiles */}
      <BottomBox
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <h4>Documents utiles</h4>
        <BottomActions>
          {defaultBottomFiles.map((f, i) => (
            <a key={i} href={f.href} download>
              <Download size={16} /> {f.label}
            </a>
          ))}
        </BottomActions>
      </BottomBox>
    </Page>
  );
}

/* ================== Styles ================== */

const Page = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 18px 20px 64px;
   background: linear-gradient(
    120deg,
    ${colors.bg} 70%,
    ${colors.bg1} 60%
  );,
  display: grid;
  gap: 22px;
`;

const Head = styled(motion.header)`
  display: grid;
  gap: 14px;
  h1 {
    margin: 0;
    font-size: clamp(32px, 3.6vw, 50px);
    color: ${colors.accentGold};
    letter-spacing: 0.6px;
    text-align: center;
    margin-top: 6rem;
  }
  p {
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    font-size: clamp(20px, 2.4vw, 26px);
    color: ${colors.accentGoldLight};
  }
`;

const TopDownloads = styled.div`
  display: grid;
  gap: 10px;

  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    text-align: center;
    gap: 10px;
    margin-bottom: 2rem;
    padding: 12px 14px;
    border-radius: 25px 0 25px 0;
    font-weight: 900;

    color: ${colors.bg};
    background: ${colors.accentGold};
    transition: border-color 0.15s ease, transform 0.15s ease,
      box-shadow 0.15s ease;
  }
  a:hover {
    background: ${colors.semygjouneclàire};
    transform: translateY(-1px);
  }
`;

const Filters = styled(motion.div)`
  display: grid;
  gap: 12px;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 360px;
    align-items: center;
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.button`
  padding: 8px 12px;
  border-radius: 25px 0 25px 0;
  cursor: pointer;
  font-weight: 700;

  //  border: 1px solid ${(p) =>
    p.$active ? colors.semygsecondar : "#264066"};
  color: ${colors.text};
  background: ${(p) => (p.$active ? colors.bgSoft : colors.bg)};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.15s ease, border-color 0.15s ease,
    background 0.15s ease;
  &:hover {
    transform: translateY(-1px);
    border-color: ${colors.accentGold};
  }
`;

const SectionTitle = styled.h2`
  magin-bottom: 3rem;

  font-size: clamp(28px, 2.8vw, 24px);
  span {
    color: ${colors.accentGold};
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  gap: 16px;
  magin-bottom: 20rem;

  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const Card = styled(motion.article)`
  border: 1px solid #1f2c44;
  border-radius: 44px 0 44px 0;

  background: linear-gradient(120deg, ${colors.bgSoft} 55%, ${colors.bg} 50%);
  padding: 14px;
  display: grid;
  gap: 10px;
  h3 {
    margin: 0;
    font-size: 17px;
    color: ${colors.text};
  }
`;

const Badge = styled.span`
  align-self: start;

  color: ${colors.accentGold};
  background: linear-gradient(120deg, ${colors.bg} 64%, ${colors.bg1} 50%);
  padding: 6px 10px;
  font-size: 17px;
  font-weight: 700;
  display: inline-block;
`;

const Small = styled.span`
  font-size: 12px;
  color: ${colors.muted};
`;

const Ul = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: ${colors.text};
  li {
    margin: 4px 0;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 4px;
  flex-wrap: wrap;

  .primary {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 800;
    padding: 10px 12px;
    border-radius: 32px 0 32px 0;

    background: linear-gradient(
      120deg,
      ${colors.accentGold} 54%,
      ${colors.accentGold}90 20%
    );
    color: #0e1a2b;
    text-decoration: none;
    box-shadow: 0 8px 22px rgba(242, 201, 76, 0.22);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .primary:hover {
    background: linear-gradient(
      120deg,
      ${colors.accentGold}90 54%,
      ${colors.bg2} 20%
    );
    transform: translateY(-1px);
    box-shadow: 0 10px 26px rgba(242, 201, 76, 0.3);
  }

  .ghost {
    padding: 10px 12px;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    color: ${colors.text};
    background: ${colors.bg};
    border: 1px solid #264066;
  }
  .ghost:hover {
    border-color: ${colors.semygsecondar};
  }
`;

const BottomBox = styled(motion.section)`
  // border: 1px solid #1f2c44;
  border-radius: 24px 0 24px 0;
  padding: 16px;
  //  background: linear-gradient(180deg, #0f223a, #102844);
  h4 {
    margin: 0 0 10px;
    font-size: 25px;
    margin-top: 2rem;

    color: ${colors.accentGold};
  }
`;

const BottomActions = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    padding: 12px 14px;
    border-radius: 12px;
    font-weight: 700;
    border-radius: 24px 0 24px 0;

    //border: 1px solid #27436a;
    color: ${colors.text};
    background: rgb(16, 53, 104);
    transition: transform 0.15s ease, border-color 0.15s ease,
      box-shadow 0.15s ease;
  }
  a:hover {
    transform: translateY(-1px);
    border-color: ${colors.semygsecondar};
    box-shadow: 0 8px 22px rgba(10, 16, 28, 0.35);
  }
`;
