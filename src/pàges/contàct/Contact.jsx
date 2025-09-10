// src/pages/ContactCortex.jsx
import React, { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import colors from "../../Styles/colors";
import { send } from "@emailjs/browser";
import ContactHero from "./Herocontàct";
import SEO from "../../SEO";

/* ===================== EmailJS (prod) ===================== */
const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_IDC,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_IDC,
  publicKey: import.meta.env.VITE_EMAILJS_USER_IDC, // clé publique
};

/* ===================== Helpers SEO ===================== */
const CANONICAL =
  typeof window !== "undefined"
    ? window.location.href
    : "https://cortex.com/contact";
const OG_IMAGE = "/img/cortex-logo.png";

/* ===================== Fond animé (palette CORTEX) ===================== */
const gridDrift = keyframes`
  0%   { background-position: 0 0, 0 0; opacity:.45; }
  50%  { background-position: 240px 150px, -240px -150px; opacity:.65; }
  100% { background-position: 0 0, 0 0; opacity:.45; }
`;
const float = keyframes`
  0% { transform: translateY(0) scale(1); opacity:.35; }
  50%{ transform: translateY(-12px) scale(1.04); opacity:.6; }
  100%{ transform: translateY(0) scale(1); opacity:.35; }
`;
const FX = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  &:before,
  &:after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        90deg,
        #ffffff08 0 1px,
        transparent 1px 42px
      ),
      repeating-linear-gradient(0deg, #ffffff06 0 1px, transparent 1px 42px);
    mix-blend-mode: soft-light;
    animation: ${gridDrift} 18s linear infinite;
  }
`;
const Halo = styled.span`
  position: absolute;
  width: 44vw;
  max-width: 540px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: radial-gradient(closest-side, ${(p) => p.$c}44, transparent 72%);
  filter: blur(38px);
  animation: ${float} ${(p) => p.$dur || 12}s ease-in-out infinite;
  top: ${(p) => p.$top || "auto"};
  bottom: ${(p) => p.$bottom || "auto"};
  left: ${(p) => p.$left || "auto"};
  right: ${(p) => p.$right || "auto"};
`;

/* ===================== Layout ===================== */
const Page = styled.section`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    ${colors.bg1},
    ${colors.bgSoft} 55%,
    #0f223a
  );
  color: ${colors.text};
  overflow: hidden;
`;
const Wrap = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(24px, 6vw, 56px) 20px 64px;
  display: grid;
  gap: clamp(18px, 2vw, 22px);
`;
const Head = styled.header`
  display: grid;
  gap: 8px;
  align-content: start;
`;
const Title = styled.h1`
  margin: 0;
  font-size: clamp(22px, 4.6vw, 40px);
  letter-spacing: 0.2px;
`;
const Lead = styled.p`
  margin: 0;
  color: ${colors.muted};
  max-width: 840px;
  font-size: clamp(14px, 2.2vw, 18px);
`;
const Grid = styled.div`
  display: grid;
  gap: 22px;
  grid-template-columns: 1fr;
  @media (min-width: 980px) {
    grid-template-columns: 0.95fr 1.05fr;
  }
`;

/* ===================== Panneau Infos ===================== */
const InfoPanel = styled(motion.aside)`
  border: 1px solid #1f2c44;
  border-radius: 22px 0 22px 0;
  background: linear-gradient(120deg, ${colors.bg2}80 60%, ${colors.bg1} 60%);
  padding: clamp(14px, 3vw, 22px);
  display: grid;
  
  gap: 12px;
  align-content: start;
`;
const PanelTitle = styled.h2`
  margin: 0 0 2px;
  font-size: clamp(18px, 2.8vw, 24px);
  color: ${colors.accentGold3};
`;
const PanelText = styled.p`
  margin: 0 0 6px;
  color: ${colors.accentGoldLight};
  font-size: clamp(13px, 1.9vw, 15px);
`;
const List = styled.ul`
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
`;
const Item = styled.li`
  display: grid;
  grid-template-columns: 32px 1fr;
  align-items: start;
  gap: 10px;
  color: ${colors.text};
  svg {
    color: ${colors.accentGold3};
  }
  a {
    color: ${colors.text};
    text-decoration: none;
    border-bottom: 1px dashed #27406655;
  }
  a:hover {
    color: ${colors.accentGold};
    border-bottom-color: ${colors.accentGold};
  }
`;
const Whats = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
 // background: red;
  color: ${colors.accentGold3};
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 800;
  box-shadow: 0 8px 22px rgba(37, 211, 102, 0.25);
  border: 1px solid ;
  width: fit-content;
  &:hover {
    filter: brightness(0.95);
  }
`;

/* ===================== Form ===================== */
const Form = styled(motion.form)`
  border: 1px solid ${colors.bg1};
  border-radius: 0 24px 0 24px;
  background: linear-gradient(
    120deg,
    ${colors.bg2}80 70%,
    ${colors.bg2}30 50%
  );
  padding: clamp(16px, 3.5vw, 26px);
  display: grid;
  gap: 12px;
  align-content: start;
`;
const Row = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const Field = styled.label`
  display: grid;
  gap: 6px;
  span {
    font-size: 13.5px;
    color: ${colors.accentGoldLight};
    letter-spacing: 0.15px;
  }
`;
const Input = styled.input`
  width: 90%;
  border-radius: 22px 22px 0 0;
  padding: 12px 14px;
  background: #0e1a2b;
  color: ${colors.text};
  border: 1px solid #22395d;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  &::placeholder {
    color: #93a4bb;
  }
  &:focus {
    border-color: ${colors.semygsecondar};
    box-shadow: 0 0 0 3px rgba(42, 75, 124, 0.25);
  }
  &[aria-invalid="true"] {
    border-color: #c0392b;
    box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.25);
  }
`;
const Textarea = styled.textarea`
  width: 90%;
  min-height: 130px;
  resize: vertical;
  white-space: pre-wrap;
  border-radius: 22px 22px 0 0;
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
  &[aria-invalid="true"] {
    border-color: #c0392b;
    box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.25);
  }
`;
const Help = styled.small`
  color: ${(p) => (p.$error ? "#ffb4b4" : colors.muted)};
`;
const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 4px;
`;
const Submit = styled(motion.button)`
  appearance: none;
  //border: 1px solid #d9b642;
  cursor: pointer;
  background: ${colors.accentGold};
  color: #0e1a2b;
  font-weight: 800;
  padding: 12px 16px;
  border-radius: 22px 22px 0 0;
  box-shadow: 0 10px 28px rgba(242, 201, 76, 0.28);
  transition: box-shadow 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  &:hover {
    box-shadow: 0 12px 32px rgba(242, 201, 76, 0.36);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

/* ===================== Skeleton & Defer (perfs/UX) ===================== */
const shimmer = keyframes`
  0% { background-position: -180% 0; }
  100% { background-position: 180% 0; }
`;
const Skeleton = styled.div`
  height: ${(p) => p.$h || "240px"};
  border-radius: 18px;
  //border: 1px solid red;
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0.04) 20%,
      ${colors.accentGold} 40%,
      ${colors.accentGold} 60%
    ),
    #0f223a;
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease infinite;
`;
function DeferInView({ height = 280, children }) {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    let obs;
    if (ref.current && !show) {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setShow(true);
              obs?.disconnect();
            }
          });
        },
        { rootMargin: "240px 0px", threshold: 0.01 }
      );
      obs.observe(ref.current);
    }
    return () => obs?.disconnect();
  }, [show]);
  return (
    <div ref={ref}>{show ? children : <Skeleton $h={`${height}px`} />}</div>
  );
}

/* ===================== Données contact ===================== */
const EMAIL = "commerciale@institut-cortex.com";
const EMAILl = "direction@institut-cortex.com";
const PHONE = "+224623211974";
const WHATSAPP = "+224623211974";
const WA_NUM = WHATSAPP.replace(/\D/g, "");

/* ===================== Validation (espaces autorisés) ===================== */
const sanitize = (v) => v.replace(/<[^>]*>?/gm, "").replace(/\u00A0/g, " ");
const validators = {
  name: (v) => /^[\p{L}\s\-']{2,}$/u.test(v),
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  phone: (v) => v === "" || /^[\d()+.\-\s]{6,}$/.test(v),
  subject: (v) => v.trim().length >= 2 && v.trim().length <= 120,
  message: (v) =>
    /^[\p{L}\p{N}\s.,!?;:()\-'"’“”]+$/u.test(v) &&
    v.replace(/\s/g, " ").trim().length >= 10,
};

export default function ContactCortex() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    robot: "",
  });
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const [online, setOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  // Conserve les espaces internes dans tous les champs (nettoyage ciblé)
  const setVal = (name, value) => {
    const clean = sanitize(value);

    if (name === "name") {
      const post = clean.replace(/[^\p{L}\s\-']/gu, "");
      setForm((f) => ({ ...f, [name]: post }));
      return;
    }
    if (name === "phone") {
      const post = clean.replace(/[^\d()+.\-\s]/g, "");
      setForm((f) => ({ ...f, [name]: post }));
      return;
    }
    if (name === "message") {
      const post = clean.replace(/[^\p{L}\p{N}\s.,!?;:()\-'"’“”]/gu, "");
      setForm((f) => ({ ...f, [name]: post }));
      return;
    }
    setForm((f) => ({ ...f, [name]: clean }));
  };

  const isValid = useMemo(() => {
    return (
      validators.name(form.name) &&
      validators.email(form.email) &&
      validators.phone(form.phone) &&
      validators.subject(form.subject) &&
      validators.message(form.message) &&
      form.robot === ""
    );
  }, [form]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!online) {
      toast.error("Vous êtes hors ligne. Vérifiez votre connexion.");
      return;
    }
    if (!isValid) {
      toast.error("Veuillez corriger les erreurs avant l’envoi.");
      setTouched({
        name: true,
        email: true,
        phone: true,
        subject: true,
        message: true,
      });
      return;
    }

    setSending(true);
    try {
      const params = {
        name: form.name,
        email: form.email,
        phone: form.phone || "N/A",
        subject: form.subject,
        message: form.message,
        origin: typeof window !== "undefined" ? window.location.href : "app",
      };
      await send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        params,
        EMAILJS.publicKey
      );
      toast.success("Message envoyé avec succès ✅");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        robot: "",
      });
      setTouched({});
    } catch (err) {
      const msg =
        err && (err.text || err.message)
          ? String(err.text || err.message)
          : "Erreur inconnue";
      toast.error(`Échec de l’envoi. ${msg}`);
    } finally {
      setSending(false);
    }
  };

  const invalid = (name) =>
    Boolean(touched[name] && !validators[name](form[name]));

  return (
    <Page>
      {/* ==== SEO (title/desc/OG + canonical) ==== */}
      <SEO
        title="Contact — Institut CORTEX | Programmes, Certifications & Partenariats"
        description="Contactez l’Institut CORTEX : questions sur les programmes, certifications, partenariats ou accompagnement. Réponse sous 24–48h ouvrées."
        url={CANONICAL}
        image={OG_IMAGE}
        siteName="Institut CORTEX"
        keywords={[
          "Contact Institut Cortex",
          "CORTEX Conakry",
          "Formation professionnelle Guinée",
          "Masters en ligne",
          "Certifications",
          "Partenariats académiques",
          "Conseil",
        ]}
      >
        {/* Pré-connexion aux endpoints EmailJS pour réduire la latence à l’envoi */}
        <link rel="preconnect" href="https://api.emailjs.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
      </SEO>

      {/* Hero (ton composant existant) */}
      <ContactHero
        title="Contact — Institut CORTEX+"
        subtitle="Programmes, certifications, partenariats : décrivez votre besoin, nous répondons sous 24–48h ouvrées."
        email="contact@cortex.com"
        phone="+224 623 21 19 74"
        whatsapp="+224 623 21 19 74"
      />

      <ToastContainer position="top-right" autoClose={4000} />

      {/* Fond animé */}
      <FX>
        <Halo $c={colors.semygsecondar} $left="-8%" $top="6%" $dur={14} />
        <Halo $c={colors.semygprimar} $right="-10%" $bottom="-16%" $dur={12} />
        <Halo $c={"#3a6ea833"} $left="60%" $top="-12%" $dur={16} />
      </FX>

      <Wrap>
        {/* Header avec description */}
        <Head>
          <Title>Institut CORTEX</Title>
          <Lead>
            Décrivez votre besoin (programmes, certifications, partenariats,
            recherche appliquée). Notre équipe vous répond sous 24–48h ouvrées.
          </Lead>
        </Head>

        <Grid>
          {/* Coordonnées (montage différé + skeleton) */}
          <DeferInView height={300}>
            <InfoPanel
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              aria-label="Coordonnées directes"
            >
              <PanelTitle>Coordonnées directes</PanelTitle>
              <PanelText>
                Vous pouvez aussi nous écrire ou nous appeler.
              </PanelText>

              <List>
                <Item>
                  <Mail size={20} />
                  <div>
                    <b style={{ color: colors.semygprimar }}>Commerciale</b>
                    <br />
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </div>
                </Item>
                <Item>
                  <Mail size={20} />
                  <div>
                    <b style={{ color: colors.semygprimar }}>Direction</b>
                    <br />
                    <a href={`mailto:${EMAILl}`}>{EMAILl}</a>
                  </div>
                </Item>
                <Item>
                  <Phone size={20} />
                  <div>
                    <b style={{ color: colors.semygprimar }}>Téléphone</b>
                    <br />
                    <a href={`tel:${PHONE}`}>{PHONE}</a>
                  </div>
                </Item>
                <Item>
                  <MapPin size={20} />
                  <div>
                    <b style={{ color: colors.semygprimar }}>Adresse</b>
                    <br />
                    Conakry, Guinée — Quartier Kobaya
                  </div>
                </Item>
              </List>

              <Whats
                href={`https://wa.me/${WA_NUM}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp direct CORTEX"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M20.52 3.48A11.9 11.9 0 0 0 12 .6 11.4 11.4 0 0 0 .6 12.06c0 2.02.53 3.99 1.55 5.73L.53 23.4l5.74-1.6A11.4 11.4 0 0 0 12.06 23.4c6.3 0 11.4-5.1 11.4-11.4 0-3.02-1.18-5.86-3.36-7.92ZM12.06 21a9 9 0 0 1-4.59-1.24l-.33-.2-3.4.96.94-3.32-.22-.34A9 9 0 1 1 21 12.06 8.94 8.94 0 0 1 12.06 21Zm5.27-6.7c-.3-.15-1.78-.87-2.06-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.49-1.77-1.67-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.24-.58-.48-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.48 0 1.46 1.08 2.88 1.23 3.07.15.2 2.12 3.22 5.13 4.51.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.26-.2-.56-.35Z" />
                </svg>
                WhatsApp direct
              </Whats>
            </InfoPanel>
          </DeferInView>

          {/* Formulaire (EmailJS) — montage différé + skeleton */}
          <DeferInView height={520}>
            <Form
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              noValidate
              aria-label="Formulaire de contact"
            >
              <PanelTitle>Envoyer un message</PanelTitle>
              <PanelText>Les champs marqués * sont obligatoires.</PanelText>

              {/* Honeypot anti-robots */}
              <input
                type="text"
                name="robot"
                value={form.robot}
                onChange={(e) => setVal("robot", e.target.value)}
                style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <Row>
                <Field>
                  <span>Nom complet *</span>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={(e) => setVal("name", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    placeholder="Ex. NOM Prénom"
                    aria-invalid={invalid("name")}
                    required
                  />
                  <Help $error={invalid("name")}>
                    {invalid("name")
                      ? "Au moins 2 lettres (espaces autorisés)."
                      : " "}
                  </Help>
                </Field>

                <Field>
                  <span>Email *</span>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => setVal("email", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    placeholder="exemple@domaine.com"
                    aria-invalid={invalid("email")}
                    required
                  />
                  <Help $error={invalid("email")}>
                    {invalid("email") ? "Email invalide." : " "}
                  </Help>
                </Field>
              </Row>

              <Row>
                <Field>
                  <span>Téléphone (optionnel)</span>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={(e) => setVal("phone", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                    placeholder="+224 623 21 19 74"
                    aria-invalid={invalid("phone")}
                    inputMode="tel"
                  />
                  <Help $error={invalid("phone")}>
                    {invalid("phone")
                      ? "Numéro invalide (espaces autorisés)."
                      : " "}
                  </Help>
                </Field>

                <Field>
                  <span>Objet *</span>
                  <Input
                    name="subject"
                    value={form.subject}
                    onChange={(e) => setVal("subject", e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
                    placeholder="Ex. Master, Certification, Partenariat…"
                    aria-invalid={invalid("subject")}
                    required
                  />
                  <Help $error={invalid("subject")}>
                    {invalid("subject")
                      ? "2 à 120 caractères (espaces autorisés)."
                      : " "}
                  </Help>
                </Field>
              </Row>

              <Field>
                <span>Message *</span>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={(e) => setVal("message", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  placeholder="Expliquez votre projet, vos objectifs et contraintes…"
                  aria-invalid={invalid("message")}
                  required
                />
                <Help $error={invalid("message")}>
                  {invalid("message")
                    ? "Au moins 10 caractères (espaces/retours ligne autorisés)."
                    : `${form.message.length}/10 min`}
                </Help>
              </Field>

              <Actions>
                <Submit
                  type="submit"
                  disabled={sending || !isValid || !online}
                  whileHover={{ y: sending || !isValid || !online ? 0 : -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={18} />
                  {sending
                    ? "Envoi en cours…"
                    : online
                    ? "Envoyer"
                    : "Hors ligne"}
                </Submit>
              </Actions>
            </Form>
          </DeferInView>
        </Grid>
      </Wrap>
    </Page>
  );
}
