import { useMemo, useState } from "react";
import styled from "styled-components";
import { ArrowRight, GraduationCap, MessageCircle } from "lucide-react";
import colors from "../../Styles/colors";
import SEO from "../../SEO";
import HeroCortexCarouselhome from "./HeroCortexCarouselhome1";
import HeroCortexCarousel from "./HeroCortexCarousel";
import Catalogue from "./Catalogue";
import { catalogues } from "./filieres.data";
import { openProgrammeContactModal } from "./programmeContact";

const CANONICAL_URL = "https://www.institut-cortex.com/programmes";

export default function Programmes() {
  const [activeCatalogueId, setActiveCatalogueId] = useState(
    catalogues[0]?.id || "etudiant"
  );

  const activeCatalogue = useMemo(
    () =>
      catalogues.find((catalogue) => catalogue.id === activeCatalogueId) ||
      catalogues[0],
    [activeCatalogueId]
  );

  const seo = useMemo(() => {
    const schoolNames = [
      ...new Set(
        catalogues.flatMap((catalogue) =>
          (catalogue.schools || []).map((school) => school.title)
        )
      ),
    ];

    const catalogueNames = catalogues.map((catalogue) => catalogue.title);

    return {
      title:
        "Programmes Institut Cortex | Grandes Écoles, Junior & Executive Academy",
      description:
        "Découvrez les catalogues de formation de l’Institut Cortex : Grandes Écoles pour étudiants, Cortex Junior Academy et Cortex Executive Academy, organisés par écoles, blocs, parcours et modules.",
      keywords: [
        "Institut Cortex",
        "formation professionnelle Guinée",
        "Grandes Écoles Institut Cortex",
        "Cortex Junior Academy",
        "Cortex Executive Academy",
        ...catalogueNames,
        ...schoolNames,
      ],
    };
  }, []);

  const structuredData = useMemo(() => {
    const itemList = catalogues.map((catalogue, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "EducationalOccupationalProgram",
        name: `${catalogue.shortLabel} — ${catalogue.title}`,
        description: catalogue.audience,
        provider: {
          "@type": "EducationalOrganization",
          name: "Institut Cortex",
          url: "https://www.institut-cortex.com",
        },
      },
    }));

    return [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Programmes et catalogues de formation — Institut Cortex",
        description: seo.description,
        url: CANONICAL_URL,
        inLanguage: "fr",
        isPartOf: {
          "@type": "WebSite",
          name: "Institut Cortex",
          url: "https://www.institut-cortex.com",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Catalogues de formation Institut Cortex",
        itemListElement: itemList,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://www.institut-cortex.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Programmes",
            item: CANONICAL_URL,
          },
        ],
      },
    ];
  }, [seo.description]);

  const selectCatalogue = (id, shouldScroll = false) => {
    setActiveCatalogueId(id);

    if (shouldScroll && typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        document.getElementById("catalogue-programmes")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  return (
    <Page>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={CANONICAL_URL}
        siteName="Institut Cortex"
        schemas={structuredData}
      />

      <HeroCortexCarouselhome
        activeCatalogueId={activeCatalogueId}
        onSelectCatalogue={(id) => selectCatalogue(id, false)}
        onExplore={(id) => selectCatalogue(id, true)}
      />

      <HeroCortexCarousel catalogue={activeCatalogue} />

      <Catalogue
        activeId={activeCatalogueId}
        onActiveIdChange={(id) => selectCatalogue(id, false)}
      />

      <DecisionBand>
        <DecisionInner>
          <DecisionIcon>
            <GraduationCap size={24} />
          </DecisionIcon>
          <DecisionCopy>
            <DecisionKicker>
              PRÊT(E) À PASSER À L'ÉTAPE SUIVANTE ?
            </DecisionKicker>
            <DecisionTitle>
              Démarrez le premier échange avec l'équipe Cortex.
            </DecisionTitle>
            <DecisionText>
              Votre profil <b>{activeCatalogue?.shortLabel}</b> sera déjà
              transmis au formulaire, sans quitter cette page.
            </DecisionText>
          </DecisionCopy>
          <DecisionActions>
            <DecisionPrimary
              type="button"
              onClick={() =>
                openProgrammeContactModal({
                  catalogueId: activeCatalogueId,
                  intent: "inscription",
                  source: "programmes-decision-band",
                })
              }
            >
              <MessageCircle size={17} />
              Démarrer mon inscription
              <ArrowRight size={16} />
            </DecisionPrimary>
            <DecisionSecondary
              type="button"
              onClick={() =>
                openProgrammeContactModal({
                  catalogueId: activeCatalogueId,
                  intent: "information",
                  source: "programmes-decision-band",
                })
              }
            >
              Être conseillé(e)
            </DecisionSecondary>
          </DecisionActions>
        </DecisionInner>
      </DecisionBand>
    </Page>
  );
}

const Page = styled.main`
  min-height: 100vh;
  overflow-x: clip;
  background: radial-gradient(
      900px 520px at 12% 0%,
      rgba(243, 111, 33, 0.08),
      transparent 62%
    ),
    radial-gradient(
      760px 520px at 92% 18%,
      rgba(42, 75, 124, 0.18),
      transparent 60%
    ),
    linear-gradient(180deg, ${colors.bg}, ${colors.bgSoft} 46%, ${colors.bg1});
`;

const DecisionBand = styled.section`
  padding: 0 16px 84px;
  background: linear-gradient(180deg, ${colors.bgSoft}, ${colors.bg1});
`;

const DecisionInner = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  padding: clamp(20px, 3.5vw, 30px);
  border: 1px solid rgba(243, 111, 33, 0.2);
  border-radius: 28px 0 28px 0;
  background: radial-gradient(
      440px 220px at 8% 0%,
      rgba(243, 111, 33, 0.08),
      transparent 68%
    ),
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.02)
    );
  box-shadow: 0 26px 70px rgba(0, 0, 0, 0.18);

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const DecisionIcon = styled.span`
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  border-radius: 19px 0 19px 0;
  color: ${colors.bg};
  background: ${colors.accentGold};
  box-shadow: 0 14px 32px rgba(243, 111, 33, 0.18);
`;

const DecisionCopy = styled.div`
  min-width: 0;
`;

const DecisionKicker = styled.div`
  color: ${colors.accentGold3};
  font-size: 10px;
  font-weight: 950;
  letter-spacing: 0.12em;
`;

const DecisionTitle = styled.h2`
  margin: 5px 0 0;
  color: ${colors.text};
  font-size: clamp(22px, 3.3vw, 34px);
  line-height: 1.08;
  letter-spacing: -0.03em;
`;

const DecisionText = styled.p`
  margin: 8px 0 0;
  color: ${colors.muted};
  font-size: 12px;
  line-height: 1.55;
  b {
    color: ${colors.accentGoldLight};
  }
`;

const DecisionActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 850px) {
    justify-content: flex-start;
  }
`;

const DecisionPrimary = styled.button`
  appearance: none;
  cursor: pointer;
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 15px;
  border-radius: 16px 0 16px 0;
  border: 1px solid rgba(243, 111, 33, 0.82);
  color: ${colors.bg};
  background: ${colors.accentGold};
  font-size: 12px;
  font-weight: 950;
  box-shadow: 0 14px 32px rgba(243, 111, 33, 0.18);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 18px 38px rgba(243, 111, 33, 0.24);
    outline: none;
  }
`;

const DecisionSecondary = styled.button`
  appearance: none;
  cursor: pointer;
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  border-radius: 16px 0 16px 0;
  border: 1px solid rgba(255, 255, 255, 0.11);
  color: ${colors.text};
  background: rgba(255, 255, 255, 0.035);
  font-size: 12px;
  font-weight: 850;
  transition: transform 0.18s ease, border-color 0.18s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: rgba(243, 111, 33, 0.38);
    outline: none;
  }
`;
