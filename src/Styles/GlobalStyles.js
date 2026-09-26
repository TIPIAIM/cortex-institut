import { createGlobalStyle } from "styled-components";
import colors from "./colors";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    color-scheme: dark;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
    background: ${colors.bg};
  }

  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    overflow-x: hidden;
    background:
      radial-gradient(900px 560px at 12% -8%, rgba(243, 111, 33, 0.07), transparent 62%),
      linear-gradient(180deg, ${colors.bg}, ${colors.bgSoft} 48%, ${colors.bg1});
    color: ${colors.text};
    font-family: inherit;
  }

  #root {
    min-height: 100vh;
  }

  img,
  svg,
  video,
  canvas {
    display: block;
    max-width: 100%;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  button,
  a,
  input,
  select,
  textarea {
    -webkit-tap-highlight-color: transparent;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    color: inherit;
  }

  ::selection {
    background: ${colors.accentGold};
    color: ${colors.bg};
  }

  :focus-visible {
    outline: 3px solid ${colors.focusRing};
    outline-offset: 3px;
  }

  html {
    scrollbar-color: ${colors.brandBlueMid} ${colors.bg};
    scrollbar-width: thin;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyle;
