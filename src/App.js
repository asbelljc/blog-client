import { createContext, useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import axios from 'axios';

export const SessionContext = createContext(null);
export const ScreenContext = createContext(null);

function App() {
  const [session, setSession] = useState(null);
  const [requestError, setRequestError] = useState(null);
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
      setRequestError(null);
    } catch (error) {
      if (401 === error.response.status) {
        setRequestError('Invalid credentials. Please try again.');
      } else {
        setRequestError('Something went wrong. Please try again.');
      }
    }
  }

  async function logout() {
    setSession(null);
    setRequestError(null);
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
      console.log(error); // only log error since offline logout functionality is present
    }
  }

  return (
    <ScreenContext.Provider value={{ isDesktop }}>
      <SessionContext.Provider
        value={{
          session,
          requestError,
          setRequestError,
          login,
          logout,
        }}
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
