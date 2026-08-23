// src/components/CampusCortex/ContactSection.js
import React, { useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Download,
  ArrowUpRight,
  BadgeCheck,
  Sparkles,
  FileText,
} from "lucide-react";
import colors from "../../Styles/colors";

const CONTACT_ITEMS = [
  {
    key: "address",
    icon: MapPin,
    label: "Adresse",
    value: "Yattaya Mosquée - Conakry",
  },
  {
    key: "phone",
    icon: Phone,
    label: "Téléphone",
    value: "+224 612 68 41 43 / 628 44 56 47 / 623 21 19 74",
    href: "tel:+224612684143",
  },
  {
    key: "email",
    icon: Mail,
    label: "Email",
    value: "contact@institut-cortex.com",
    href: "mailto:contact@institut-cortex.com",
  },
  {
    key: "website",
    icon: Globe,
    label: "Site web",
    value: "www.institut-cortex.com",
    href: "https://www.institut-cortex.com",
  },
];

const DOWNLOAD_FILES = [
  {
    name: "Brochure Campus Cortex",
    file: "/docs/catalogue-Campus-Cortex2025-2026.pdf",
    description: "Présentation complète du programme, de la méthode et du parcours.",
  },
  {
    name: "Formulaire d'Inscription",
    file: "/docs/DC-2025-2026-inscription.pdf",
    description: "Document d’inscription au programme Campus Cortex.",
  },
  {
    name: "CRÉDUC – Microcrédit éducatif interne",
    file: "/docs/microcrédit-éducatif-interne.pdf",
    description: "Informations détaillées sur le dispositif de financement éducatif.",
  },
  {
    name: "Formulaire Demande Microcrédit",
    file: "/docs/Formulaire_Demande_Microcredit_Cortex.pdf",
    description: "Formulaire de demande de microcrédit éducatif.",
  },
];

const ContactSection = () => {
  const contactItems = useMemo(() => CONTACT_ITEMS, []);
  const downloadFiles = useMemo(() => DOWNLOAD_FILES, []);

  return (
    <Section id="contact">
      <AmbientGlow aria-hidden="true" />

      <Container>
        <Header>
          <Eyebrow
            as={motion.div}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Sparkles size={15} />
            Campus Cortex
          </Eyebrow>

          <Title
            as={motion.h2}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Contactez-nous et accédez directement aux{" "}
            <TitleAccent>documents essentiels</TitleAccent>
          </Title>

          <Subtitle
            as={motion.p}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Rejoignez le Campus Cortex, téléchargez les ressources utiles et
            échangez avec notre équipe pour préparer votre avenir professionnel.
          </Subtitle>
        </Header>

        <TopGrid>
          <DownloadsPanel
            as={motion.div}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <PanelHeader>
              <PanelKicker>
                <FileText size={16} />
                Documents utiles
              </PanelKicker>

              <PanelTitle>Téléchargez tout ce qu’il vous faut</PanelTitle>

              <PanelText>
                Retrouvez en un seul endroit la brochure, le formulaire
                d’inscription et les documents CRÉDUC liés au financement.
              </PanelText>
            </PanelHeader>

            <DownloadGrid>
              {downloadFiles.map((file, index) => (
                <DownloadCard
                  key={index}
                  as={motion.a}
                  href={file.file}
                  download
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <DownloadIconWrap>
                    <Download size={18} />
                  </DownloadIconWrap>

                  <DownloadContent>
                    <DownloadName>{file.name}</DownloadName>
                    <DownloadDesc>{file.description}</DownloadDesc>
                  </DownloadContent>

                  <DownloadArrow>
                    <ArrowUpRight size={16} />
                  </DownloadArrow>
                </DownloadCard>
              ))}
            </DownloadGrid>
          </DownloadsPanel>

          <QuickPanel
            as={motion.div}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <PanelKicker>
              <BadgeCheck size={16} />
              Échange rapide
            </PanelKicker>

            <QuickTitle>Besoin d’informations avant de candidater ?</QuickTitle>

            <QuickText>
              Notre équipe peut vous orienter sur le programme, l’inscription,
              les modalités de stage et les solutions de financement CRÉDUC.
            </QuickText>

            <QuickActions>
              <PrimaryAction href="mailto:contact@institut-cortex.com">
                <Mail size={16} />
                Nous écrire
              </PrimaryAction>

              <SecondaryAction href="tel:+224612684143">
                <Phone size={16} />
                Appeler maintenant
              </SecondaryAction>
            </QuickActions>

            <MiniProofs>
              <MiniProof>
                <BadgeCheck size={15} />
                Réponse orientée inscription
              </MiniProof>
              <MiniProof>
                <BadgeCheck size={15} />
                Informations sur le financement
              </MiniProof>
              <MiniProof>
                <BadgeCheck size={15} />
                Parcours professionnalisant
              </MiniProof>
            </MiniProofs>
          </QuickPanel>
        </TopGrid>

        <ContactSectionBlock
          as={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <BlockTitle>Nos coordonnées</BlockTitle>
          <BlockText>
            Plusieurs moyens simples pour joindre l’Institut Cortex.
          </BlockText>

          <ContactGrid>
            {contactItems.map((contact, index) => {
              const Icon = contact.icon;
              const inner = (
                <>
                  <ContactIcon>
                    <Icon size={20} />
                  </ContactIcon>

                  <ContactBody>
                    <ContactLabel>{contact.label}</ContactLabel>
                    <ContactValue>{contact.value}</ContactValue>
                  </ContactBody>
                </>
              );

              return contact.href ? (
                <ContactCardLink
                  key={contact.key}
                  href={contact.href}
                  target={contact.key === "website" ? "_blank" : undefined}
                  rel={contact.key === "website" ? "noreferrer" : undefined}
                  as={motion.a}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -3 }}
                >
                  {inner}
                </ContactCardLink>
              ) : (
                <ContactCard
                  key={contact.key}
                  as={motion.div}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -3 }}
                >
                  {inner}
                </ContactCard>
              );
            })}
          </ContactGrid>
        </ContactSectionBlock>
      </Container>
    </Section>
  );
};

export default React.memo(ContactSection);

/* =========================
   Styles
========================= */

const Section = styled.section`
  position: relative;
  padding: clamp(3rem, 6vw, 6rem) clamp(0.9rem, 2.4vw, 2rem);
  background: linear-gradient(135deg, ${colors.bgSoft} 0%, ${colors.bg} 100%);
  overflow: hidden;
`;

const AmbientGlow = styled.div`
  position: absolute;
  inset: auto auto -120px -120px;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(243, 111, 33, 0.14) 0%,
    rgba(243, 111, 33, 0.05) 36%,
    transparent 72%
  );
  filter: blur(14px);
  pointer-events: none;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  gap: clamp(1.6rem, 3vw, 2.5rem);
`;

const Header = styled.div`
  text-align: center;
  display: grid;
  gap: 0.85rem;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
  margin: 0 auto;
  padding: 0.6rem 0.95rem;
  border-radius: 999px;
  background: rgba(243, 111, 33, 0.12);
  border: 1px solid rgba(243, 111, 33, 0.22);
  color: ${colors.accentGold};
  font-weight: 700;
  font-size: 0.92rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.4rem);
  color: ${colors.text};
  line-height: 1.12;
  font-weight: 800;
`;

const TitleAccent = styled.span`
  color: ${colors.accentGold};
`;

const Subtitle = styled.p`
  margin: 0 auto;
  max-width: 760px;
  font-size: clamp(1rem, 1.8vw, 1.18rem);
  color: ${colors.muted};
  line-height: 1.7;
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: clamp(1rem, 2vw, 1.5rem);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const PanelBase = styled.div`
  border-radius: 24px 0 24px 0;
  border: 1px solid rgba(243, 111, 33, 0.14);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
  overflow: hidden;
`;

const DownloadsPanel = styled(PanelBase)`
  background: linear-gradient(135deg, ${colors.bg1} 0%, ${colors.bg} 100%);
  padding: clamp(1.2rem, 2vw, 1.5rem);
  display: grid;
  gap: 1.2rem;
`;

const QuickPanel = styled(PanelBase)`
  background: linear-gradient(
    135deg,
    ${colors.accentGold}18 0%,
    ${colors.bgSoft} 100%
  );
  padding: clamp(1.2rem, 2vw, 1.5rem);
  display: grid;
  align-content: start;
  gap: 1rem;
`;

const PanelHeader = styled.div`
  display: grid;
  gap: 0.7rem;
`;

const PanelKicker = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${colors.accentGold};
  font-weight: 800;
  font-size: 0.9rem;
`;

const PanelTitle = styled.h3`
  margin: 0;
  color: ${colors.text};
  font-size: clamp(1.25rem, 2vw, 1.65rem);
  line-height: 1.25;
`;

const PanelText = styled.p`
  margin: 0;
  color: ${colors.muted};
  line-height: 1.7;
`;

const DownloadGrid = styled.div`
  display: grid;
  gap: 0.9rem;
`;

const DownloadCard = styled.a`
  text-decoration: none;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.9rem;
  align-items: start;
  padding: 1rem;
  border-radius: 18px 0 18px 0;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(243, 111, 33, 0.12);
  color: ${colors.text};
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease, background 0.25s ease;

  &:hover {
    border-color: ${colors.accentGold};
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.06);
  }

  @media (max-width: 560px) {
    grid-template-columns: auto 1fr;
  }
`;

const DownloadIconWrap = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px 0 14px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
  color: white;
  flex-shrink: 0;
`;

const DownloadContent = styled.div`
  display: grid;
  gap: 0.28rem;
`;

const DownloadName = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: ${colors.text};
  line-height: 1.35;
`;

const DownloadDesc = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: ${colors.muted};
  line-height: 1.55;
`;

const DownloadArrow = styled.div`
  color: ${colors.accentGold};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 560px) {
    display: none;
  }
`;

const QuickTitle = styled.h3`
  margin: 0;
  font-size: clamp(1.25rem, 2vw, 1.7rem);
  line-height: 1.25;
  color: ${colors.text};
`;

const QuickText = styled.p`
  margin: 0;
  color: ${colors.muted};
  line-height: 1.75;
`;

const QuickActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.15rem;
`;

const ActionBase = styled.a`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.9rem 1.1rem;
  border-radius: 18px 0 18px 0;
  font-weight: 700;
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const PrimaryAction = styled(ActionBase)`
  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
  color: white;
  box-shadow: 0 10px 24px rgba(243, 111, 33, 0.24);
`;

const SecondaryAction = styled(ActionBase)`
  border: 1px solid rgba(243, 111, 33, 0.24);
  color: ${colors.text};
  background: transparent;

  &:hover {
    background: rgba(243, 111, 33, 0.06);
    border-color: ${colors.accentGold};
  }
`;

const MiniProofs = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-top: 0.3rem;
`;

const MiniProof = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: ${colors.text};
  font-size: 0.95rem;
  font-weight: 600;

  svg {
    color: ${colors.accentGold};
    flex-shrink: 0;
  }
`;

const ContactSectionBlock = styled.div`
  display: grid;
  gap: 0.9rem;
`;

const BlockTitle = styled.h3`
  margin: 0;
  color: ${colors.accentGold};
  font-size: clamp(1.35rem, 2.4vw, 2rem);
  text-align: center;
`;

const BlockText = styled.p`
  margin: 0 auto;
  text-align: center;
  max-width: 680px;
  color: ${colors.muted};
  line-height: 1.7;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: 1rem;
  width: 100%;
`;

const ContactCardBase = styled.div`
  background: ${colors.bgSoft};
  padding: clamp(1.1rem, 2vw, 1.35rem);
  border-radius: 18px 0 18px 0;
  border: 1px solid rgba(243, 111, 33, 0.16);
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 0.9rem;
  min-height: 100px;

  &:hover {
    border-color: ${colors.accentGold};
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16);
  }
`;

const ContactCard = styled(ContactCardBase)``;

const ContactCardLink = styled(ContactCardBase).attrs({ as: "a" })`
  text-decoration: none;
  color: inherit;
`;

const ContactIcon = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 14px 0 14px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${colors.accentGold},
    ${colors.accentGold3}
  );
  color: white;
  flex-shrink: 0;
`;

const ContactBody = styled.div`
  display: grid;
  gap: 0.25rem;
`;

const ContactLabel = styled.div`
  color: ${colors.accentGold};
  font-size: 0.9rem;
  font-weight: 800;
`;

const ContactValue = styled.p`
  color: ${colors.text};
  font-size: 0.98rem;
  margin: 0;
  line-height: 1.55;
  word-break: break-word;
  overflow-wrap: anywhere;
`;