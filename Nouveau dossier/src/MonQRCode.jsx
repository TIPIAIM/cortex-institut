import { useRef } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";
import { toPng } from "html-to-image";

// -------------------- Styles Premium -------------------------
const QRContainer = styled.div`
  position: relative;
  width: 260px;
  height: 260px;
  margin: 0 auto;
  background: linear-gradient(145deg, #f8fafc 0%, #e6f0ff 100%);
  border-radius: 28px;
   display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  backdrop-filter: blur(4px);
 // border: 1px solid rgba(255, 255, 255, 0.4);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.86) 0%,
      transparent 70%
    );
    animation: rotate 20s linear infinite;
    z-index: 0;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  transform: translate(-50%, -50%);
  border-radius: 16px;
   background: white;
  object-fit: contain;
  padding: 8px;
  border: 2px solid rgb(190, 113, 11);
  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 43, 91, 0.25);
  }
`;

const QRDecoration = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 28px;
  overflow: hidden;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    right: -10px;
    width: 80px;
    height: 80px;
    background: linear-gradient(45deg, #f2c94c20, transparent);
    border-radius: 50%;
  }
`;

const DownloadBtn = styled.button`
  margin: 2rem auto 0;
  display: block;
  padding: 14px 32px;
  background: linear-gradient(90deg, #002b5b 0%, #1a4d2e 100%);
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 16px;
  //box-shadow: 0 4px 20px rgba(0, 43, 91, 0.2),
  //  inset 0 1px 1px rgba(255, 255, 255, 0.2);
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.5s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(26, 77, 46, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const ScanText = styled.p`
  font-weight: 600;
  color: #002b5b;
  font-size: 1.15em;
  margin-top: 1.5rem;
  text-align: center;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, rgb(243, 140, 56), rgb(31, 26, 77));
    border-radius: 3px;
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 28px;
  box-shadow: 0 0 30px rgba(224, 103, 4, 0.86), 0 0 60px rgba(10, 4, 59, 0.1);
  pointer-events: none;
  z-index: -1;
`;

// -------------------- Composant Premium -------------------------
const MonQRCode = () => {
  const ref = useRef();

  const handleDownload = () => {
    toPng(ref.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "QRCode-Premium.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        alert("Erreur lors du téléchargement");
        console.error(err);
      });
  };

  return (
    <div style={{ textAlign: "center", padding: "3rem 0" }}>
      <div ref={ref}>
        <QRContainer>
          <GlowEffect />
          <QRDecoration />
          <QRCode
            value="https://institut-cortex.com"
            size={220}
            bgColor="transparent"
            fgColor="#002B5B"
            level="H"
            style={{
              width: "220px",
              height: "220px",
              position: "relative",
              zIndex: "1",
            }}
            eyeRadius={[
              { outer: [24, 24, 0, 24], inner: [16, 16, 0, 16] },
              { outer: [24, 24, 24, 0], inner: [16, 16, 16, 0] },
              { outer: [0, 24, 24, 24], inner: [0, 16, 16, 16] },
            ]}
          />
          <Logo src="/img/cortexlogoblànc.avif" alt="Logo Premium" />
        </QRContainer>
      </div>
      <ScanText>Scannez pour une expérience exclusive</ScanText>
      <DownloadBtn onClick={handleDownload}>Télécharger le QR Code</DownloadBtn>
    </div>
  );
};

export default MonQRCode;
