import React, { useState, useContext } from 'react';
import styles from '../styles/login-signup.module.css';
import { CSRFToken } from '../components/CSRFToken';
import { handleLogin, handleSignUp } from '../backendActions/userAuth';
import { Context } from '../context/authContext';
export default function Login() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(Context);

  async function handleSubmit(e) {
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;
    if (action === 'login') {
      const result = await handleLogin(username, password);
      if (result) {
        dispatch({ type: 'LOGGED_IN', payload: true })
        localStorage.setItem('auth-kaizntree', true);
      };
    } else if (action === 'signup') {
      const result = await handleSignUp(username, password);
      setUsername('');
      setPassword('');
    }
  }

  return (
    <div className="flex h-dvh w-dvw">
      <main className='w-full'>
        <div className={styles.loginContainer}>
          <h1>Kaizntree</h1>
          <form 
            className={styles.loginForm}
            onSubmit={(e) => {
              handleSubmit(e)
            }}>
            <CSRFToken />
            <input 
              type="text" 
              placeholder="Username" 
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              required
            />
            <div className={styles.loginButtons}>
              <button type="submit" name="signup">CREATE ACCOUNT</button>
              <button type="submit" name="login">LOG IN</button>
            </div>
            <button 
              type="button" 
              className={styles.fakeLink}
              onClick={() => setForgotPassword(!forgotPassword)}
            >
              Forgot Password
            </button>
            <p>
              {forgotPassword ? "sry about that, Lev didn't have time to implement this" : null}
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}