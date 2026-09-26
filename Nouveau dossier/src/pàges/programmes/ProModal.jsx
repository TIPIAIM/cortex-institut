import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import colors from "../../Styles/colors";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ProModal({
  open,
  onClose,
  title = "",
  children,
  fullScreen = false,
  maxWidth = 980,
  labelledById = "modal-title",
  describedById = "modal-desc",
}) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const lastActiveRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open || typeof document === "undefined") return undefined;

    lastActiveRef.current = document.activeElement;
    const html = document.documentElement;
    const body = document.body;
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const timer = window.setTimeout(() => closeRef.current?.focus(), 30);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter(
        (node) =>
          !node.hasAttribute("disabled") &&
          node.getAttribute("aria-hidden") !== "true"
      );

      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPaddingRight;
      lastActiveRef.current?.focus?.();
    };
  }, [open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <Layer>
          <Overlay
            type="button"
            aria-label="Fermer la fenêtre"
            onClick={onClose}
            as={motion.button}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : .18 }}
          />

          <Wrapper $full={fullScreen}>
            <Panel
              ref={panelRef}
              $full={fullScreen}
              $maxWidth={maxWidth}
              as={motion.section}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? labelledById : undefined}
              aria-describedby={describedById}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 18, scale: fullScreen ? 1 : 0.985 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, y: 12, scale: fullScreen ? 1 : 0.985 }
              }
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <AccentLine aria-hidden="true" />

              <Header>
                <Title id={labelledById} title={title}>
                  {title}
                </Title>

                <Close
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Fermer"
                  as={motion.button}
                  whileHover={reduceMotion ? undefined : { rotate: 4, scale: 1.04 }}
                  whileTap={reduceMotion ? undefined : { scale: .92 }}
                >
                  <X size={20} />
                </Close>
              </Header>

              <Content id={describedById}>{children}</Content>
            </Panel>
          </Wrapper>
        </Layer>
      )}
    </AnimatePresence>,
    document.body
  );
}

const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
`;

const Overlay = styled.button`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  background: rgba(4, 9, 18, 0.76);
  backdrop-filter: blur(10px);
  cursor: default;
`;

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: ${({ $full }) => ($full ? "0" : "18px")};
  pointer-events: none;
`;

const Panel = styled.section`
  position: relative;
  pointer-events: auto;
  width: min(100%, ${({ $maxWidth }) => `${$maxWidth}px`});
  max-height: min(94dvh, 1040px);
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 26px 0 26px 0;
  background:
    radial-gradient(680px 360px at 100% 0%, rgba(243,111,33,.09), transparent 62%),
    linear-gradient(145deg, ${colors.bgSoft}, ${colors.bg});
  box-shadow: 0 38px 100px rgba(0,0,0,.58);

  ${({ $full }) =>
    $full &&
    css`
      width: 100vw;
      height: 100dvh;
      max-width: none;
      max-height: none;
      border: 0;
      border-radius: 0;
    `}
`;

const AccentLine = styled.div`
  position: absolute;
  z-index: 8;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  pointer-events: none;
  background: linear-gradient(90deg, ${colors.accentGold}, ${colors.accentGold3}, transparent 78%);
`;

const Header = styled.header`
  position: relative;
  z-index: 7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 66px;
  padding: 12px clamp(16px, 3vw, 28px);
  border-bottom: 1px solid rgba(255,255,255,.08);
  background: rgba(13,29,74,.86);
  backdrop-filter: blur(16px);
`;

const Title = styled.h2`
  margin: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.text};
  font-size: clamp(15px, 2vw, 20px);
  font-weight: 850;
`;

const Close = styled.button`
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px 0 14px 0;
  border: 1px solid rgba(243,111,33,.32);
  color: ${colors.accentGold};
  background: rgba(14,26,43,.92);
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid rgba(243,111,33,.2);
    outline-offset: 3px;
  }
`;

const Content = styled.div`
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  scroll-behavior: smooth;
`;
