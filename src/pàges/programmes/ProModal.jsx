import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import colors from "../../Styles/colors";

/**
 * Props :
 * - open: bool
 * - onClose: fn
 * - title: string
 * - children: ReactNode
 * - fullScreen?: bool
 * - maxWidth?: number
 * - labelledById?: string
 * - describedById?: string
 */
export default function ProModal({
  open,
  onClose,
  title = "",
  children,
  fullScreen = false,
  maxWidth = 920,
  labelledById = "modal-title",
  describedById = "modal-desc",
}) {
  const closeBtnRef = useRef(null);
  const contentRef = useRef(null);
  const lastActiveRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    lastActiveRef.current = document.activeElement;

    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
      contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
    }, 40);

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
      lastActiveRef.current?.focus?.();
    };
  }, [open, onClose]);

  const panelAni = fullScreen
    ? {
        initial: { opacity: 0, y: 10, filter: "blur(5px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: 8, transition: { duration: 0.16 } },
      }
    : {
        initial: { opacity: 0, y: 16, scale: 0.985, filter: "blur(5px)" },
        animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        exit: {
          opacity: 0,
          y: 10,
          scale: 0.985,
          transition: { duration: 0.16 },
        },
      };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <Overlay
            as={motion.button}
            type="button"
            aria-label="Fermer le modal"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          />

          <Wrapper
            $full={fullScreen}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledById}
            aria-describedby={describedById}
          >
            <Panel
              as={motion.div}
              $full={fullScreen}
              style={!fullScreen ? { maxWidth } : undefined}
              {...panelAni}
            >
              <Head $full={fullScreen}>
                <Title id={labelledById} title={title}>
                  {title}
                </Title>

                <CloseBtn
                  ref={closeBtnRef}
                  onClick={onClose}
                  aria-label="Fermer"
                  type="button"
                >
                  <X size={19} />
                </CloseBtn>
              </Head>

              <Content ref={contentRef} $full={fullScreen} id={describedById}>
                {children}
              </Content>
            </Panel>
          </Wrapper>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ============ styles ============ */
const Overlay = styled(motion.button)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(6, 10, 18, 0.58);
  backdrop-filter: blur(4px);
  border: 0;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1010;
  display: grid;
  align-items: ${(p) => (p.$full ? "stretch" : "center")};
  justify-items: center;
  padding: ${(p) => (p.$full ? "0" : "18px")};
`;

const Panel = styled.div`
  width: min(100%, 920px);
  max-height: min(92dvh, 980px);
  border-radius: 18px;
  border: 1px solid #1f2c44;
  background:
    linear-gradient(120deg, ${colors.bgSoft} 64%, ${colors.bg} 50%),
    linear-gradient(90deg, #0e1a2b, #0f223a);
  box-shadow: 0 30px 80px rgba(6, 10, 18, 0.55);
  overflow: hidden;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);

  ${(p) =>
    p.$full &&
    css`
      border-radius: 0;
      width: 100vw;
      height: 100dvh;
      max-width: none;
      max-height: none;
      border: 0;
      box-shadow: none;
    `}
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #0f223a;
  font-weight: 700;
  background: linear-gradient(
    120deg,
    ${colors.accentGold3} 64%,
    ${colors.bg} 50%
  );
  padding: 12px 14px;
  border-bottom: 1px solid #1f2c44;

  ${(p) =>
    p.$full &&
    css`
      position: sticky;
      top: 0;
      z-index: 5;
      padding-top: calc(12px + env(safe-area-inset-top, 0px));
    `}
`;

const Title = styled.h3`
  margin: 0;
  font-size: clamp(16px, 2.3vw, 20px);
  letter-spacing: 0.2px;
  line-height: 1.25;
`;

const CloseBtn = styled.button`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid #21304f;
  background: #0e1a2b;
  color: ${colors.accentGold};
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    background: #112745;
    border-color: ${colors.accentGold};
  }
`;

const Content = styled.div`
  min-height: 0;
  overflow: auto;
  padding: clamp(14px, 2.2vw, 22px);
  padding-bottom: max(92px, calc(env(safe-area-inset-bottom, 0px) + 28px));
  scrollbar-gutter: stable both-edges;
  overscroll-behavior: contain;
  scroll-behavior: smooth;

  ${(p) =>
    p.$full &&
    css`
      height: 100%;
    `}

  &::after {
    content: "";
    display: block;
    height: 2px;
  }
`;