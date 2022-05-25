import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    word-wrap: break-word;
    color: ${({ theme }) => theme.colors.text};
    transition: ${({ theme }) => theme.themeTransition};
  }

  html {
    background: ${({ theme }) => theme.colors.body};
    font-size: 62.5%;
  }
  /* TODO: connect to Ubuntu, Roboto Mono, and Nunito Sans on Google Fonts */
  body { 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Nunito Sans', sans-serif;
  }

  code {
    font-family: 'Roboto Mono', monospace;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Ubuntu', sans-serif;
    line-height: 1;
  }

  h2 {
    font-size: 2.4rem;
  }

  h3 {
    font-size: 1.87rem;
  }

  h4 {
    font-size: 1.6rem;
  }

  h5 {
    font-size: 1.33rem;
  }

  h6 {
    font-size: 1.07rem;
  }

  /**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }
  
  /**
  * Show the overflow in IE.
  * 1. Show the overflow in Edge.
  */
  
  button,
  input { /* 1 */
    overflow: visible;
  }
  
  /**
  * Remove the inheritance of text transform in Edge, Firefox, and IE.
  * 1. Remove the inheritance of text transform in Firefox.
  */
  
  button,
  select { /* 1 */
    text-transform: none;
  }
  
  /**
  * Correct the inability to style clickable types in iOS and Safari.
  */
  
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }
`;

export default GlobalStyle;
