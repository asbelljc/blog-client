import { css } from 'styled-components';

export default css`
  code[class*='language-'],
  pre[class*='language-'] {
    color: ${({ theme }) => theme.colors.prism.fontMain};
    background: none;
    text-shadow: 0 0.1rem rgba(0, 0, 0, 0.3);
    font-family: 'Roboto Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.35;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*='language-'] {
    padding: 1.4rem;
    margin: 0;
    overflow: auto;
    border-radius: 0 0 0.4rem 0.4rem;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: ${({ theme }) => theme.colors.prism.bg};
  }

  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: hsl(220, 14%, 62.5%);
  }

  .token.punctuation {
    color: ${({ theme }) => theme.colors.prism.fontMain};
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: ${({ theme }) => theme.colors.prism.highlight1};
  }

  .token.boolean,
  .token.number {
    color: ${({ theme }) => theme.colors.prism.highlight2};
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${({ theme }) => theme.colors.prism.highlight3};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: ${({ theme }) => theme.colors.prism.fontMain};
  }

  .token.atrule,
  .token.attr-value,
  .token.function,
  .token.class-name {
    color: ${({ theme }) => theme.colors.prism.highlight4};
  }

  .token.keyword {
    color: ${({ theme }) => theme.colors.prism.highlight5};
  }

  .token.regex,
  .token.important {
    color: ${({ theme }) => theme.colors.prism.highlight6};
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  pre[class*='language-'].line-numbers {
    position: relative;
    padding-left: 6rem;
    counter-reset: linenumber;
  }

  pre[class*='language-'].line-numbers > code {
    position: relative;
    white-space: inherit;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 0;
    font-size: 100%;
    left: -6rem;
    width: 4.5rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .line-numbers-rows > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: #999;
    display: block;
    padding-right: 1rem;
    text-align: right;
  }
`;
