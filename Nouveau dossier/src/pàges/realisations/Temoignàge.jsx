// src/components/home/TestimonialsWall.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import colors from "../../Styles/colors";
import { imagess } from "../../assets/imagess";

/* ------- Marquee ------- */
const scroll = keyframes`
  0% { transform: translateX(0); }
  100%{ transform: translateX(-50%); }
`;

const Section = styled.section`
  max-width:1200px; margin:0 auto;
  padding: clamp(24px,5vw,48px) 20px;
  display:grid; gap: clamp(16px,2vw,22px);
`;

const Header = styled.div`
  display:grid; gap:8px;
  h2{ margin:0; font-size:clamp(22px,4.4vw,34px); color:${colors.accentGold}; }
  p{ margin:0; color:${colors.accentGoldLight}; max-width:900px; }
`;

/* ------- Logos ------- */
const Rail = styled.div`
  position:relative; overflow:hidden; border:1px solid #1f2c44; border-radius:18px;
  background: linear-gradient(180deg, #0f223a, #112a48);
  .track{
    display:flex; gap:34px; padding:16px 22px;
    width:200%; animation: ${scroll} 22s linear infinite;
  }
  img{
    height:40px; width:auto; opacity:.9; filter: saturate(.9) contrast(1.05);
  }
`;

/* ------- Quotes Grid ------- */
const Grid = styled.div`
  display:grid; gap:14px;
  grid-template-columns: 1fr;
  @media(min-width:900px){ grid-template-columns: repeat(3, 1fr); }
`;

const Card = styled(motion.figure)`
  margin:0; display:grid; gap:12px; padding:16px;
  border:1px solid #1f2c44; border-radius:22px 0 22px 0;
  background: linear-gradient(180deg, #0e1a2b, #0f223a);
  color:${colors.text};
  blockquote{
    margin:0; position:relative; color:${colors.accentGoldLight}; line-height:1.6;
  }
  blockquote:before{
    content:""; position:absolute; left:-6px; top:-6px; width:22px; height:22px;
    background: radial-gradient(closest-side, ${colors.accentGold}55, transparent 70%);
    border-radius:50%; filter: blur(8px);
  }
  figcaption{
    display:flex; align-items:center; gap:10px;
    .avatar{
      width:44px; height:44px; border-radius:50%; overflow:hidden; border:1px solid #274066;
      background:#0b1729;
      img{ width:100%; height:100%; object-fit:cover; display:block; }
    }
    .meta{ display:grid; }
    b{ color:${colors.accentGold}; }
    small{ color:${colors.muted}; }
  }
  .stars{ display:flex; gap:2px; color:${colors.accentGold}; }
`;

const containerV = { initial:{}, animate:{ transition:{ staggerChildren:.08, delayChildren:.06 } } };
const itemV = {
  initial:{ opacity:0, y:16, scale:.985, filter:"blur(2px)" },
  animate:{ opacity:1, y:0, scale:1, filter:"blur(0px)", transition:{ duration:.5, ease:[.22,1,.36,1] } }
};

export default function TestimonialsWall({
  title = "Ils nous font confiance",
  lead  = "Partenaires institutionnels, entreprises et apprenants partagent leurs retours sur l’accompagnement CORTEX+.",
  partners = [
    imagess.logoCortex, imagess.logoCortex2, imagess.logoCortex, imagess.logoCortex2,
    imagess.logoCortex, imagess.logoCortex2, imagess.logoCortex, imagess.logoCortex2
  ],
  testimonials = [
    {
      text: "Un déploiement QHSE efficace, des livrables clairs et une équipe très disponible.",
      author: "M. Camara", role: "Directeur Ops, Groupe industriel", avatar: imagess.DirecteurduGroupe1, stars: 5
    },
    {
      text: "La pédagogie active nous a permis d’appliquer immédiatement les concepts au terrain.",
      author: "A. Diallo", role: "Responsable RH, Banque", avatar: imagess.ResponsableadministrativeetFinancière2, stars: 5
    },
    {
      text: "Notre programme SI a gagné en qualité et en sécurité. Excellent suivi.",
      author: "F. M. Diallo", role: "DSI, Services", avatar: imagess.Responsablecommercialegroupe2, stars: 5
    },
  ]
}){
  const track = [...partners, ...partners]; // duplication pour boucle infinie
  return (
    <Section>
      <Header>
        <h2>{title}</h2>
        <p>{lead}</p>
      </Header>

      {/* Logos partenaires */}
      <Rail aria-label="Logos des partenaires">
        <div className="track">
          {track.map((src, i)=>(
            <img key={i} src={src} alt={`Logo partenaire ${i+1}`} loading="lazy" decoding="async"/>
          ))}
        </div>
      </Rail>

      {/* Témoignages */}
      <motion.div variants={containerV} initial="initial" whileInView="animate" viewport={{ once:true, amount:.3 }}>
        <Grid>
          {testimonials.map((t, i)=>(
            <Card key={i} variants={itemV}>
              <div className="stars" aria-label={`${t.stars} étoiles`}>
                {Array.from({length: t.stars||5}).map((_,s)=><Star key={s} size={16} />)}
              </div>
              <blockquote>
                <Quote size={18} style={{marginRight:6, opacity:.7}}/>
                {t.text}
              </blockquote>
              <figcaption>
                <span className="avatar">
                  {t.avatar ? <img src={t.avatar} alt={t.author} loading="lazy" decoding="async"/> : null}
                </span>
                <div className="meta">
                  <b>{t.author}</b>
                  <small>{t.role}</small>
                </div>
              </figcaption>
            </Card>
          ))}
        </Grid>
      </motion.div>
    </Section>
  );
}
