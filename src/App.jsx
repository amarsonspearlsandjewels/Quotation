import { useState, useEffect } from 'react';
import './App.css';
import Mainpage from './mainpage';
import Loginpage from './loginpage';
import LoadingPage from './pages/loadingPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem('loggedIn');
    const storedUsername = localStorage.getItem('username');
    const storedIsAdmin = localStorage.getItem('isAdmin');

    if (storedLogin === 'true' && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setIsAdmin(JSON.parse(storedIsAdmin || 'false'));
    }
  }, []);

  return (
    <>
      {isLoading && (
        <LoadingPage isLoading={isLoading} setIsLoading={setIsLoading} />
      )}
      {isLoggedIn ? (
        <Mainpage
          username={username}
          isAdmin={isAdmin}
          setIsLoggedIn={setIsLoggedIn}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        <Loginpage
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          setIsAdmin={setIsAdmin}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
}

export default App;
