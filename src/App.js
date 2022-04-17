import { createContext, useState, useEffect } from 'react';
import Header from './components/Header';

const backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const SessionContext = createContext(null);

function App() {
  const [session, setSession] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function syncSession() {
      // calling /auth/session endpoint returns the server's session status (user, admin, or null)
      const { session } = await fetch(`${backendUrl}/auth/session`).then(
        (res) => res.json()
      );

      setSession(session);
    }

    syncSession().catch((err) => console.log(err));
  }, []);

  // TESTING
  useEffect(() => {
    console.log(session);
  }, [session]);

  async function login(username, password) {
    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
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
      const response = await fetch(`${backendUrl}/auth/logout`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
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
    <SessionContext.Provider value={{ session, login, logout }}>
      <Header />
    </SessionContext.Provider>
  );
  // PREVIOUS RENDER FOR TESTING
  // return (
  //   <SessionContext.Provider value={{ session, login, logout }}>
  //     <input
  //       type="text"
  //       value={username}
  //       onChange={(e) => setUsername(e.target.value)}
  //     />
  //     <input
  //       type="password"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //     />
  //     <button onClick={() => login(username, password)}>Log In</button>
  //     <button onClick={logout}>Log Out</button>
  //     {session === 'admin' ? (
  //       <h1>ADMIN</h1>
  //     ) : session === 'user' ? (
  //       <h1>USER</h1>
  //     ) : (
  //       <h1>NULL</h1>
  //     )}
  //   </SessionContext.Provider>
  // );
}

export default App;
