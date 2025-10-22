import React, { useState } from 'react';
import API from '../api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState('login');

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        const res = await API.post('/auth/login', { email, password });
        onLogin(res.data.token);
      } else {
        const res = await API.post('/auth/register', { name, email, password });
        onLogin(res.data.token);
      }
    } catch (err) {
      console.error(err);
      alert('Auth failed');
    }
  };

  return (
    <div>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={submit}>
        {mode === 'register' && <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />}
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'Create account' : 'Have an account? Login'}
      </button>
    </div>
  );
}
