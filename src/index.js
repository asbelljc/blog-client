import React, { useState, createContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './style/Theme';
import GlobalStyle from './style/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const ThemeControl = createContext(null);

function Index() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      console.error(
        'Local storage either full or deactivated. Using default dark mode.'
      );
    }
  }, [theme]);

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <ThemeControl.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ThemeControl.Provider>
  );
}

root.render(<Index />);
