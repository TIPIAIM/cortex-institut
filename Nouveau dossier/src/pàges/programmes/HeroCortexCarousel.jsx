import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styled from "styled-components";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
  Cpu,
  Factory,
  Landmark,
  School,
  Sprout,
  Truck,
  ClipboardList,
  Send,
} from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";
import { openProgrammeContactModal } from "./programmeContact";

const iconMap = {
  briefcase: BriefcaseBusiness,
  truck: Truck,
  cpu: Cpu,
  factory: Factory,
  sprout: Sprout,
  clipboard: ClipboardList,
  banknote: Landmark,
  landmark: Landmark,
};

const visualMap = {
  "management-business": () => imagess?.mànegem || imagess?.DirecteurInstitutCortex1,
  "logistique-supply-chain": () =>
    imagess?.loreàt || imagess?.Responsablecommercialegroupe2,
  "digital-technologie-ia": () => imagess?.ingénierie || imagess?.àutàbleàu,
  "industrie-mines-operations": () => imagess?.bàtiment || imagess?.DirecteurduGroupe4,
  "agribusiness-economie-verte": () => imagess?.loreàt || imagess?.DirecteurInstitutCortex2,
  "projet-conseil": () => imagess?.àutàbleàu || imagess?.Responsablecommercialegroupe2,
  "finance-comptabilite-banque": () => imagess?.finànce || imagess?.DirecteurduGroupe4,
  "finance-management-public": () => imagess?.finànce || imagess?.DirecteurduGroupe1,
};

function visualFor(school) {
  return (
    visualMap[school?.slug]?.() ||
    imagess?.loreàt ||
    "/img/cortex-logo.png"
  );
}

export default function HeroCortexCarousel({ catalogue }) {
  const reduceMotion = useReducedMotion();
  const railRef = useRef(null);
  const schools = [
    ...(catalogue?.schools || []),
    ...(catalogue?.additionalOffers || []),
  ];

  const scrollRail = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * Math.min(360, rail.clientWidth * 0.82),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <Section aria-label={`Grandes Écoles — ${catalogue?.shortLabel || "Institut Cortex"}`}>
      <Inner>
        <Head>
          <Kicker>
            <motion.span
              animate={reduceMotion ? undefined : { rotate: [0, -5, 0, 5, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <School size={16} />
            </motion.span>
            {catalogue?.shortLabel || "Institut Cortex"}
          </Kicker>

          <Title>
            Parcourez les Grandes Écoles comme une collection de spécialisations.
          </Title>
          <Lead>
            Sélectionnez une Grande École pour découvrir ses blocs, ses parcours et les modules proposés dans le catalogue actif.
          </Lead>
          <RailActions aria-label="Navigation du carrousel">
            <RailButton type="button" onClick={() => scrollRail(-1)} aria-label="Voir les écoles précédentes">
              <ChevronLeft size={18} />
            </RailButton>
            <RailButton type="button" onClick={() => scrollRail(1)} aria-label="Voir les écoles suivantes">
              <ChevronRight size={18} />
            </RailButton>
          </RailActions>
        </Head>

        <Rail ref={railRef}>
          {schools.map((school, index) => {
            const Icon = iconMap[school.iconName] || School;

            return (
              <SchoolPoster
                key={`${catalogue?.id}-${school.slug}-${index}`}
                as={motion.article}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, delay: index * 0.035 }}
              >
                <Media>
                  <img src={visualFor(school)} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                  <MediaShade />
                  <SchoolNumber>{String(index + 1).padStart(2, "0")}</SchoolNumber>
                </Media>

                <CardBody>
                  <IconLine>
                    <IconBubble
                      as={motion.span}
                      whileHover={reduceMotion ? undefined : { rotate: -8, scale: 1.08 }}
                    >
                      <Icon size={19} />
                    </IconBubble>
                    <SmallLabel>Grande École</SmallLabel>
                  </IconLine>

                  <SchoolTitle>{school.title}</SchoolTitle>

                  {school.duration && <SchoolMeta>{school.duration}</SchoolMeta>}

                  <CardActions>
                    <Discover href={`#school-${school.slug}`}>
                      Voir cette école
                      <ArrowRight size={16} />
                    </Discover>
                    <ApplyLink
                      type="button"
                      onClick={() =>
                        openProgrammeContactModal({
                          catalogueId: catalogue?.id,
                          schoolSlug: school.slug,
                          intent: "inscription",
                          source: "hero-school-poster",
                        })
                      }
                      aria-label={`Postuler à ${school.title}`}
                    >
                      <Send size={15} />
                      Postuler
                    </ApplyLink>
                  </CardActions>
                </CardBody>
              </SchoolPoster>
            );
          })}
        </Rail>
      </Inner>
    </Section>
  );
}

const Section = styled.section`
  border-bottom: 1px solid rgba(255,255,255,.08);
  background:
    radial-gradient(650px 300px at 90% 0%, rgba(243,111,33,.06), transparent 65%),
    linear-gradient(180deg, ${colors.bg1}, ${colors.bg});
`;

const Inner = styled.div`
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto;
  padding: clamp(42px, 6vw, 72px) 0;
`;

const Head = styled.div`
  display: grid;
  gap: 10px;
  margin-bottom: 24px;
`;

const Kicker = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${colors.accentGold};
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .12em;
  text-transform: uppercase;

  > span {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(243,111,33,.22);
    border-radius: 12px 0 12px 0;
    background: rgba(243,111,33,.08);
  }
`;

const Title = styled.h2`
  max-width: 900px;
  margin: 0;
  color: ${colors.text};
  font-size: clamp(27px, 4.4vw, 50px);
  line-height: 1.03;
  letter-spacing: -.04em;
`;

const Lead = styled.p`
  max-width: 760px;
  margin: 0;
  color: ${colors.muted};
  font-size: 14px;
  line-height: 1.7;
`;

const RailActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
`;

const RailButton = styled.button`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 14px 0 14px 0;
  border: 1px solid rgba(243,111,33,.24);
  color: ${colors.accentGold};
  background: rgba(243,111,33,.07);
  cursor: pointer;
  transition: transform .16s ease, border-color .16s ease, background .16s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: rgba(243,111,33,.5);
    background: rgba(243,111,33,.12);
    outline: none;
  }
`;

const Rail = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(275px, 330px);
  gap: 14px;
  overflow-x: auto;
  padding: 6px 2px 16px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: rgba(243,111,33,.42) transparent;
`;

const SchoolPoster = styled.article`
  scroll-snap-align: start;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 26px 0 26px 0;
  background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.018));
  box-shadow: 0 22px 56px rgba(0,0,0,.18);
  transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(243,111,33,.38);
    box-shadow: 0 28px 66px rgba(0,0,0,.27);
  }
`;

const Media = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;
  background: ${colors.bg1};

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform .45s cubic-bezier(.22,1,.36,1);
  }

  ${SchoolPoster}:hover & img {
    transform: scale(1.045);
  }
`;

const MediaShade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 45%, rgba(4,9,18,.76));
`;

const SchoolNumber = styled.span`
  position: absolute;
  left: 14px;
  bottom: 12px;
  padding: 7px 9px;
  border-radius: 12px 0 12px 0;
  color: ${colors.bg};
  background: ${colors.accentGold};
  font-size: 12px;
  font-weight: 950;
  letter-spacing: .08em;
`;

const CardBody = styled.div`
  display: grid;
  align-content: start;
  min-height: 230px;
  padding: 17px;
`;

const IconLine = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const IconBubble = styled.span`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 12px 0 12px 0;
  color: ${colors.accentGold};
  background: rgba(243,111,33,.08);
  border: 1px solid rgba(243,111,33,.2);
`;

const SmallLabel = styled.span`
  color: ${colors.accentGold3};
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .12em;
  text-transform: uppercase;
`;

const SchoolTitle = styled.h3`
  margin: 13px 0 0;
  color: ${colors.text};
  font-size: 18px;
  line-height: 1.3;
`;

const SchoolMeta = styled.p`
  margin: 9px 0 0;
  color: ${colors.muted};
  font-size: 12px;
`;

const CardActions = styled.div`
  align-self: end;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
`;

const Discover = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 10px;
  border-radius: 12px 0 12px 0;
  border: 1px solid rgba(255,255,255,.09);
  color: ${colors.text};
  background: rgba(255,255,255,.035);
  font-size: 12px;
  font-weight: 850;

  &:hover,
  &:focus-visible {
    border-color: rgba(243,111,33,.38);
    color: ${colors.accentGold};
    outline: none;
  }
`;

const ApplyLink = styled.button`
  appearance: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 11px;
  border-radius: 12px 0 12px 0;
  border: 1px solid rgba(243,111,33,.72);
  color: ${colors.bg};
  background: ${colors.accentGold};
  font-size: 12px;
  font-weight: 950;
  box-shadow: 0 10px 24px rgba(243,111,33,.16);
  transition: transform .18s ease, box-shadow .18s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(243,111,33,.22);
    outline: none;
  }
`;
