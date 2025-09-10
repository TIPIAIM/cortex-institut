import { memo } from "react";
import styled from "styled-components";
import Marquee from "react-fast-marquee";
import colors from "../../Styles/colors";

/* Bande partenaires — défilement fluide, accessible */
const Wrap = styled.section`
  border-top: 1px solid #1f2c44;
  border-bottom: 1px solid #1f2c44;
  background: linear-gradient(180deg, ${colors.bg}, ${colors.bgSoft});
  color: ${colors.text};
`;
const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 0;
  display: grid;
  gap: 8px;
`;
const Title = styled.h3`
  margin: 0 20px 6px;
  font-size: 14px;
  letter-spacing: 0.15px;
  color: ${colors.muted};
`;
const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
  width: 140px;
  height: 54px;
  filter: grayscale(1) contrast(1.05) brightness(1);
  opacity: 0.85;
  transition: filter 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  &:hover {
    filter: grayscale(0);
    opacity: 1;
    transform: translateY(-1px);
  }
`;

function PartnersStrip({ title = "Ils nous font confiance", items = [] }) {
  if (!items?.length) return null;
  return (
    <Wrap aria-label="Nos partenaires">
      <Inner>
        <Title>{title}</Title>
        <Marquee gradient={false} pauseOnHover speed={32}>
          {items.map((p, i) => (
            <Logo key={i} href={p.url || "#"} target={p.url ? "_blank" : "_self"} rel="noreferrer">
              <img src={p.logo} alt={p.name} loading="lazy" decoding="async" />
            </Logo>
          ))}
        </Marquee>
      </Inner>
    </Wrap>
  );
}
export default memo(PartnersStrip);
