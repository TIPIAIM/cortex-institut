import { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { imagess } from "../../assets/imagess.js";
import { filieres } from "./filieres.data.js";

/** Liens principaux (CORTEX) */
const navLinks = [
  { label: "Accueil", to: "/" },
  { label: "Programmes", to: "/programmes", mega: true },
  { label: "Partenaires", to: "/#partenaires", anchor: true },
  { label: "Catalogues", to: "/catalogues" },
  { label: "À propos", to: "/a-propos" },
  { label: "Contact", to: "/#contact", anchor: true },
];

export default function CortexMegaNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [openMega, setOpenMega] = useState(false);
  const navRef = useRef(null);

  // Ombre/blur au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloque le scroll quand le drawer mobile est ouvert
  useEffect(() => {
    document.documentElement.style.overflow = openMobile ? "hidden" : "";
    return () => (document.documentElement.style.overflow = "");
  }, [openMobile]);

  // Fermer méga-menu au clic extérieur
  useEffect(() => {
    if (!openMega) return;
    const onDown = (e) => {
      if (!navRef.current?.contains(e.target)) setOpenMega(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [openMega]);

  const ani = useMemo(
    () => ({
      mega: {
        hidden: { opacity: 0, y: 6, filter: "blur(4px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0)",
          transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
        },
        exit: {
          opacity: 0,
          y: 6,
          filter: "blur(2px)",
          transition: { duration: 0.12 },
        },
      },
      item: {
        hidden: { opacity: 0, y: 6 },
        show: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.025 * i,
            duration: 0.18,
            ease: [0.22, 1, 0.36, 1],
          },
        }),
      },
      overlay: {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      },
      drawer: {
        hidden: { x: "100%" },
        show: {
          x: 0,
          transition: { type: "spring", stiffness: 280, damping: 32 },
        },
        exit: { x: "100%", transition: { duration: 0.25 } },
      },
    }),
    []
  );

  return (
    <Topbar $scrolled={scrolled} ref={navRef}>
      <BarInner>
        <Brand to="/">
          <img
            src={imagess?.logoCortex2 || "/img/cortex-logo.png"}
            alt="Institut CORTEX"
            width="28"
            height="28"
          />
          <span>
            Institut <strong>CORTEX+</strong>
          </span>
        </Brand>

        {/* Desktop nav */}
        <NavDesktop onMouseLeave={() => setOpenMega(false)}>
          {navLinks.map((l) =>
            l.mega ? (
              <MegaTrigger
                key={l.label}
                onMouseEnter={() => setOpenMega(true)}
                onClick={() => setOpenMega((v) => !v)}
                aria-expanded={openMega}
                aria-haspopup="true"
              >
                {l.label}
                <ChevronDown size={16} />
                <Underline />
              </MegaTrigger>
            ) : l.anchor ? (
              <Anchor key={l.label} href={l.to}>
                {l.label}
                <Underline />
              </Anchor>
            ) : (
              <StyledNavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {l.label}
                <Underline />
              </StyledNavLink>
            )
          )}
          <Cta href="/inscription">S’inscrire</Cta>

          {/* Mega menu */}
          <AnimatePresence>
            {openMega && (
              <MegaWrap
                as={motion.div}
                role="menu"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={ani.mega}
                onMouseLeave={() => setOpenMega(false)}
              >
                <MegaGrid>
                  {filieres.map((f, colIdx) => (
                    <motion.div
                      key={f.slug}
                      custom={colIdx}
                      initial="hidden"
                      animate="show"
                      variants={ani.item}
                    >
                      <ColHead to={`/programme/${f.slug}`}>{f.title}</ColHead>
                      <ColList>
                        {f.programs.slice(0, 6).map((p, i) => (
                          <li key={i}>
                            <Link to={`/programme/${f.slug}`} className="item">
                              <span>{p}</span>
                              <ChevronRight size={16} />
                            </Link>
                          </li>
                        ))}
                      </ColList>
                    </motion.div>
                  ))}
                </MegaGrid>
                <MegaFoot>
                  <small>
                    Filières issues des catalogues CORTEX · Mises à jour.
                  </small>
                </MegaFoot>
              </MegaWrap>
            )}
          </AnimatePresence>
        </NavDesktop>

        {/* Burger mobile */}
        <Burger onClick={() => setOpenMobile(true)} aria-label="Ouvrir le menu">
          <Menu size={22} />
        </Burger>
      </BarInner>

      {/* Drawer mobile */}
      <AnimatePresence>
        {openMobile && (
          <>
            <Overlay
              as={motion.button}
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setOpenMobile(false)}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={ani.overlay}
            />
            <Drawer
              as={motion.aside}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={ani.drawer}
              aria-label="Menu mobile"
            >
              <DrawerHead>
                <div>
                  <img
                    src={imagess?.logoCortex2 || "/img/cortex-logo.png"}
                    alt=""
                    width="28"
                    height="28"
                  />
                  <b>CORTEX+</b>
                </div>
                <CloseBtn
                  onClick={() => setOpenMobile(false)}
                  aria-label="Fermer"
                >
                  <X size={22} />
                </CloseBtn>
              </DrawerHead>

              <DrawerList>
                {navLinks.map((l, idx) =>
                  l.mega ? (
                    <Accordion
                      key={l.label}
                      title="Programmes"
                      idxStart={idx}
                    />
                  ) : l.anchor ? (
                    <li key={l.label}>
                      <a
                        className="row"
                        href={l.to}
                        onClick={() => setOpenMobile(false)}
                      >
                        <span>{l.label}</span>
                        <ChevronRight size={18} />
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <NavLink
                        className="row"
                        to={l.to}
                        onClick={() => setOpenMobile(false)}
                      >
                        <span>{l.label}</span>
                        <ChevronRight size={18} />
                      </NavLink>
                    </li>
                  )
                )}
              </DrawerList>

              <DrawerFoot>
                <a href="/catalogues" className="ghost">
                  Voir les catalogues
                </a>
                <a href="/inscription" className="primary">
                  S’inscrire
                </a>
              </DrawerFoot>
            </Drawer>
          </>
        )}
      </AnimatePresence>
    </Topbar>
  );
}

/* ============ Mobile Accordion (Programmes) ============ */
function Accordion({ title, idxStart = 0 }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        className="row"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          size={18}
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: ".2s",
          }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <SubGrid>
              {filieres.map((f, i) => (
                <div className="col" key={f.slug}>
                  <div className="head">{f.title}</div>
                  <ul>
                    {f.programs.slice(0, 4).map((p, j) => (
                      <li key={j}>
                        <Link to={`/programme/${f.slug}`}>
                          <span>{p}</span>
                          <ChevronRight size={16} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </SubGrid>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ===================== Styles ===================== */
const Topbar = styled.header`
  position: sticky;
  top: 0;
  z-index: 60;
  backdrop-filter: blur(8px);
  background: linear-gradient(
      180deg,
      rgba(10, 16, 28, 0.78),
      rgba(10, 16, 28, 0.32)
    ),
    radial-gradient(900px 420px at 90% -20%, #2a4b7c40, transparent 60%);
  border-bottom: 1px solid #1f2c44;
  transition: box-shadow 0.25s ease, background 0.25s ease;
  ${({ $scrolled }) =>
    $scrolled &&
    css`
      box-shadow: 0 10px 30px rgba(10, 16, 28, 0.45);
      background: linear-gradient(
          180deg,
          rgba(10, 16, 28, 0.9),
          rgba(10, 16, 28, 0.6)
        ),
        radial-gradient(900px 420px at 90% -20%, #2a4b7c55, transparent 60%);
    `}
`;

const BarInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: 0.3px;
  span strong {
    color: #f2c94c;
  }
`;

const NavDesktop = styled.nav`
  display: none;
  gap: 12px;
  align-items: center;
  position: relative;
  @media (min-width: 992px) {
    display: flex;
  }
`;

const itemBase = css`
  position: relative;
  padding: 8px 10px;
  border-radius: 10px;
  opacity: 0.95;
  transition: background 0.2s ease, opacity 0.2s ease;
  &:hover {
    background: #0f223a;
    opacity: 1;
  }
`;

const StyledNavLink = styled(NavLink)`
  ${itemBase}
  &.active {
    color: #f2c94c;
  }
`;

const Anchor = styled.a`
  ${itemBase}
`;

const Underline = styled.i`
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 6px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #f2c94c, transparent);
  opacity: 0;
  transform: translateY(3px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  ${StyledNavLink}:hover &, ${Anchor}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MegaTrigger = styled.button`
  ${itemBase}
  display:flex;
  align-items: center;
  gap: 8px;
  color: inherit;
  background: none;
  border: 0;
  cursor: pointer;
  &:hover ${Underline} {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MegaWrap = styled(motion.div)`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #1f2c44;
  background: linear-gradient(180deg, #0e1a2b, #0f223a);
  box-shadow: 0 24px 60px rgba(6, 10, 18, 0.45);
`;

const MegaGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ColHead = styled(Link)`
  display: block;
  font-weight: 800;
  color: #f2c94c;
  margin: 4px 0 8px;
`;

const ColList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
  li .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 10px;
    color: #e8eef7;
    border: 1px solid transparent;
    background: linear-gradient(180deg, #0e1a2b, #0f223a);
    transition: border-color 0.15s ease, background 0.15s ease,
      transform 0.15s ease;
  }
  li .item:hover {
    border-color: #25406b;
    background: #0f223a;
    transform: translateX(2px);
  }
`;

const MegaFoot = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  small {
    color: #a8b3c7;
    opacity: 0.8;
  }
`;

const Burger = styled.button`
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid #1f2c44;
  border-radius: 10px;
  background: #0f223a;
  color: #f2c94c;
  @media (min-width: 992px) {
    display: none;
  }
`;

const Overlay = styled(motion.button)`
  position: fixed;
  inset: 0;
  background: rgba(6, 10, 18, 0.55);
  backdrop-filter: blur(2px);
  border: 0;
  cursor: pointer;
  z-index: 70;
`;

const Drawer = styled(motion.aside)`
  position: fixed;
  inset: 0 0 0 auto;
  width: min(86%, 360px);
  background: #0e1a2b;
  z-index: 80;
  border-left: 1px solid #1f2c44;
  display: grid;
  grid-template-rows: auto 1fr auto;
  box-shadow: -24px 0 48px rgba(6, 10, 18, 0.45);
`;

const DrawerHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
  border-bottom: 1px solid #1f2c44;
  background: #0f223a;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
  }
  div b {
    color: #f2c94c;
  }
`;
const CloseBtn = styled.button`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #21304f;
  background: #0e1a2b;
  color: #f2c94c;
`;

const DrawerList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px 10px;
  display: grid;
  gap: 6px;
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 12px;
    border-radius: 12px;
    color: #e8eef7;
    outline: none;
    border: 1px solid transparent;
    background: linear-gradient(180deg, #0e1a2b, #0f223a);
  }
  .row:hover {
    border-color: #25406b;
    background: #0f223a;
  }
`;

const DrawerFoot = styled.div`
  padding: 12px;
  display: grid;
  gap: 8px;
  border-top: 1px solid #1f2c44;
  background: #0f223a;
  a {
    text-align: center;
    padding: 12px 14px;
    border-radius: 12px;
    font-weight: 700;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .primary {
    background: #f2c94c;
    color: #0e1a2b;
    border: 1px solid #d9b642;
    box-shadow: 0 8px 22px rgba(242, 201, 76, 0.25);
  }
  .primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 26px rgba(242, 201, 76, 0.32);
  }
  .ghost {
    border: 1px solid #264066;
    color: #cfe0f1;
    background: #0e1a2b;
  }
  .ghost:hover {
    border-color: #2a4b7c;
  }
`;
