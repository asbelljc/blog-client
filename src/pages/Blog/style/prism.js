import { css } from 'styled-components';

// css`
//   code[class*='language-'],
//   pre[class*='language-'] {
//     color: ${({ theme }) => theme.colors.prism.fontMain};
//     background: none;
//     text-shadow: 0 0.1rem rgba(0, 0, 0, 0.3);
//     font-family: 'Roboto Mono', monospace;
//     text-align: left;
//     white-space: pre-wrap;
//     word-spacing: normal;
//     word-break: normal;
//     word-wrap: break-word;
//     line-height: 1.35;

//     -moz-tab-size: 4;
//     -o-tab-size: 4;
//     tab-size: 4;

//     -webkit-hyphens: none;
//     -moz-hyphens: none;
//     -ms-hyphens: none;
//     hyphens: none;
//   }

//   pre[class*='language-'] {
//     padding: 1.4rem;
//     margin: 0;
//     overflow: auto;
//     border-radius: 0.6rem;
//   }

// .blog-post-body-code-snippet-header
//   + .line-numbers
//   > pre[class*='language-'] {
//   border-radius: 0 0 0.6rem 0.6rem;
// }

//   :not(pre) > code[class*='language-'],
//   pre[class*='language-'] {
//     background: ${({ theme }) => theme.colors.prism.bg};
//   }

//   :not(pre) > code[class*='language-'] {
//     padding: 0.1em;
//     border-radius: 0.3em;
//     white-space: normal;
//   }

//   .token.comment,
//   .token.prolog,
//   .token.doctype,
//   .token.cdata {
//     color: hsl(220, 14%, 62.5%);
//   }

//   .token.punctuation {
//     color: ${({ theme }) => theme.colors.prism.fontMain};
//   }

//   .token.namespace {
//     opacity: 0.7;
//   }

//   .token.property,
//   .token.tag,
//   .token.constant,
//   .token.symbol,
//   .token.deleted {
//     color: ${({ theme }) => theme.colors.prism.highlight1};
//   }

//   .token.boolean,
//   .token.number {
//     color: ${({ theme }) => theme.colors.prism.highlight2};
//   }

//   .token.selector,
//   .token.attr-name,
//   .token.string,
//   .token.char,
//   .token.builtin,
//   .token.inserted {
//     color: ${({ theme }) => theme.colors.prism.highlight3};
//   }

//   .token.operator,
//   .token.entity,
//   .token.url,
//   .language-css .token.string,
//   .style .token.string,
//   .token.variable {
//     color: ${({ theme }) => theme.colors.prism.fontMain};
//   }

//   .token.atrule,
//   .token.attr-value,
//   .token.function,
//   .token.class-name {
//     color: ${({ theme }) => theme.colors.prism.highlight4};
//   }

//   .token.keyword {
//     color: ${({ theme }) => theme.colors.prism.highlight5};
//   }

//   .token.regex,
//   .token.important {
//     color: ${({ theme }) => theme.colors.prism.highlight6};
//   }

//   .token.important,
//   .token.bold {
//     font-weight: bold;
//   }

//   .token.italic {
//     font-style: italic;
//   }

//   .token.entity {
//     cursor: help;
//   }

//   pre[class*='language-'].line-numbers {
//     position: relative;
//     padding-left: 6rem;
//     counter-reset: linenumber;
//   }

//   pre[class*='language-'].line-numbers > code {
//     position: relative;
//     white-space: inherit;
//   }

//   .line-numbers .line-numbers-rows {
//     position: absolute;
//     pointer-events: none;
//     top: 0;
//     font-size: 100%;
//     left: -6rem;
//     width: 4.5rem;
//     -webkit-user-select: none;
//     -moz-user-select: none;
//     -ms-user-select: none;
//     user-select: none;
//   }

//   .line-numbers-rows > span {
//     pointer-events: none;
//     display: block;
//     counter-increment: linenumber;
//   }

//   .line-numbers-rows > span:before {
//     content: counter(linenumber);
//     color: #999;
//     display: block;
//     padding-right: 1rem;
//     text-align: right;
//   }
// `;

const prism = {
  light: css`
    code[class*='language-'],
    pre[class*='language-'] {
      color: hsl(230, 8%, 24%);
      font-family: 'Roboto Mono', monospace;
      direction: ltr;
      text-align: left;
      white-space: pre;
      word-wrap: normal;
      word-spacing: normal;
      word-break: normal;
      line-height: 1.5;
      -moz-tab-size: 2;
      -o-tab-size: 2;
      tab-size: 2;
      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
    }

    /* Selection */
    code[class*='language-']::-moz-selection,
    code[class*='language-'] *::-moz-selection,
    pre[class*='language-'] *::-moz-selection {
      background: hsl(0, 0%, 90%);
      color: inherit;
    }

    code[class*='language-']::selection,
    code[class*='language-'] *::selection,
    pre[class*='language-'] *::selection {
      background: hsl(0, 0%, 90%);
      color: inherit;
    }

    /* Code blocks */
    pre[class*='language-'] {
      position: relative;
      padding: 0 1.4rem 1.4rem;
      margin: 0;
      overflow: auto;
    }

    .blog-post-body-code-snippet {
      border-radius: 0.6rem;
      background: hsl(0, 0%, 94%);
      margin-bottom: 2.8rem;

      &.no-header {
        padding-top: 1.4rem;
      }
    }

    .blog-post-body-code-snippet-header {
      margin-bottom: 1.4rem;
    }

    .blog-post-body-code-snippet-header + pre[class*='language-'] {
      border-radius: 0 0 0.6rem 0.6rem;
    }

    /* Inline code */
    :not(pre) > code[class*='language-'] {
      padding: 0.2em 0.3em;
      border-radius: 0.3em;
      white-space: normal;
    }

    .token.comment,
    .token.prolog,
    .token.cdata {
      color: hsl(230, 4%, 64%);
    }

    .token.doctype,
    .token.punctuation,
    .token.entity {
      color: hsl(230, 8%, 24%);
    }

    .token.attr-name,
    .token.class-name,
    .token.boolean,
    .token.constant,
    .token.number,
    .token.atrule {
      color: hsl(35, 99%, 36%);
    }

    .token.keyword {
      color: hsl(301, 63%, 40%);
    }

    .token.property,
    .token.tag,
    .token.symbol,
    .token.deleted,
    .token.important {
      color: hsl(5, 74%, 59%);
    }

    .token.selector,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted,
    .token.regex,
    .token.attr-value,
    .token.attr-value > .token.punctuation {
      color: hsl(119, 34%, 47%);
    }

    .token.variable,
    .token.operator,
    .token.function {
      color: hsl(221, 87%, 60%);
    }

    .token.url {
      color: hsl(198, 99%, 37%);
    }

    /* HTML overrides */
    .token.attr-value > .token.punctuation.attr-equals,
    .token.special-attr > .token.attr-value > .token.value.css {
      color: hsl(230, 8%, 24%);
    }

    /* CSS overrides */
    .language-css .token.selector {
      color: hsl(5, 74%, 59%);
    }

    .language-css .token.property {
      color: hsl(230, 8%, 24%);
    }

    .language-css .token.function,
    .language-css .token.url > .token.function {
      color: hsl(198, 99%, 37%);
    }

    .language-css .token.url > .token.string.url {
      color: hsl(119, 34%, 47%);
    }

    .language-css .token.important,
    .language-css .token.atrule .token.rule {
      color: hsl(301, 63%, 40%);
    }

    /* JS overrides */
    .language-javascript .token.operator {
      color: hsl(301, 63%, 40%);
    }

    .language-javascript
      .token.template-string
      > .token.interpolation
      > .token.interpolation-punctuation.punctuation {
      color: hsl(344, 84%, 43%);
    }

    /* JSON overrides */
    .language-json .token.operator {
      color: hsl(230, 8%, 24%);
    }

    .language-json .token.null.keyword {
      color: hsl(35, 99%, 36%);
    }

    /* MD overrides */
    .language-markdown .token.url,
    .language-markdown .token.url > .token.operator,
    .language-markdown .token.url-reference.url > .token.string {
      color: hsl(230, 8%, 24%);
    }

    .language-markdown .token.url > .token.content {
      color: hsl(221, 87%, 60%);
    }

    .language-markdown .token.url > .token.url,
    .language-markdown .token.url-reference.url {
      color: hsl(198, 99%, 37%);
    }

    .language-markdown .token.blockquote.punctuation,
    .language-markdown .token.hr.punctuation {
      color: hsl(230, 4%, 64%);
      font-style: italic;
    }

    .language-markdown .token.code-snippet {
      color: hsl(119, 34%, 47%);
    }

    .language-markdown .token.bold .token.content {
      color: hsl(35, 99%, 36%);
    }

    .language-markdown .token.italic .token.content {
      color: hsl(301, 63%, 40%);
    }

    .language-markdown .token.strike .token.content,
    .language-markdown .token.strike .token.punctuation,
    .language-markdown .token.list.punctuation,
    .language-markdown .token.title.important > .token.punctuation {
      color: hsl(5, 74%, 59%);
    }

    /* General */
    .token.bold {
      font-weight: bold;
    }

    .token.comment,
    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    .token.namespace {
      opacity: 0.8;
    }

    /* Plugin overrides */
    /* Selectors should have higher specificity than those in the plugins' default stylesheets */

    /* Show Invisibles plugin overrides */
    .token.token.tab:not(:empty):before,
    .token.token.cr:before,
    .token.token.lf:before,
    .token.token.space:before {
      color: hsla(230, 8%, 24%, 0.2);
    }

    /* Toolbar plugin overrides */
    /* Space out all buttons and move them away from the right edge of the code block */
    div.code-toolbar > .toolbar.toolbar > .toolbar-item {
      margin-right: 0.4em;
    }

    /* Styling the buttons */
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > button,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > a,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > span {
      background: hsl(0, 0%, 90%);
      color: hsl(230, 6%, 44%);
      padding: 0.1em 0.4em;
      border-radius: 0.3em;
    }

    div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus {
      background: hsl(0, 0%, 78%); /* custom: darken(--syntax-bg, 20%) */
      color: hsl(230, 8%, 24%);
    }

    /* Line Highlight plugin overrides */
    /* The highlighted line itself */
    .line-highlight.line-highlight {
      position: absolute;
      left: 0;
      background: hsla(0, 0%, 24%, 0.05);
    }

    /* Default line numbers in Line Highlight plugin */
    .line-highlight.line-highlight:before,
    .line-highlight.line-highlight[data-end]:after {
      background: hsl(0, 0%, 90%);
      color: hsl(230, 8%, 24%);
      padding: 0.1em 0.6em;
      border-radius: 0.3em;
      box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2); /* same as Toolbar plugin default */
    }

    /* Hovering over a linkable line number (in the gutter area) */
    /* Requires Line Numbers plugin as well */
    pre[id].linkable-line-numbers.linkable-line-numbers
      span.line-numbers-rows
      > span:hover:before {
      background-color: hsla(0, 0%, 24%, 0.05);
    }

    /* Line Numbers and Command Line plugins overrides */
    /* Line separating gutter from coding area */
    .line-numbers.line-numbers .line-numbers-rows,
    .command-line .command-line-prompt {
      border-right-color: hsla(230, 8%, 24%, 0.2);
    }

    /* Stuff in the gutter */
    .line-numbers .line-numbers-rows > span:before,
    .command-line .command-line-prompt > span:before {
      color: hsl(230, 1%, 62%);
    }

    /* Match Braces plugin overrides */
    /* Note: Outline colour is inherited from the braces */
    .rainbow-braces .token.token.punctuation.brace-level-1,
    .rainbow-braces .token.token.punctuation.brace-level-5,
    .rainbow-braces .token.token.punctuation.brace-level-9 {
      color: hsl(5, 74%, 59%);
    }

    .rainbow-braces .token.token.punctuation.brace-level-2,
    .rainbow-braces .token.token.punctuation.brace-level-6,
    .rainbow-braces .token.token.punctuation.brace-level-10 {
      color: hsl(119, 34%, 47%);
    }

    .rainbow-braces .token.token.punctuation.brace-level-3,
    .rainbow-braces .token.token.punctuation.brace-level-7,
    .rainbow-braces .token.token.punctuation.brace-level-11 {
      color: hsl(221, 87%, 60%);
    }

    .rainbow-braces .token.token.punctuation.brace-level-4,
    .rainbow-braces .token.token.punctuation.brace-level-8,
    .rainbow-braces .token.token.punctuation.brace-level-12 {
      color: hsl(301, 63%, 40%);
    }

    /* Diff Highlight plugin overrides */
    /* Taken from https://github.com/atom/github/blob/master/styles/variables.less */
    pre.diff-highlight > code .token.token.deleted:not(.prefix),
    pre > code.diff-highlight .token.token.deleted:not(.prefix) {
      background-color: hsla(353, 100%, 66%, 0.15);
    }

    pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection,
    pre.diff-highlight
      > code
      .token.token.deleted:not(.prefix)
      *::-moz-selection,
    pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection,
    pre
      > code.diff-highlight
      .token.token.deleted:not(.prefix)
      *::-moz-selection {
      background-color: hsla(353, 95%, 66%, 0.25);
    }

    pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection,
    pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection,
    pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection,
    pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection {
      background-color: hsla(353, 95%, 66%, 0.25);
    }

    pre.diff-highlight > code .token.token.inserted:not(.prefix),
    pre > code.diff-highlight .token.token.inserted:not(.prefix) {
      background-color: hsla(137, 100%, 55%, 0.15);
    }

    pre.diff-highlight
      > code
      .token.token.inserted:not(.prefix)::-moz-selection,
    pre.diff-highlight
      > code
      .token.token.inserted:not(.prefix)
      *::-moz-selection,
    pre
      > code.diff-highlight
      .token.token.inserted:not(.prefix)::-moz-selection,
    pre
      > code.diff-highlight
      .token.token.inserted:not(.prefix)
      *::-moz-selection {
      background-color: hsla(135, 73%, 55%, 0.25);
    }

    pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection,
    pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection,
    pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection,
    pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection {
      background-color: hsla(135, 73%, 55%, 0.25);
    }

    /* Previewers plugin overrides */
    /* Based on https://github.com/atom-community/atom-ide-datatip/blob/master/styles/atom-ide-datatips.less and https://github.com/atom/atom/blob/master/packages/one-light-ui */
    /* Border around popup */
    .prism-previewer.prism-previewer:before,
    .prism-previewer-gradient.prism-previewer-gradient div {
      border-color: hsl(0, 0, 95%);
    }

    /* Angle and time should remain as circles and are hence not included */
    .prism-previewer-color.prism-previewer-color:before,
    .prism-previewer-gradient.prism-previewer-gradient div,
    .prism-previewer-easing.prism-previewer-easing:before {
      border-radius: 0.3em;
    }

    /* Triangles pointing to the code */
    .prism-previewer.prism-previewer:after {
      border-top-color: hsl(0, 0, 95%);
    }

    .prism-previewer-flipped.prism-previewer-flipped.after {
      border-bottom-color: hsl(0, 0, 95%);
    }

    /* Background colour within the popup */
    .prism-previewer-angle.prism-previewer-angle:before,
    .prism-previewer-time.prism-previewer-time:before,
    .prism-previewer-easing.prism-previewer-easing {
      background: hsl(0, 0%, 100%);
    }

    /* For angle, this is the positive area (eg. 90deg will display one quadrant in this colour) */
    /* For time, this is the alternate colour */
    .prism-previewer-angle.prism-previewer-angle circle,
    .prism-previewer-time.prism-previewer-time circle {
      stroke: hsl(230, 8%, 24%);
      stroke-opacity: 1;
    }

    /* Stroke colours of the handle, direction point, and vector itself */
    .prism-previewer-easing.prism-previewer-easing circle,
    .prism-previewer-easing.prism-previewer-easing path,
    .prism-previewer-easing.prism-previewer-easing line {
      stroke: hsl(230, 8%, 24%);
    }

    /* Fill colour of the handle */
    .prism-previewer-easing.prism-previewer-easing circle {
      fill: transparent;
    }
  `,
  dark: css`
    code[class*='language-'],
    pre[class*='language-'] {
      color: hsl(220, 14%, 71%);
      text-shadow: 0 1px rgba(0, 0, 0, 0.3);
      font-family: 'Roboto Mono', monospace;
      direction: ltr;
      text-align: left;
      white-space: pre;
      word-wrap: normal;
      word-spacing: normal;
      word-break: normal;
      line-height: 1.5;
      -moz-tab-size: 2;
      -o-tab-size: 2;
      tab-size: 2;
      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
    }

    /* Selection */
    code[class*='language-']::-moz-selection,
    code[class*='language-'] *::-moz-selection,
    pre[class*='language-'] *::-moz-selection {
      background: hsl(0, 0%, 28%);
      color: inherit;
      text-shadow: none;
    }

    code[class*='language-']::selection,
    code[class*='language-'] *::selection,
    pre[class*='language-'] *::selection {
      background: hsl(0, 0%, 28%);
      color: inherit;
      text-shadow: none;
    }

    /* Code blocks */
    pre[class*='language-'] {
      position: relative;
      padding: 0 1.4rem 1.4rem;
      overflow: auto;
      border-radius: 0.6rem;
    }

    .blog-post-body-code-snippet {
      border-radius: 0.6rem;
      background: hsl(0, 0%, 14%);
      margin-bottom: 2.8rem;

      &.no-header {
        padding-top: 1.4rem;
      }
    }

    .blog-post-body-code-snippet-header {
      margin-bottom: 1.4rem;
    }

    .blog-post-body-code-snippet-header + pre[class*='language-'] {
      border-radius: 0 0 0.6rem 0.6rem;
    }

    /* Inline code */
    :not(pre) > code[class*='language-'] {
      padding: 0.2em 0.3em;
      border-radius: 0.3em;
      white-space: normal;
    }

    /* Print */
    @media print {
      code[class*='language-'],
      pre[class*='language-'] {
        text-shadow: none;
      }
    }

    .token.comment,
    .token.prolog,
    .token.cdata {
      color: hsl(220, 10%, 40%);
    }

    .token.doctype,
    .token.punctuation,
    .token.entity {
      color: hsl(220, 14%, 71%);
    }

    .token.attr-name,
    .token.class-name,
    .token.boolean,
    .token.constant,
    .token.number,
    .token.atrule {
      color: hsl(29, 54%, 61%);
    }

    .token.keyword {
      color: hsl(286, 60%, 67%);
    }

    .token.property,
    .token.tag,
    .token.symbol,
    .token.deleted,
    .token.important {
      color: hsl(355, 65%, 65%);
    }

    .token.selector,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted,
    .token.regex,
    .token.attr-value,
    .token.attr-value > .token.punctuation {
      color: hsl(95, 38%, 62%);
    }

    .token.variable,
    .token.operator,
    .token.function {
      color: hsl(207, 82%, 66%);
    }

    .token.url {
      color: hsl(187, 47%, 55%);
    }

    /* HTML overrides */
    .token.attr-value > .token.punctuation.attr-equals,
    .token.special-attr > .token.attr-value > .token.value.css {
      color: hsl(220, 14%, 71%);
    }

    /* CSS overrides */
    .language-css .token.selector {
      color: hsl(355, 65%, 65%);
    }

    .language-css .token.property {
      color: hsl(220, 14%, 71%);
    }

    .language-css .token.function,
    .language-css .token.url > .token.function {
      color: hsl(187, 47%, 55%);
    }

    .language-css .token.url > .token.string.url {
      color: hsl(95, 38%, 62%);
    }

    .language-css .token.important,
    .language-css .token.atrule .token.rule {
      color: hsl(286, 60%, 67%);
    }

    /* JS overrides */
    .language-javascript .token.operator {
      color: hsl(286, 60%, 67%);
    }

    .language-javascript
      .token.template-string
      > .token.interpolation
      > .token.interpolation-punctuation.punctuation {
      color: hsl(5, 48%, 51%);
    }

    /* JSON overrides */
    .language-json .token.operator {
      color: hsl(220, 14%, 71%);
    }

    .language-json .token.null.keyword {
      color: hsl(29, 54%, 61%);
    }

    /* MD overrides */
    .language-markdown .token.url,
    .language-markdown .token.url > .token.operator,
    .language-markdown .token.url-reference.url > .token.string {
      color: hsl(220, 14%, 71%);
    }

    .language-markdown .token.url > .token.content {
      color: hsl(207, 82%, 66%);
    }

    .language-markdown .token.url > .token.url,
    .language-markdown .token.url-reference.url {
      color: hsl(187, 47%, 55%);
    }

    .language-markdown .token.blockquote.punctuation,
    .language-markdown .token.hr.punctuation {
      color: hsl(220, 10%, 40%);
      font-style: italic;
    }

    .language-markdown .token.code-snippet {
      color: hsl(95, 38%, 62%);
    }

    .language-markdown .token.bold .token.content {
      color: hsl(29, 54%, 61%);
    }

    .language-markdown .token.italic .token.content {
      color: hsl(286, 60%, 67%);
    }

    .language-markdown .token.strike .token.content,
    .language-markdown .token.strike .token.punctuation,
    .language-markdown .token.list.punctuation,
    .language-markdown .token.title.important > .token.punctuation {
      color: hsl(355, 65%, 65%);
    }

    /* General */
    .token.bold {
      font-weight: bold;
    }

    .token.comment,
    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    .token.namespace {
      opacity: 0.8;
    }

    /* Plugin overrides */
    /* Selectors should have higher specificity than those in the plugins' default stylesheets */

    /* Show Invisibles plugin overrides */
    .token.token.tab:not(:empty):before,
    .token.token.cr:before,
    .token.token.lf:before,
    .token.token.space:before {
      color: hsla(220, 14%, 71%, 0.15);
      text-shadow: none;
    }

    /* Toolbar plugin overrides */
    /* Space out all buttons and move them away from the right edge of the code block */
    div.code-toolbar > .toolbar.toolbar > .toolbar-item {
      margin-right: 0.4em;
    }

    /* Styling the buttons */
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > button,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > a,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > span {
      background: hsl(0, 0%, 26%);
      color: hsl(220, 9%, 55%);
      padding: 0.1em 0.4em;
      border-radius: 0.3em;
    }

    div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover,
    div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus {
      background: hsl(0, 0%, 28%);
      color: hsl(220, 14%, 71%);
    }

    /* Line Highlight plugin overrides */
    /* The highlighted line itself */
    .line-highlight.line-highlight {
      left: 0;
      position: absolute;
      background: hsla(0, 0%, 80%, 0.04);
    }

    /* Default line numbers in Line Highlight plugin */
    .line-highlight.line-highlight:before,
    .line-highlight.line-highlight[data-end]:after {
      background: hsl(0, 0%, 26%);
      color: hsl(220, 14%, 71%);
      padding: 0.1em 0.6em;
      border-radius: 0.3em;
      box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2); /* same as Toolbar plugin default */
    }

    /* Hovering over a linkable line number (in the gutter area) */
    /* Requires Line Numbers plugin as well */
    pre[id].linkable-line-numbers.linkable-line-numbers
      span.line-numbers-rows
      > span:hover:before {
      background-color: hsla(0, 0%, 80%, 0.04);
    }

    /* Line Numbers and Command Line plugins overrides */
    /* Line separating gutter from coding area */
    .line-numbers.line-numbers .line-numbers-rows,
    .command-line .command-line-prompt {
      border-right-color: hsla(220, 14%, 71%, 0.15);
    }

    /* Stuff in the gutter */
    .line-numbers .line-numbers-rows > span:before,
    .command-line .command-line-prompt > span:before {
      color: hsl(220, 14%, 45%);
    }

    /* Match Braces plugin overrides */
    /* Note: Outline colour is inherited from the braces */
    .rainbow-braces .token.token.punctuation.brace-level-1,
    .rainbow-braces .token.token.punctuation.brace-level-5,
    .rainbow-braces .token.token.punctuation.brace-level-9 {
      color: hsl(355, 65%, 65%);
    }

    .rainbow-braces .token.token.punctuation.brace-level-2,
    .rainbow-braces .token.token.punctuation.brace-level-6,
    .rainbow-braces .token.token.punctuation.brace-level-10 {
      color: hsl(95, 38%, 62%);
    }

    .rainbow-braces .token.token.punctuation.brace-level-3,
    .rainbow-braces .token.token.punctuation.brace-level-7,
    .rainbow-braces .token.token.punctuation.brace-level-11 {
      color: hsl(207, 82%, 66%);
    }

    .rainbow-braces .token.token.punctuation.brace-level-4,
    .rainbow-braces .token.token.punctuation.brace-level-8,
    .rainbow-braces .token.token.punctuation.brace-level-12 {
      color: hsl(286, 60%, 67%);
    }

    /* Diff Highlight plugin overrides */
    /* Taken from https://github.com/atom/github/blob/master/styles/variables.less */
    pre.diff-highlight > code .token.token.deleted:not(.prefix),
    pre > code.diff-highlight .token.token.deleted:not(.prefix) {
      background-color: hsla(353, 100%, 66%, 0.15);
    }

    pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection,
    pre.diff-highlight
      > code
      .token.token.deleted:not(.prefix)
      *::-moz-selection,
    pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection,
    pre
      > code.diff-highlight
      .token.token.deleted:not(.prefix)
      *::-moz-selection {
      background-color: hsla(353, 95%, 66%, 0.25);
    }

    pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection,
    pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection,
    pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection,
    pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection {
      background-color: hsla(353, 95%, 66%, 0.25);
    }

    pre.diff-highlight > code .token.token.inserted:not(.prefix),
    pre > code.diff-highlight .token.token.inserted:not(.prefix) {
      background-color: hsla(137, 100%, 55%, 0.15);
    }

    pre.diff-highlight
      > code
      .token.token.inserted:not(.prefix)::-moz-selection,
    pre.diff-highlight
      > code
      .token.token.inserted:not(.prefix)
      *::-moz-selection,
    pre
      > code.diff-highlight
      .token.token.inserted:not(.prefix)::-moz-selection,
    pre
      > code.diff-highlight
      .token.token.inserted:not(.prefix)
      *::-moz-selection {
      background-color: hsla(135, 73%, 55%, 0.25);
    }

    pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection,
    pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection,
    pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection,
    pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection {
      background-color: hsla(135, 73%, 55%, 0.25);
    }

    /* Previewers plugin overrides */
    /* Based on https://github.com/atom-community/atom-ide-datatip/blob/master/styles/atom-ide-datatips.less and https://github.com/atom/atom/blob/master/packages/one-dark-ui */
    /* Border around popup */
    .prism-previewer.prism-previewer:before,
    .prism-previewer-gradient.prism-previewer-gradient div {
      border-color: hsl(224, 13%, 17%);
    }

    /* Angle and time should remain as circles and are hence not included */
    .prism-previewer-color.prism-previewer-color:before,
    .prism-previewer-gradient.prism-previewer-gradient div,
    .prism-previewer-easing.prism-previewer-easing:before {
      border-radius: 0.3em;
    }

    /* Triangles pointing to the code */
    .prism-previewer.prism-previewer:after {
      border-top-color: hsl(224, 13%, 17%);
    }

    .prism-previewer-flipped.prism-previewer-flipped.after {
      border-bottom-color: hsl(224, 13%, 17%);
    }

    /* Background colour within the popup */
    .prism-previewer-angle.prism-previewer-angle:before,
    .prism-previewer-time.prism-previewer-time:before,
    .prism-previewer-easing.prism-previewer-easing {
      background: hsl(0, 0%, 22%);
    }

    /* For angle, this is the positive area (eg. 90deg will display one quadrant in this colour) */
    /* For time, this is the alternate colour */
    .prism-previewer-angle.prism-previewer-angle circle,
    .prism-previewer-time.prism-previewer-time circle {
      stroke: hsl(220, 14%, 71%);
      stroke-opacity: 1;
    }

    /* Stroke colours of the handle, direction point, and vector itself */
    .prism-previewer-easing.prism-previewer-easing circle,
    .prism-previewer-easing.prism-previewer-easing path,
    .prism-previewer-easing.prism-previewer-easing line {
      stroke: hsl(220, 14%, 71%);
    }

    /* Fill colour of the handle */
    .prism-previewer-easing.prism-previewer-easing circle {
      fill: transparent;
    }
  `,
};

export default prism;
