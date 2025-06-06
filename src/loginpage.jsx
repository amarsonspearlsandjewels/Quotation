import { useState } from 'react';
import './App.css';

function Loginpage({ setIsLoggedIn, setUsername, setIsAdmin }) {
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://apjapi.vercel.app/authenticate/username=${inputUsername}/password=${password}`
      );
      const data = await response.json();

      if (data.success) {
        const { username, isAdmin } = data.data;

        // Update app state
        setIsLoggedIn(true);
        setUsername(username);
        setIsAdmin(isAdmin);

        // Persist in localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('isAdmin', JSON.stringify(isAdmin));

        console.log('Login successful:', data.data);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to authenticate. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginpage">
      <div className="headingpage">
        <img src="/icon192x192.png" alt="main logo" className="logologin" />
      </div>

      <form className="logindiv" onSubmit={handleLogin}>
        <div className="logindivhead">Login to Continue</div>

        <div className="logininp">
          <div className="labelinp">Enter Username</div>
          <input
            type="text"
            name="username"
            id="username"
            className="inputinp"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </div>

        <div className="logininp">
          <div className="labelinp">Enter Password</div>
          <input
            type="password"
            name="userpassword"
            id="userpassword"
            className="inputinp"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="loginbutton" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Loginpage;
