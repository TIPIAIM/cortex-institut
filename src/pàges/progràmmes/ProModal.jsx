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
 * - fullScreen?: bool (par défaut false) → si true, prend tout l’écran
 * - maxWidth?: number (utilisé si fullScreen === false)
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
  const lastActiveRef = useRef(null);

  // Body scroll lock + focus mgmt + ESC
  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement;
    document.documentElement.style.overflow = "hidden";
    const id = setTimeout(() => closeBtnRef.current?.focus(), 50);
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lastActiveRef.current && lastActiveRef.current.focus?.();
    };
  }, [open, onClose]);

  const panelAni = fullScreen
    ? {
        initial: { opacity: 0, y: 12, filter: "blur(6px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: 10, transition: { duration: 0.18 } },
      }
    : {
        initial: { opacity: 0, y: 18, scale: 0.98, filter: "blur(6px)" },
        animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        exit: {
          opacity: 0,
          y: 12,
          scale: 0.98,
          transition: { duration: 0.18 },
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
                <h3 id={labelledById} title={title}>
                  {title}
                </h3>
                <CloseBtn
                  ref={closeBtnRef}
                  onClick={onClose}
                  aria-label="Fermer"
                >
                  <X size={19} />
                </CloseBtn>
              </Head>

              {/* zone scrollable */}
              <Content $full={fullScreen} id={describedById}>
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
  
  background: rgba(6, 10, 18, 0.6);
  backdrop-filter: blur(3px);
  border: 0;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: fixed;
 
  inset: 0;
  z-index: 1010;
  display: grid;
  place-items: center;
`;

const Panel = styled.div`
  width: 100%;
  border-radius: 18px;
  border: 1px solid #1f2c44;
  background: linear-gradient(
    120deg,
    ${colors.bgSoft} 64%,
    ${colors.bg} 50%
  );,
    linear-gradient(90deg, #0e1a2b, #0f223a);
  box-shadow: 0 30px 80px rgba(6, 10, 18, 0.55);
  overflow: hidden;


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
      display: grid;
      grid-template-rows: auto 1fr;
    `}
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
color:#0f223a ;
 font-weight: 700;
 background: linear-gradient(
    120deg,
    ${colors.semygprimar} 64%,
    ${colors.bg} 50%
  );
  padding: 10px 12px;
  border-bottom: 1px solid #1f2c44;
 // background:#F2C94C ;
  h3 {
    margin: 0;
    font-size: clamp(16px, 2.4vw, 20px);
    letter-spacing: 0.2px;
  }
  ${(p) =>
    p.$full &&
    css`
      position: sticky;
      top: 0;
      z-index: 5;
    `}
`;

const CloseBtn = styled.button`
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50px;
  border: 1px solid #21304f;
  background: #0e1a2b;
  color: #f2c94c;
  transition: transform 0.15s ease, background 0.15s ease;
  &:hover {
    transform: translateY(-1px);
    background: #112745;
  }
`;

const Content = styled.div`
  ${(p) =>
    p.$full
      ? css`
          overflow: auto;
          padding: clamp(14px, 2.2vw, 22px);
          height: 100%;
        `
      : css`
          padding: clamp(14px, 2.2vw, 22px);
        `}
`;
