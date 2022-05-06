import { createContext, useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import axios from 'axios';

export const SessionContext = createContext(null);
export const ScreenContext = createContext(null);

function App() {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 800);

  // if viewport 800px or wider, set isDesktop true
  useEffect(() => {
    const updateMedia = () => {
      setDesktop(window.innerWidth > 800);
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
    } catch (error) {
      if (401 === error.response.status) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  }

  async function logout() {
    try {
      await axios.post(`/auth/logout`, {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      setSession(null);
    } catch (error) {
      console.log(error); // only log error for now; might add offline logout functionality in future
    }
  }

  return (
    <ScreenContext.Provider value={{ isDesktop }}>
      <SessionContext.Provider
        value={{ session, error, setError, login, logout }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="test" element={<Test />} />
          </Route>
        </Routes>
      </SessionContext.Provider>
    </ScreenContext.Provider>
  );
}

function Home() {
  return (
    <>
      <h1>HOME</h1>
      <Link to="/test">Test</Link>
    </>
  );
}

function Test() {
  return (
    <>
      <h1>TEST</h1>
      <Link to="/">Home</Link>
    </>
  );
}

export default App;
