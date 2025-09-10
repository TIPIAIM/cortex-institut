// src/components/layout/HeaderPro.jsx
import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu as MenuIcon,
  X,
  ChevronDown,
  Phone,
  Mail,
} from "lucide-react";
import colors from "../../Styles/colors";

// --------- Config nav (modifie ici tes routes facilement) ----------
const NAV = [
  { label: "Accueil", to: "/" },
  { label: "Contact", to: "/contact" },
  {
    label: "Programmes",
    to: "/programmes",
  },
  { label: "À propos", to: "/apropos" },
];

// ---------------- Styled ----------------
const Shell = styled(motion.header)`
  position: sticky;
  top: 0;
  z-index: 60;
  backdrop-filter: saturate(140%) blur(8px);
  background: linear-gradient(
    180deg,
    ${colors.bg},
    ${colors.bgSoft}
  );
 // border-bottom: 1px solid #1f2c44;
`;

const Bar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(10px, 2.6vw, 14px) 20px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
`;

const Brand = styled(Link)`
  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 10px;
  text-decoration: none;

  .logo {
    width: 56px;
    height: 56px;
    border-radius: 10px;
    background: radial-gradient(
        120px 80px at 60% -20%,
        ${colors.bg}66,
        transparent 60%
      ),
      linear-gradient(140deg, $${colors.bg}, ${colors.bgSoft});
    //border: 1px solid #274066;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25), inset 0 0 0 1px #183055;
  }
  .name {
    display: grid;
    line-height: 1.05;
  }
  .title {
    color: ${colors.text};
    font-weight: 900;
    letter-spacing: 0.2px;
    font-size: clamp(16px, 2.4vw, 18px);
  }
  .tag {
    color: ${colors.accentGold};
    font-size: 12px;
    font-weight: 700;
    opacity: 0.9;
  }
`;

const DesktopNav = styled.nav`
  display: none;
  @media (min-width: 1024px) {
    display: flex;
  }
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const NavItem = styled.div`
  position: relative;
`;

const NavLinkA = styled(NavLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: ${colors.text};
  font-weight: 700;
  font-size: 14px;
  border: 1px solid transparent;

  &:hover {
    color: ${colors.accentGold};
    border-color: #21375a;
    background: linear-gradient(180deg, #0e1a2b, #0f223a);
  }

  &.active {
    color: ${colors.accentGold};
    background: linear-gradient(180deg, #0e1a2b, #0f223a);
    border-color: #21375a;
  }
`;

const Underline = styled(motion.span)`
  position: absolute;
  left: 10px;
  right: 10px;
  height: 2px;
  bottom: 6px;
  border-radius: 2px;
  background: ${colors.accentGold};
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 260px;
  //background: linear-gradient(180deg, #0f223a, #112a48);
  border: 1px solid #1f2c44;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
`;

const DropLink = styled(NavLink)`
  display: grid;
  
  grid-template-columns: auto 1fr;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
  color: ${colors.text};
  font-size: 14px;
  border: 1px solid transparent;

  &:hover {
    color: ${colors.accentGold};
    border-color: #21375a;
    background: #0e1a2b;
  }
`;

const Right = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  align-items: center;
  
`;

const GhostBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  color: ${colors.text};
  text-decoration: none;
  font-weight: 800;
  font-size: 14px;
  border: 1px solid #274066;
  &:hover {
    border-color: ${colors.semygsecondar};
    color: ${colors.accentGold};
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;

const CTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 14px 0 14px 0;
  text-decoration: none;
  font-weight: 900;
  font-size: 14px;
  background: ${colors.accentGold};
  color: #0e1a2b;
  border: 1px solid #d9b642;
  box-shadow: 0 10px 26px rgba(242, 201, 76, 0.25);
  &:hover {
    box-shadow: 0 12px 32px rgba(242, 201, 76, 0.35);
    transform: translateY(-1px);
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;

const Burger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid #274066;
  background: transparent;
  color: ${colors.text};
  @media (min-width: 1024px) {
    display: none;
  }
`;

const Sheet = styled(motion.aside)`
  position: fixed;
  inset: 0 0 0 auto;
  width: min(88vw, 360px);
  background: linear-gradient(180deg, #0f223a, #0e1a2b);
  border-left: 1px solid #1f2c44;
  z-index: 80;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const SheetHead = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;
  padding: 14px 14px;
  border-bottom: 1px solid #1f2c44;
`;
const SheetTitle = styled.div`
  font-weight: 900;
  color: ${colors.accentGold};
`;
const SheetClose = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #274066;
  background: transparent;
  color: ${colors.text};
`;

const SheetBody = styled.nav`
  padding: 10px;
  display: grid;
  gap: 6px;
  align-content: start;
      background: ${colors.bg};

`;
const MLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  text-decoration: none;
  color: ${colors.text};
  font-weight: 800;
  border: 1px solid #21375a;
  background: linear-gradient(180deg, #0e1a2b, #0f223a);
  &.active {
    color: ${colors.accentGold};
    border-color: #2a4b7c;
  }
`;

const MChild = styled(NavLink)`
  display: block;
  margin: 6px 0 0 12px;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
      background: ${colors.bgSoft};

  color: ${colors.accentGoldLight};
  border: 1px dashed #21375a;
  &:hover {
    color: ${colors.accentGold};
    border-style: solid;
  }
`;

const SheetFoot = styled.div`
  padding: 12px;
  border-top: 1px solid #1f2c44;
  display: grid;
      background: ${colors.bg};

  gap: 8px;
`;
const FootBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  padding: 12px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 900;
  border: 1px solid #274066;
  color: ${colors.text};
  &:hover {
    color: ${colors.accentGold};
    border-color: ${colors.semygsecondar};
  }
`;
const FootCTA = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  padding: 12px;
  border-radius: 14px 0 14px 0;
  text-decoration: none;
  font-weight: 900;
  background: ${colors.accentGold};
  color: #0e1a2b;
  border: 1px solid #d9b642;
`;

// ---------------- Component ----------------
export default function HeaderPro() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const sheetRef = useRef(null);
  const uid = useId();

  // Elevation on scroll
  const { scrollY } = useScroll();
  const [elev, setElev] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setElev(v > 8));

  // Close mobile on route change
  useEffect(() => {
    setOpen(false);
    setDropOpen(false);
  }, [pathname]);

  // Close sheet on Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Simple focus trap for sheet
  useEffect(() => {
    if (!open) return;
    const focusables = sheetRef.current?.querySelectorAll(
      'a,button,[tabindex]:not([tabindex="-1"])'
    );
    const first = focusables?.[0];
    const last = focusables?.[focusables.length - 1];
    const onTab = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onTab);
    first?.focus();
    return () => document.removeEventListener("keydown", onTab);
  }, [open]);

  const activeIndex = useMemo(() => {
    const i = NAV.findIndex(
      (n) => pathname === n.to || pathname.startsWith(n.to + "#")
    );
    return i === -1 ? null : i;
  }, [pathname]);

  return (
    <Shell
      initial={false}
      animate={
        elev
          ? { boxShadow: "0 6px 24px rgba(0,0,0,.22)" }
          : { boxShadow: "0 0 0 rgba(0,0,0,0)" }
      }
      transition={{ duration: 0.25 }}
      role="banner"
    >
      <Bar>
        {/* Brand */}
        <Brand to="/" aria-label="Institut CORTEX – Accueil">
          {/* --- Seule modification : intégration du logo du dossier /public --- */}
          <img
            src="/img/cortexlogoblànc.avif"
            alt="Institut CORTEX"
            className="logo"
            width="56"
            height="56"
            loading="eager"
            decoding="async"
          />
          <span className="name">
            <span className="title">Institut CORTEX</span>
            <span className="tag">Excellence utile, impact durable</span>
          </span>
        </Brand>

        {/* Desktop Nav */}
        <DesktopNav aria-label="Navigation principale">
          {NAV.map((item, idx) => {
            const hasChildren = !!item.children?.length;
            return (
              <NavItem
                key={item.to}
                onMouseEnter={() => hasChildren && setDropOpen(idx)}
                onMouseLeave={() => hasChildren && setDropOpen(false)}
              >
                <NavLinkA
                  to={item.to}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  aria-haspopup={hasChildren || undefined}
                  aria-expanded={(hasChildren && dropOpen === idx) || undefined}
                >
                  {item.label}
                  {hasChildren && <ChevronDown size={16} />}
                  {activeIndex === idx && (
                    <Underline layoutId="nav-underline" />
                  )}
                </NavLinkA>

                {/* Dropdown */}
                {hasChildren && (
                  <AnimatePresence>
                    {dropOpen === idx && (
                      <Dropdown
                        role="menu"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{
                          duration: 0.18,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {item.children.map((c) => (
                          <DropLink key={c.to} to={c.to} role="menuitem">
                            <span>{c.label}</span>
                          </DropLink>
                        ))}
                      </Dropdown>
                    )}
                  </AnimatePresence>
                )}
              </NavItem>
            );
          })}
        </DesktopNav>

        {/* Right actions */}
        <Right>
          <GhostBtn to="/contact" aria-label="Nous appeler">
            <Phone size={16} /> +224 623 21 19 74
          </GhostBtn>
          <GhostBtn to="mailto:contact@institut-cortex.com" aria-label="Nous écrire">
            <Mail size={16} /> contact@institut-cortex.com
          </GhostBtn>
         
          <Burger
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls={`mobile-menu-${uid}`}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <MenuIcon size={20} />}
          </Burger>
        </Right>
      </Bar>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <Sheet
            ref={sheetRef}
            id={`mobile-menu-${uid}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            aria-modal="true"
            role="dialog"
            aria-label="Menu mobile"
          >
            <SheetHead>
              <SheetTitle>Navigation</SheetTitle>
              <SheetClose
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
              >
                <X size={18} />
              </SheetClose>
            </SheetHead>

            <SheetBody>
              {NAV.map((item) => (
                <div key={item.to}>
                  <MLink to={item.to} end>
                    <span>{item.label}</span>
                    {item.children?.length ? <ChevronDown size={16} /> : null}
                  </MLink>
                  {item.children?.map((c) => (
                    <MChild key={c.to} to={c.to}>
                      {c.label}
                    </MChild>
                  ))}
                </div>
              ))}
            </SheetBody>

            <SheetFoot>
              <FootBtn to="/contact">
                <Mail size={16} /> contact@institut-cortex.com
              </FootBtn>
              <FootBtn to="/contact">
                <Phone size={16} /> +224 623 21 19 74
              </FootBtn>
              <FootCTA to="/catalogues">Catalogue</FootCTA>
            </SheetFoot>
          </Sheet>
        )}
      </AnimatePresence>
    </Shell>
  );
}
