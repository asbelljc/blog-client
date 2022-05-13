import { createContext, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import { Home, About, Blog, Portfolio, Contact } from './pages';

export const SessionContext = createContext(null);
export const ScreenContext = createContext(null);

function App() {
  const [session, setSession] = useState(null);
  const [justSignedUp, setJustSignedUp] = useState(false);
  const [requestErrors, setRequestErrors] = useState([]);
  const [screen, setScreen] = useState(measureScreen());

  const theme = useTheme();

  const location = useLocation();

  useEffect(() => {
    const updateMedia = () => {
      setScreen(measureScreen());
    };

    window.addEventListener('resize', updateMedia);

    return () => window.removeEventListener('resize', updateMedia);
  });

  // check session status on startup/refresh
  useEffect(() => {
    async function syncSession() {
      try {
        const { data } = await axios.get(`/auth/session`, {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
          },
          timeout: 10000, // wait up to 10s for response
        });

        setSession(data.session);
      } catch (error) {
        // if request fails, only log the error; no need to inform user as this is a background session retrieval
        console.error(error);
      }
    }

    syncSession();
  }, []);

  // this lets header briefly display a welcome message for new users
  useEffect(() => {
    if (justSignedUp) {
      setTimeout(() => {
        setJustSignedUp(false);
      }, theme.timeouts.showWelcome);
    }
  }, [justSignedUp, setJustSignedUp, theme.timeouts.showWelcome]);

  function measureScreen() {
    return window.innerWidth > 800
      ? 'wide'
      : window.innerWidth > 480
      ? 'medium'
      : 'narrow';
  }

  async function signup(username, password) {
    try {
      const { data } = await axios.post(
        `/auth/signup`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      setSession(data.session);
      setJustSignedUp(true);
      setRequestErrors([]);
    } catch (error) {
      if (400 === error.response.status) {
        const errors = error.response.data.errors.map(
          // express-validator attaches an extraneous label - get rid of it.
          (error) => error.msg.replace('Error: ', '')
        );
        setRequestErrors(errors);
      } else {
        setRequestErrors(['Something went wrong. Please try again.']);
      }
    }
  }

  async function login(username, password) {
    try {
      const { data } = await axios.post(
        `/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      setSession(data.session);
      setRequestErrors([]);
    } catch (error) {
      if (401 === error.response.status) {
        setRequestErrors(['Invalid credentials. Please try again.']);
      } else {
        setRequestErrors(['Something went wrong. Please try again.']);
      }
    }
  }

  async function logout() {
    setSession(null);
    setRequestErrors([]);
    // delete secondary non-httpOnly cookie to allow offline logout
    document.cookie =
      'secondaryAuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    try {
      await axios.post(`/auth/logout`, {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
    } catch (error) {
      console.error(error); // only log error since offline logout functionality is present
    }
  }

  return (
    <ScreenContext.Provider value={{ screen }}>
      <SessionContext.Provider
        value={{
          session,
          requestErrors,
          setRequestErrors,
          login,
          logout,
          signup,
          justSignedUp,
        }}
      >
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="blog" element={<Blog />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="portfolio" element={<Portfolio />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </SessionContext.Provider>
    </ScreenContext.Provider>
  );
}

export default App;
