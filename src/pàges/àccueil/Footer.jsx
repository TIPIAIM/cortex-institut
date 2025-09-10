// src/components/layout/Footer.jsx
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  ArrowUp,
  HelpCircle,
  FileText,
  Lock,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import colors from "../../Styles/colors";

/* ===================== Animations ===================== */
const fadeGrid = keyframes`
  0%   { background-position: 0 0, 0 0; }
  50%  { background-position: 240px 150px, -240px -150px; }
  100% { background-position: 0 0, 0 0; }
`;
const footerVariants = {
  hidden: { opacity: 0 },
  visible: (slow = false) => ({
    opacity: 1,
    transition: {
      staggerChildren: slow ? 0.22 : 0.15,
      delayChildren: 0.15,
      duration: 0.35,
    },
  }),
};
const itemVariants = {
  hidden: { y: 22, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

/* ===================== UI ===================== */
const FooterContainer = styled.footer`
  position: relative;
  background: radial-gradient(
      900px 300px at 85% -10%,
      ${colors.bg1}55,
      transparent 60%
    ),
    linear-gradient(180deg, ${colors.bgSoft}, ${colors.bg1});
  border-top: 1px solid #1f2c44;
  overflow: hidden;
  isolation: isolate;

  &:before {
    /* grille douce premium */
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
        90deg,
        #ffffff0a 0 1px,
        transparent 1px 42px
      ),
      repeating-linear-gradient(0deg, #ffffff08 0 1px, transparent 1px 42px);
    mix-blend-mode: soft-light;
    animation: ${fadeGrid} 22s linear infinite;
  }
`;

const InnerContainer = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 1200px;

  margin: 0 auto;
  padding: clamp(24px, 5vw, 56px) 20px clamp(24px, 6vw, 64px);
`;

const HeaderRow = styled(motion.div)`
  display: grid;
  gap: 12px;
  margin-bottom: clamp(14px, 2vw, 22px);

  h3 {
    margin-top: 5rem;

    font-size: clamp(18px, 3.2vw, 24px);
    color: ${colors.accentGold};
    letter-spacing: 0.2px;
  }
  p {
    margin: 0;
    color: ${colors.accentGoldLight};
    max-width: 860px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  gap: clamp(18px, 3vw, 28px);
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 900px) {
    grid-template-columns: 1.2fr 1fr 1fr 1.1fr;
  }
`;

const SectionTitle = styled(motion.h4)`
  margin: 0 0 12px;
  color: ${colors.accentGold};
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.2px;
  position: relative;
  padding-bottom: 8px;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 44px;
    height: 3px;
    background: ${colors.accentGold};
    border-radius: 2px;
  }
`;

const Column = styled(motion.div)`
  display: grid;
  gap: 10px;
`;

const Line = styled(motion.div)`
  display: flex;
  align-items: start;
  gap: 10px;
  color: ${colors.text};
  font-size: 0.98rem;

  svg {
    color: ${colors.accentGold};
    flex-shrink: 0;
  }
  a {
    color: ${colors.text};
    text-decoration: none;
    border-bottom: 1px dashed #27406666;
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  a:hover {
    color: ${colors.accentGold};
    border-bottom-color: ${colors.accentGold};
  }
`;

const LinkList = styled.div`
  display: grid;
  gap: 8px;
  a {
    color: ${colors.text};
    text-decoration: none;
    font-size: 0.95rem;
    border-bottom: 1px dashed transparent;
    width: fit-content;
  }
  a:hover {
    border-bottom-color: #27406688;
    color: ${colors.accentGold};
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${colors.accentGold};
  color: ${colors.text};
  background: transparent;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    background: ${colors.accentGold};
    color: #0e1a2b;
    border-color: ${colors.accentGold};
  }
`;

const Newsletter = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;
const Input = styled.input`
  appearance: none;
  border-radius: 12px;
  padding: 12px 14px;
  background: #0e1a2b;
  color: ${colors.text};
  border: 1px solid #22395d;
  outline: none;
  &::placeholder {
    color: #93a4bb;
  }
  &:focus {
    border-color: ${colors.semygsecondar};
    box-shadow: 0 0 0 3px rgba(42, 75, 124, 0.25);
  }
`;
const Button = styled(motion.button)`
  appearance: none;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid #d9b642;
  background: ${colors.accentGold};
  color: #0e1a2b;
  padding: 12px 16px;
  font-weight: 800;
  box-shadow: 0 8px 22px rgba(242, 201, 76, 0.24);
  transition: box-shadow 0.15s ease;
  &:hover {
    box-shadow: 0 10px 26px rgba(242, 201, 76, 0.3);
  }
`;

const LegalBar = styled(motion.div)`
  margin-top: clamp(16px, 3vw, 28px);
  padding-top: clamp(14px, 2vw, 18px);
  border-top: 1px solid #1f2c44;
  display: grid;
  gap: 10px;
`;
const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;
const LegalLink = styled(motion.button)`
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.accentGold};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
  &:hover {
    color: ${colors.text};
  }
`;

const Copy = styled(motion.div)`
  text-align: center;
  color: ${colors.muted};
  font-size: 0.9rem;
`;

const BackToTop = styled(motion.button)`
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.accentGold};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-weight: 700;
  &:hover {
    color: ${colors.text};
  }
`;

/* ============ Modal ============ */
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;
const ModalContent = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 560px;
  background: #0b1729;
  color: ${colors.text};
  border: 1px solid #274066;
  border-radius: 16px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.35);
  padding: clamp(16px, 2.4vw, 22px);
`;
const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  appearance: none;
  background: transparent;
  border: 1px solid #274066;
  color: ${colors.text};
  border-radius: 10px;
  padding: 6px;
  cursor: pointer;
  &:hover {
    border-color: ${colors.accentGold};
    color: ${colors.accentGold};
  }
`;
const ModalTitle = styled.h5`
  margin: 0 0 8px;
  font-size: 1.05rem;
  color: ${colors.accentGold};
`;
const ModalBody = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${colors.accentGoldLight};
  h6 {
    margin: 10px 0 6px;
    color: ${colors.text};
    font-size: 0.95rem;
  }
  ul {
    margin: 6px 0 10px 18px;
  }
`;

/* ===================== Footer ===================== */
export default function Footer() {
  const [modal, setModal] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const variants = useMemo(
    () =>
      prefersReducedMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : itemVariants,
    [prefersReducedMotion]
  );

  const open = (key) => setModal(key);
  const close = () => setModal(null);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* ====== Contenus légaux adaptés à Institut CORTEX ====== */
  const legal = {
    mentions: {
      title: "Mentions légales — Institut CORTEX",
      body: (
        <>
          <h6>Éditeur</h6>
          <p>
            Institut CORTEX (Groupe NONI)
            <br />
            Adresse : Kobaya, Conakry (GN)
            <br />
            Contact : direction@institut-cortex.com
          </p>
          <h6>Hébergement</h6>
          <p>
            Infrastructure cloud sécurisée (UE). Disponibilité & sauvegardes
            gérées.
          </p>
          <h6>Propriété intellectuelle</h6>
          <p>
            Tous contenus (textes, logos, images) restent la propriété
            d’Institut CORTEX.
          </p>
        </>
      ),
    },
    privacy: {
      title: "Confidentialité & données (RGPD)",
      body: (
        <>
          <h6>Données collectées</h6>
          <ul>
            <li>Identité & coordonnées (nom, email, téléphone)</li>
            <li>Messages & préférences de contact</li>
            <li>Données techniques (journal de navigation anonymisé)</li>
          </ul>
          <h6>Finalités</h6>
          <ul>
            <li>Répondre à vos demandes et assurer le suivi</li>
            <li>Information sur programmes/certifications</li>
            <li>Amélioration continue & sécurité</li>
          </ul>
          <h6>Vos droits</h6>
          <p>
            Accès, rectification, suppression : direction@institut-cortex.com
          </p>
        </>
      ),
    },
    faq: {
      title: "FAQ — Admissions & Programmes",
      body: (
        <>
          <h6>Formats & rythmes</h6>
          <p>Présentiel, hybride et 100% en ligne selon les parcours.</p>
          <h6>Admissions</h6>
          <p>
            Dossier, entretien éventuel et prérequis propres à chaque programme.
          </p>
          <h6>Certifications</h6>
          <p>
            Préparation à des référentiels reconnus et délivrance
            d’attestations.
          </p>
        </>
      ),
    },
    cgu: {
      title: "Conditions d’utilisation",
      body: (
        <>
          <h6>Objet</h6>
          <p>
            Définir l’usage du site et la qualité de service visée par CORTEX.
          </p>
          <h6>Responsabilités</h6>
          <p>
            Utilisation loyale et conforme ; CORTEX s’efforce d’assurer
            l’exactitude des informations.
          </p>
        </>
      ),
    },
  };

  /* ====== Données de contact CORTEX ====== */
  const CONTACT = {
    address: "Kobaya, Conakry — Guinée",
    phone: "+224 623 21 19 74",
    mailCommercial: "commerciale@institut-cortex.com",
    mailDirection: "direction@institut-cortex.com",
    whatsapp: "+224 623 21 19 74",
  };

  return (
    <FooterContainer>
      <InnerContainer
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        custom={prefersReducedMotion}
      >
        {/* Intro / Accroche */}
        <HeaderRow variants={variants}>
          <h3>Institut CORTEX — Formations, Certifications, R&D & Conseil</h3>
          <p>
            Des programmes orientés impact, une pédagogie active, et des
            partenariats académiques pour transformer durablement vos
            compétences et vos organisations.
          </p>
        </HeaderRow>

        <GridContainer>
          {/* Contact */}
          <Column variants={variants}>
            <SectionTitle>Contact direct</SectionTitle>
            <Line>
              <MapPin size={18} />
              <span>{CONTACT.address}</span>
            </Line>
            <Line>
              <Phone size={18} />
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                {CONTACT.phone}
              </a>
            </Line>
            <Line>
              <Mail size={18} />
              <a href={`mailto:${CONTACT.mailCommercial}`}>
                {CONTACT.mailCommercial}
              </a>
            </Line>
            <Line>
              <Mail size={18} />
              <a href={`mailto:${CONTACT.mailDirection}`}>
                {CONTACT.mailDirection}
              </a>
            </Line>
            <SocialRow style={{ marginTop: 6 }}>
              {/* Mets tes vrais liens si dispo */}
              <SocialLink
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Linkedin size={20} />
              </SocialLink>
              <SocialLink
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Facebook size={20} />
              </SocialLink>
            </SocialRow>
          </Column>

          {/* Navigation rapide */}
          <Column variants={variants}>
            <SectionTitle>Navigation</SectionTitle>
            <LinkList>
              <a href="/programmes">
                <BookOpen size={14} style={{ marginRight: 6 }} /> Programmes
              </a>
              <a href="/apropos">
                <Users size={14} style={{ marginRight: 6 }} /> À propos
              </a>
              <a href="/contact">
                <Mail size={14} style={{ marginRight: 6 }} /> Contact
              </a>
            </LinkList>
          </Column>

          {/* Services / Domaines */}
          <Column variants={variants}>
            <SectionTitle>Domaines & services</SectionTitle>
            <Line>
              <GraduationCap size={18} /> Formations & Masters en ligne
            </Line>
            <Line>
              <ShieldCheck size={18} /> Certifications & qualité
            </Line>
            <Line>
              <BookOpen size={18} /> Recherche appliquée & cas réels
            </Line>
            <Line>
              <Users size={18} /> Partenariats académiques
            </Line>
          </Column>

          {/* Newsletter légère (non bloquante) */}
          <Column variants={variants}>
            <SectionTitle>Apprends. Applique. Réussis.</SectionTitle>
            <p style={{ margin: 0, color: colors.accentGoldLight }}>
              Nous aspirons à bâtir une communauté où chaque individu peut
              apprendre, innover et réussir, en utilisant la technologie pour
              créer de la valeur et accélérer le développement économique en
              Afrique et au-delà.{" "}
            </p>
          </Column>
        </GridContainer>

        {/* Barre légale */}
        <LegalBar variants={variants}>
          <LegalLinks>
            <LegalLink onClick={() => open("mentions")}>
              <FileText size={16} /> Mentions légales
            </LegalLink>
            <LegalLink onClick={() => open("privacy")}>
              <Lock size={16} /> Confidentialité
            </LegalLink>
            <LegalLink onClick={() => open("faq")}>
              <HelpCircle size={16} /> FAQ
            </LegalLink>
            <LegalLink onClick={() => open("cgu")}>
              <FileText size={16} /> CGU
            </LegalLink>
          </LegalLinks>

          <Copy>
            © {new Date().getFullYear()} Institut CORTEX — Tous droits réservés
            <div>
              <BackToTop onClick={scrollToTop}>
                <ArrowUp size={16} /> Retour en haut
              </BackToTop>
            </div>
          </Copy>
        </LegalBar>
      </InnerContainer>

      {/* Modal légal */}
      {modal && (
        <ModalBackdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          aria-modal="true"
          role="dialog"
          aria-labelledby="legal-title"
        >
          <ModalContent
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Close aria-label="Fermer" onClick={close}>
              <X size={18} />
            </Close>
            <ModalTitle id="legal-title">{legal[modal].title}</ModalTitle>
            <ModalBody>{legal[modal].body}</ModalBody>
          </ModalContent>
        </ModalBackdrop>
      )}
    </FooterContainer>
  );
}
