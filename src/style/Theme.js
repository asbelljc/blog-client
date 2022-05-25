const timeouts = {
  toggleMenu: 250,
  showWelcome: 6000,
};

const headerHeight = (screen) => (screen === 'narrow' ? '6rem' : '8rem');

const contentWidth = (screen) =>
  screen === 'wide' ? 'min(80%, 1000px)' : '90%';

const greetingFontSize = (screen) =>
  screen === 'narrow' ? '2.8rem' : screen === 'medium' ? '3.6rem' : '4.8rem';

const themeTransition =
  'color 250ms linear, background 250ms linear, box-shadow 250ms linear';

export const lightTheme = {
  light: true,
  colors: {
    text: 'rgb(50, 50, 50)',
    body: 'rgb(255, 255, 255)',
    error: 'rgb(195, 0, 0)',
    preHeader: '#777',
    preHeaderBg: 'rgb(220, 220, 220)',
    prism: {
      bg: 'rgb(240, 240, 240)',
      fontMain: 'hsl(230, 8%, 24%)',
      highlight1: 'hsl(5, 74%, 59%)',
      highlight2: 'hsl(35, 99%, 36%)',
      highlight3: 'hsl(119, 34%, 47%)',
      highlight4: 'hsl(35, 99%, 40%)',
      highlight5: 'hsl(301, 63%, 40%)',
      highlight6: 'hsl(198, 99%, 37%)',
    },
    primary: 'rgb(60, 135, 225)',
    primaryGlow: 'rgb(80, 155, 245)',
    primaryTint: 'rgba(60, 135, 225, 0.15)',
    primaryTintHeavy: 'rgba(60, 135, 225, 0.25)',
    inactive: 'rgb(150, 150, 150)',
    error: 'rgb(255, 60, 70)',
  },
  headerShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.2)',
  headerHeight,
  contentWidth,
  greetingFontSize,
  timeouts,
  themeTransition,
};

export const darkTheme = {
  dark: true,
  colors: {
    text: 'rgb(255, 255, 255)',
    body: 'rgb(50, 50, 50)',
    error: 'rgb(195, 0, 0)',
    preHeader: '#999',
    preHeaderBg: 'rgb(30, 30, 30)',
    prism: {
      bg: 'rgb(40, 40, 40)',
      fontMain: 'hsl(220, 14%, 90%)',
      highlight1: 'hsl(5, 48%, 51%)',
      highlight2: 'hsl(29, 54%, 61%)',
      highlight3: 'hsl(95, 55%, 68%)',
      highlight4: '#e6db74',
      highlight5: 'hsl(207, 82%, 66%)',
      highlight6: 'hsl(29, 54%, 61%)',
    },
    primary: 'rgb(10, 190, 255)',
    primaryGlow: 'rgb(30, 210, 255)',
    primaryTint: 'rgba(10, 190, 255, 0.15)',
    primaryTintHeavy: 'rgba(10, 190, 255, 0.25)',
    inactive: 'rgb(150, 150, 150)',
    error: 'rgb(255, 60, 70)',
  },
  headerShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.3)',
  headerHeight,
  contentWidth,
  greetingFontSize,
  timeouts,
  themeTransition,
};
