import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Mail,
  MessageCircle,
  Phone,
  Send,
  BookCheck,
  UsersRound,
} from "lucide-react";
import colors from "../../Styles/colors";
import ProModal from "./ProModal";
import {
  catalogues,
  getCatalogueSchools,
} from "./filieres.data";
import {
  flattenSchoolPrograms,
} from "./programmeContact";

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_IDC,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_IDC,
  publicKey: import.meta.env.VITE_EMAILJS_USER_IDC,
};

const CONTACT = {
  email: "commerciale@institut-cortex.com",
  phone: "+224623211974",
  whatsapp: "+224623211974",
};

const INTENTS = [
  {
    id: "inscription",
    label: "Inscription",
    helper: "Je veux rejoindre un programme",
    icon: GraduationCap,
  },
  {
    id: "information",
    label: "Être conseillé(e)",
    helper: "J’ai besoin d’orientation",
    icon: MessageCircle,
  },
  {
    id: "partenariat",
    label: "Partenariat",
    helper: "Je représente une organisation",
    icon: BriefcaseBusiness,
  },
];

const sanitize = (value = "") =>
  String(value).replace(/<[^>]*>?/gm, "").replace(/\u00A0/g, " ");

const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validPhone = (value) => !value || /^[\d()+.\-\s]{6,}$/.test(value);

function getInitialForm(detail = {}) {
  return {
    intent: detail.intent || "information",
    catalogueId: detail.catalogueId || "",
    schoolSlug: detail.schoolSlug || "",
    programTitle: detail.programTitle || "",
    name: "",
    email: "",
    phone: "",
    organisation: "",
    message: "",
    robot: "",
  };
}

export default function ContactAdmissionModal({ initialRequest = null }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("site");
  const [form, setForm] = useState(() => getInitialForm());
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const applyOpenRequest = useCallback((detail = {}) => {
    setSource(detail.source || "site");
    setForm(getInitialForm(detail));
    setTouched({});
    setSent(false);
    setError("");
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!initialRequest) return;
    applyOpenRequest(initialRequest);
  }, [initialRequest, applyOpenRequest]);

  const activeCatalogue = useMemo(
    () => catalogues.find((catalogue) => catalogue.id === form.catalogueId) || null,
    [form.catalogueId]
  );

  const schools = useMemo(
    () => getCatalogueSchools(activeCatalogue),
    [activeCatalogue]
  );

  const selectedSchool = useMemo(
    () => schools.find((school) => school.slug === form.schoolSlug) || null,
    [schools, form.schoolSlug]
  );

  const programs = useMemo(
    () => flattenSchoolPrograms(selectedSchool),
    [selectedSchool]
  );

  useEffect(() => {
    if (!form.schoolSlug) return;
    if (!schools.some((school) => school.slug === form.schoolSlug)) {
      setForm((prev) => ({ ...prev, schoolSlug: "", programTitle: "" }));
    }
  }, [schools, form.schoolSlug]);

  useEffect(() => {
    if (!form.programTitle) return;
    if (!programs.some((program) => program.title === form.programTitle)) {
      setForm((prev) => ({ ...prev, programTitle: "" }));
    }
  }, [programs, form.programTitle]);

  const selectedIntent =
    INTENTS.find((intent) => intent.id === form.intent) || INTENTS[1];

  const contextLabel = useMemo(() => {
    const values = [
      activeCatalogue?.shortLabel,
      selectedSchool?.title,
      form.programTitle,
    ].filter(Boolean);
    return values.join(" · ");
  }, [activeCatalogue, selectedSchool, form.programTitle]);

  const subject = useMemo(() => {
    if (form.intent === "inscription") {
      return `Demande d'inscription${form.programTitle ? ` — ${form.programTitle}` : ""}`;
    }
    if (form.intent === "partenariat") return "Demande de partenariat";
    return `Demande d'information${selectedSchool?.title ? ` — ${selectedSchool.title}` : ""}`;
  }, [form.intent, form.programTitle, selectedSchool]);

  const isValid = useMemo(() => {
    const base =
      form.name.trim().length >= 2 &&
      validEmail(form.email) &&
      validPhone(form.phone) &&
      form.robot === "";

    if (!base) return false;
    if (form.intent === "inscription") return Boolean(form.catalogueId);
    if (form.intent === "partenariat") return form.organisation.trim().length >= 2;
    return true;
  }, [form]);

  const setValue = (name, value) => {
    const clean = sanitize(value);

    setForm((prev) => {
      if (name === "catalogueId") {
        return {
          ...prev,
          catalogueId: clean,
          schoolSlug: "",
          programTitle: "",
        };
      }
      if (name === "schoolSlug") {
        return { ...prev, schoolSlug: clean, programTitle: "" };
      }
      if (name === "phone") {
        return { ...prev, phone: clean.replace(/[^\d()+.\-\s]/g, "") };
      }
      return { ...prev, [name]: clean };
    });
  };

  const closeModal = useCallback(() => {
    if (sending) return;
    setOpen(false);
  }, [sending]);

  const markAllTouched = () => {
    setTouched({
      name: true,
      email: true,
      phone: true,
      organisation: true,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!isValid) {
      markAllTouched();
      setError("Vérifiez les informations obligatoires avant l’envoi.");
      return;
    }

    if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
      setError(
        "La configuration d’envoi n’est pas disponible. Utilisez WhatsApp ou contactez directement l’Institut Cortex."
      );
      return;
    }

    setSending(true);

    try {
      const details = [
        `Type de demande : ${selectedIntent.label}`,
        activeCatalogue?.shortLabel
          ? `Profil / catalogue : ${activeCatalogue.shortLabel}`
          : "",
        selectedSchool?.title ? `Grande École : ${selectedSchool.title}` : "",
        form.programTitle ? `Parcours : ${form.programTitle}` : "",
        form.organisation ? `Organisation : ${form.organisation}` : "",
        form.message ? `Message : ${form.message}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      // EmailJS est chargé uniquement au moment de l'envoi, pas à l'ouverture du site.
      const { send } = await import("@emailjs/browser");

      await send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          name: form.name,
          email: form.email,
          phone: form.phone || "N/A",
          subject,
          message: details,
          intent: form.intent,
          catalogue: activeCatalogue?.shortLabel || "",
          school: selectedSchool?.title || "",
          program: form.programTitle || "",
          organisation: form.organisation || "",
          source,
          origin: typeof window !== "undefined" ? window.location.href : "app",
        },
        EMAILJS.publicKey
      );

      setSent(true);
    } catch (err) {
      setError(
        err?.text || err?.message ||
          "L’envoi n’a pas abouti. Vous pouvez utiliser WhatsApp immédiatement."
      );
    } finally {
      setSending(false);
    }
  };

  const whatsappMessage = useMemo(() => {
    const lines = [
      "Bonjour Institut Cortex,",
      `Je souhaite : ${selectedIntent.label.toLowerCase()}.`,
      activeCatalogue?.shortLabel
        ? `Profil : ${activeCatalogue.shortLabel}.`
        : "",
      selectedSchool?.title ? `Grande École : ${selectedSchool.title}.` : "",
      form.programTitle ? `Parcours : ${form.programTitle}.` : "",
      form.name ? `Nom : ${form.name}.` : "",
      form.phone ? `Téléphone : ${form.phone}.` : "",
    ].filter(Boolean);

    return encodeURIComponent(lines.join("\n"));
  }, [activeCatalogue, selectedIntent, selectedSchool, form]);

  return (
    <ProModal
      open={open}
      onClose={closeModal}
      title={sent ? "Demande transmise" : "Contact & admission — Institut Cortex"}
      labelledById="cortex-contact-modal-title"
      describedById="cortex-contact-modal-desc"
    >
      <ModalBody id="cortex-contact-modal-desc">
        {sent ? (
          <SuccessPanel
            as={motion.div}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SuccessIcon>
              <CheckCircle2 size={34} />
            </SuccessIcon>
            <SuccessKicker>PREMIER ÉCHANGE DÉCLENCHÉ</SuccessKicker>
            <SuccessTitle>Votre demande a bien été envoyée.</SuccessTitle>
            <SuccessText>
              Notre équipe dispose déjà du contexte de votre demande
              {contextLabel ? ` : ${contextLabel}` : ""}. Vous pouvez fermer cette
              fenêtre et poursuivre votre navigation.
            </SuccessText>
            <SuccessActions>
              <PrimaryButton type="button" onClick={closeModal}>
                Continuer à explorer
                <ArrowRight size={17} />
              </PrimaryButton>
              <WhatsAppButton
                href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} />
                WhatsApp
              </WhatsAppButton>
            </SuccessActions>
          </SuccessPanel>
        ) : (
          <Layout>
            <IntroPanel>
              <IntroTop>
                <AnimatedBadge
                  as={motion.span}
                  animate={
                    reduceMotion
                      ? undefined
                      : { y: [0, -4, 0], rotate: [0, 2, 0] }
                  }
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <BookCheck size={18} />
                </AnimatedBadge>
                <div>
                  <Eyebrow>PREMIER CONTACT CORTEX</Eyebrow>
                  <IntroTitle>Votre projet commence ici.</IntroTitle>
                </div>
              </IntroTop>

              <IntroText>
                Vous restez sur la page que vous consultez. Nous récupérons le
                contexte de votre choix pour que l’équipe Cortex puisse vous répondre
                plus rapidement et avec les bonnes informations.
              </IntroText>

              <IntentGrid role="group" aria-label="Type de demande">
                {INTENTS.map(({ id, label, helper, icon: Icon }) => (
                  <IntentButton
                    key={id}
                    type="button"
                    $active={form.intent === id}
                    aria-pressed={form.intent === id}
                    onClick={() => setValue("intent", id)}
                  >
                    <motion.span
                      animate={
                        !reduceMotion && form.intent === id
                          ? { scale: [1, 1.08, 1] }
                          : undefined
                      }
                      transition={{ duration: 0.45 }}
                    >
                      <Icon size={18} />
                    </motion.span>
                    <span>
                      <b>{label}</b>
                      <small>{helper}</small>
                    </span>
                  </IntentButton>
                ))}
              </IntentGrid>

              <ContextCard>
                <ContextHead>
                  <BadgeCheck size={17} />
                  Contexte transmis
                </ContextHead>
                <ContextLine>
                  <span>Profil</span>
                  <b>{activeCatalogue?.shortLabel || "À définir"}</b>
                </ContextLine>
                <ContextLine>
                  <span>Grande École</span>
                  <b>{selectedSchool?.title || "À définir"}</b>
                </ContextLine>
                <ContextLine>
                  <span>Parcours</span>
                  <b>{form.programTitle || "À définir"}</b>
                </ContextLine>
              </ContextCard>

              <DirectLinks>
                <a href={`tel:${CONTACT.phone}`}>
                  <Phone size={16} /> Appeler
                </a>
                <a href={`mailto:${CONTACT.email}`}>
                  <Mail size={16} /> E-mail
                </a>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </DirectLinks>
            </IntroPanel>

            <Form onSubmit={handleSubmit} noValidate>
              {form.intent !== "partenariat" && (
                <SelectionBlock>
                  <BlockLabel>
                    <BookOpen size={16} /> Votre orientation
                  </BlockLabel>
                  <SelectGrid>
                    <Field>
                      <span>Profil / catalogue</span>
                      <Select
                        value={form.catalogueId}
                        onChange={(event) =>
                          setValue("catalogueId", event.target.value)
                        }
                      >
                        <option value="">Choisir mon profil</option>
                        {catalogues.map((catalogue) => (
                          <option key={catalogue.id} value={catalogue.id}>
                            {catalogue.shortLabel} — {catalogue.title}
                          </option>
                        ))}
                      </Select>
                    </Field>

                    <Field>
                      <span>Grande École</span>
                      <Select
                        value={form.schoolSlug}
                        onChange={(event) =>
                          setValue("schoolSlug", event.target.value)
                        }
                      >
                        <option value="">Je souhaite être orienté(e)</option>
                        {schools.map((school) => (
                          <option key={school.slug} value={school.slug}>
                            {school.title}
                          </option>
                        ))}
                      </Select>
                    </Field>

                    <Field $wide>
                      <span>Parcours / programme</span>
                      <Select
                        value={form.programTitle}
                        onChange={(event) =>
                          setValue("programTitle", event.target.value)
                        }
                        disabled={!selectedSchool}
                      >
                        <option value="">
                          {selectedSchool
                            ? "Je souhaite être conseillé(e) sur le parcours"
                            : "Sélectionnez d’abord une Grande École"}
                        </option>
                        {programs.map((program) => (
                          <option key={program.title} value={program.title}>
                            {program.title}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </SelectGrid>
                </SelectionBlock>
              )}

              <BlockLabel>
                <UsersRound size={16} /> Vos coordonnées
              </BlockLabel>

              <InputGrid>
                <Field>
                  <span>Nom complet *</span>
                  <Input
                    value={form.name}
                    onChange={(event) => setValue("name", event.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                    aria-invalid={Boolean(touched.name && form.name.trim().length < 2)}
                    placeholder="Votre nom et prénom"
                    autoComplete="name"
                  />
                </Field>

                <Field>
                  <span>E-mail *</span>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(event) => setValue("email", event.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                    aria-invalid={Boolean(touched.email && !validEmail(form.email))}
                    placeholder="vous@email.com"
                    autoComplete="email"
                  />
                </Field>

                <Field>
                  <span>Téléphone / WhatsApp</span>
                  <Input
                    value={form.phone}
                    onChange={(event) => setValue("phone", event.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                    aria-invalid={Boolean(touched.phone && !validPhone(form.phone))}
                    placeholder="+224 ..."
                    autoComplete="tel"
                  />
                </Field>

                {form.intent === "partenariat" && (
                  <Field>
                    <span>Organisation *</span>
                    <Input
                      value={form.organisation}
                      onChange={(event) =>
                        setValue("organisation", event.target.value)
                      }
                      onBlur={() =>
                        setTouched((prev) => ({ ...prev, organisation: true }))
                      }
                      aria-invalid={Boolean(
                        touched.organisation && form.organisation.trim().length < 2
                      )}
                      placeholder="Entreprise / institution"
                    />
                  </Field>
                )}

                <Field $wide>
                  <span>Message complémentaire</span>
                  <Textarea
                    value={form.message}
                    onChange={(event) => setValue("message", event.target.value)}
                    placeholder="Précisez votre besoin, vos disponibilités ou votre objectif professionnel…"
                  />
                </Field>
              </InputGrid>

              <Honeypot
                tabIndex="-1"
                autoComplete="off"
                value={form.robot}
                onChange={(event) => setValue("robot", event.target.value)}
                aria-hidden="true"
              />

              {error && <ErrorBox role="alert">{error}</ErrorBox>}

              <SubmitRow>
                <SubmitHint>
                  En envoyant, vous déclenchez le premier échange avec l’équipe
                  Cortex. Aucun changement de page.
                </SubmitHint>
                <PrimaryButton type="submit" disabled={sending}>
                  <Send size={17} />
                  {sending ? "Envoi…" : "Envoyer ma demande"}
                  {!sending && <ArrowRight size={16} />}
                </PrimaryButton>
              </SubmitRow>
            </Form>
          </Layout>
        )}
      </ModalBody>
    </ProModal>
  );
}

const ModalBody = styled.div`
  min-width: 0;
  overflow-x: hidden;
  padding: 10px;
  color: ${colors.text};
  background:
    radial-gradient(420px 220px at 0% 0%, rgba(243,111,33,.055), transparent 70%),
    transparent;

  @media (min-width: 641px) {
    padding: 16px;
  }
`;

const Layout = styled.div`
  min-width: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 821px) {
    grid-template-columns: minmax(260px, 0.78fr) minmax(0, 1.35fr);
    gap: 18px;
    align-items: start;
  }
`;

const IntroPanel = styled.aside`
  position: relative;
  overflow: hidden;
  min-width: 0;
  display: grid;
  gap: 13px;
  padding: 14px 12px;
  border: 1px solid rgba(243, 111, 33, 0.16);
  border-radius: 18px 0 18px 0;
  background:
    radial-gradient(
      360px 180px at 10% 0%,
      rgba(243, 111, 33, 0.13),
      transparent 66%
    ),
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.055),
      rgba(255, 255, 255, 0.018)
    );
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.16);

  @media (min-width: 641px) {
    padding: 18px;
    border-radius: 22px 0 22px 0;
    gap: 16px;
  }

  @media (min-width: 821px) {
    position: sticky;
    top: 0;
    align-self: start;
  }
`;

const IntroTop = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const AnimatedBadge = styled.span`
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 14px 0 14px 0;
  color: ${colors.bg};
  background: ${colors.accentGold};
  box-shadow: 0 10px 24px rgba(243, 111, 33, 0.2);

  @media (min-width: 641px) {
    width: 44px;
    height: 44px;
    border-radius: 16px 0 16px 0;
  }
`;

const Eyebrow = styled.div`
  color: ${colors.accentGold3};
  font-size: 9px;
  font-weight: 950;
  letter-spacing: 0.12em;
`;

const IntroTitle = styled.h3`
  margin: 4px 0 0;
  color: ${colors.text};
  font-size: clamp(20px, 6.2vw, 31px);
  line-height: 1.06;
  letter-spacing: -0.035em;
`;

const IntroText = styled.p`
  margin: 0;
  color: ${colors.muted};
  line-height: 1.55;
  font-size: 12px;

  @media (min-width: 641px) {
    line-height: 1.65;
    font-size: 13px;
  }
`;

const IntentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 7px;

  > button:last-child {
    grid-column: 1 / -1;
  }

  @media (min-width: 821px) {
    grid-template-columns: 1fr;

    > button:last-child {
      grid-column: auto;
    }
  }
`;

const IntentButton = styled.button`
  width: 100%;
  min-width: 0;
  min-height: 50px;
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  padding: 9px;
  border: 1px solid
    ${(p) => (p.$active ? colors.accentGold : "rgba(255,255,255,.10)")};
  border-radius: 14px 0 14px 0;
  background: ${(p) =>
    p.$active ? "rgba(243,111,33,.10)" : "rgba(255,255,255,.025)"};
  color: ${colors.text};
  text-align: left;
  cursor: pointer;
  transition: transform .18s ease, border-color .18s ease, background .18s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    border-color: ${colors.accentGold};
    outline: none;
  }

  > span:first-child {
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border-radius: 10px 0 10px 0;
    color: ${(p) => (p.$active ? colors.bg : colors.accentGold)};
    background: ${(p) =>
      p.$active ? colors.accentGold : "rgba(243,111,33,.09)"};
  }

  > span:last-child {
    min-width: 0;
    display: grid;
    gap: 2px;
  }

  b {
    font-size: 11px;
    line-height: 1.25;
  }

  small {
    display: none;
    color: ${colors.muted};
    font-size: 9px;
    line-height: 1.3;
  }

  @media (min-width: 390px) {
    small {
      display: block;
    }
  }

  @media (min-width: 821px) {
    min-height: 54px;
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 10px;
    padding: 10px 11px;

    > span:first-child {
      width: 34px;
      height: 34px;
      border-radius: 12px 0 12px 0;
    }

    b {
      font-size: 12px;
    }

    small {
      display: block;
      font-size: 10px;
    }
  }
`;

const ContextCard = styled.div`
  min-width: 0;
  display: grid;
  gap: 8px;
  padding: 12px;
  border-radius: 15px 0 15px 0;
  border: 1px solid rgba(42, 75, 124, 0.34);
  background: ${colors.bg};
`;

const ContextHead = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${colors.accentGold};
  font-size: 11px;
  font-weight: 900;
`;

const ContextLine = styled.div`
  min-width: 0;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 7px;
  font-size: 10px;
  line-height: 1.35;

  span {
    color: ${colors.muted};
  }

  b {
    min-width: 0;
    color: ${colors.text};
    overflow-wrap: anywhere;
  }

  @media (min-width: 641px) {
    grid-template-columns: 86px minmax(0, 1fr);
  }
`;

const DirectLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;

  a {
    min-width: 0;
    min-height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0 7px;
    border-radius: 12px 0 12px 0;
    border: 1px solid rgba(255, 255, 255, 0.09);
    color: ${colors.text};
    background: rgba(255, 255, 255, 0.025);
    text-decoration: none;
    font-size: 9px;
    font-weight: 800;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
  }

  a:hover,
  a:focus-visible {
    border-color: ${colors.accentGold};
    outline: none;
  }

  @media (min-width: 641px) {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;

    a {
      min-height: 38px;
      padding: 0 10px;
      font-size: 10px;
    }
  }
`;

const Form = styled.form`
  min-width: 0;
  display: grid;
  gap: 14px;
  padding: 14px 12px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 18px 0 18px 0;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.045),
    rgba(255, 255, 255, 0.015)
  );

  @media (min-width: 641px) {
    padding: 18px;
    border-radius: 0 22px 0 22px;
  }
`;

const SelectionBlock = styled.div`
  display: grid;
  gap: 10px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const BlockLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.accentGoldLight};
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.04em;
`;

const SelectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media (min-width: 680px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const InputGrid = styled(SelectGrid)``;

const Field = styled.label`
  min-width: 0;
  display: grid;
  gap: 6px;
  grid-column: ${(p) => (p.$wide ? "1 / -1" : "auto")};

  > span {
    color: ${colors.muted};
    font-size: 11px;
    font-weight: 800;
  }
`;

const fieldStyles = `
  width: 100%;
  min-width: 0;
  min-height: 48px;
  border-radius: 14px 0 14px 0;
  border: 1px solid rgba(255,255,255,.11);
  background: #0e1a2b;
  color: #e8eef7;
  outline: none;
  font-size: 16px;
  transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
  -webkit-appearance: none;
  appearance: none;
`;

const Input = styled.input`
  ${fieldStyles}
  padding: 0 13px;

  &:focus {
    border-color: ${colors.accentGold};
    box-shadow: 0 0 0 3px rgba(243, 111, 33, 0.12);
    background: #102038;
  }

  &[aria-invalid="true"] {
    border-color: #ff7b7b;
  }
`;

const Select = styled.select`
  ${fieldStyles}
  padding: 0 38px 0 13px;

  &:focus {
    border-color: ${colors.accentGold};
    box-shadow: 0 0 0 3px rgba(243, 111, 33, 0.12);
    background: #102038;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const Textarea = styled.textarea`
  ${fieldStyles}
  min-height: 118px;
  resize: vertical;
  padding: 12px 13px;
  line-height: 1.55;

  &:focus {
    border-color: ${colors.accentGold};
    box-shadow: 0 0 0 3px rgba(243, 111, 33, 0.12);
    background: #102038;
  }
`;

const Honeypot = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

const ErrorBox = styled.div`
  padding: 11px 12px;
  border-radius: 12px 0 12px 0;
  border: 1px solid rgba(255, 110, 110, 0.4);
  background: rgba(156, 40, 40, 0.14);
  color: #ffd1d1;
  font-size: 12px;
  line-height: 1.45;
`;

const SubmitRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  padding-top: 4px;

  @media (min-width: 621px) {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
  }
`;

const SubmitHint = styled.p`
  margin: 0;
  color: ${colors.muted};
  font-size: 10px;
  line-height: 1.5;

  @media (min-width: 621px) {
    max-width: 360px;
  }
`;

const PrimaryButton = styled.button`
  width: 100%;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 15px;
  border: 1px solid rgba(243, 111, 33, 0.7);
  border-radius: 15px 0 15px 0;
  color: ${colors.bg};
  background: ${colors.accentGold};
  font-size: 13px;
  font-weight: 950;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(243, 111, 33, 0.18);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover:not(:disabled),
  &:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 16px 34px rgba(243, 111, 33, 0.24);
    outline: none;
  }

  &:disabled {
    opacity: 0.62;
    cursor: wait;
  }

  @media (min-width: 621px) {
    width: auto;
  }
`;

const WhatsAppButton = styled.a`
  width: 100%;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 15px;
  border-radius: 15px 0 15px 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: ${colors.text};
  background: rgba(255, 255, 255, 0.035);
  text-decoration: none;
  font-weight: 850;

  @media (min-width: 521px) {
    width: auto;
  }
`;

const SuccessPanel = styled.div`
  min-height: min(520px, calc(100dvh - 120px));
  display: grid;
  place-items: center;
  align-content: center;
  gap: 12px;
  padding: 34px 16px;
  text-align: center;
  border-radius: 18px 0 18px 0;
  background:
    radial-gradient(
      360px 220px at 50% 10%,
      rgba(243, 111, 33, 0.13),
      transparent 68%
    ),
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.04),
      rgba(255, 255, 255, 0.01)
    );

  @media (min-width: 641px) {
    min-height: 420px;
    padding: clamp(28px, 7vw, 64px) 20px;
    border-radius: 22px 0 22px 0;
  }
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border-radius: 22px 0 22px 0;
  color: ${colors.bg};
  background: ${colors.accentGold};
  box-shadow: 0 18px 42px rgba(243, 111, 33, 0.22);

  @media (min-width: 641px) {
    width: 72px;
    height: 72px;
    border-radius: 24px 0 24px 0;
  }
`;

const SuccessKicker = styled.div`
  color: ${colors.accentGold3};
  font-size: 9px;
  font-weight: 950;
  letter-spacing: 0.12em;
`;

const SuccessTitle = styled.h3`
  margin: 0;
  color: ${colors.text};
  font-size: clamp(24px, 7vw, 42px);
  line-height: 1.05;
  letter-spacing: -0.04em;
`;

const SuccessText = styled.p`
  margin: 0;
  max-width: 620px;
  color: ${colors.muted};
  font-size: 13px;
  line-height: 1.65;
`;

const SuccessActions = styled.div`
  width: min(100%, 520px);
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 8px;

  @media (min-width: 521px) {
    width: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 9px;
  }
`;

