import { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext(null);

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function syncSession() {
      // calling /auth/session endpoint returns the server's session status (user, admin, or null)
      const { session } = await fetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/session`
      ).then((res) => res.json());

      setSession(session);
    }

    syncSession().catch((err) => console.log(err));
  }, []);

  return <div className="App"></div>;
}

export default App;
