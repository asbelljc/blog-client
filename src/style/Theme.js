const timeouts = {
  toggleMenu: 300,
  showWelcome: 6000,
};

const headerHeight = {
  small: '6rem',
  large: '8rem',
};

const contentWidth = (screen) =>
  screen === 'wide' ? 'min(80%, 1000px)' : '90%';

const themeTransition =
  'color 300ms linear, background 300ms linear, box-shadow 300ms linear';

export const lightTheme = {
  light: true,
  colors: {
    text: 'rgb(50, 50, 50)',
    body: 'rgb(255, 255, 255)',
    primary: 'rgb(30, 130, 255)',
    primaryGlow: 'rgb(50, 150, 255)',
    primaryTint: 'rgba(30, 130, 255, 0.06)',
    inactive: 'rgb(150, 150, 150)',
    error: 'rgb(255, 60, 70)',
  },
  headerShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.2)',
  headerHeight,
  contentWidth,
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
    primaryTint: 'rgba(30, 130, 255, 0.07)',
    inactive: 'rgb(150, 150, 150)',
    error: 'rgb(255, 60, 70)',
  },
  headerShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.3)',
  headerHeight,
  contentWidth,
  timeouts,
  themeTransition,
};
