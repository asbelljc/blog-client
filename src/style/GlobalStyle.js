import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    word-wrap: break-word;
    color: ${({ theme }) => theme.colors.black};
  }

  html {
    /* font-family: 'Jost', serif; */
    position: relative;
  }

  body { /* this all copied from create-react-app index.css defaults, subject to change */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }

  code { /* this all copied from create-react-app index.css defaults; subject to change */
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

  h1, h2 {
    line-height: 1;
  }
`;

export default GlobalStyle;
