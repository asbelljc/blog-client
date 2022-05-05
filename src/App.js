import { createContext, useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

export const SessionContext = createContext(null);
export const ScreenContext = createContext(null);

function App() {
  const [session, setSession] = useState(null);
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
      const { session } = await fetch(`/auth/session`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      }).then((res) => res.json());

      setSession(session);
    }

    syncSession().catch((err) => console.log(err));
  }, []);

  async function login(username, password) {
    try {
      const response = await fetch(`/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 401) {
        return console.log('Credentials invalid.');
      } else if (!response.ok) {
        return console.log('Something went wrong.');
      } else {
        await response.json().then((res) => {
          setSession(res.session);
          console.log('Logged in.');
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function logout() {
    try {
      const response = await fetch(`/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return console.log('Something went wrong.');
      } else {
        console.log('Logout worked.');
        await response.json().then((res) => setSession(null));
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ScreenContext.Provider value={{ isDesktop }}>
      <SessionContext.Provider value={{ session, login, logout }}>
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
