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
    primary: 'rgb(60, 135, 225)',
    primaryGlow: 'rgb(80, 155, 245)',
    primaryTint: 'rgba(60, 135, 225, 0.15)',
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
    primary: 'rgb(10, 190, 255)',
    primaryGlow: 'rgb(30, 210, 255)',
    primaryTint: 'rgba(10, 190, 255, 0.15)',
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
