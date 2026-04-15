import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
  }

  html,
  body {
    background: rgb(0, 8, 15);
    overflow-x: hidden;
  }

  body {
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

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;