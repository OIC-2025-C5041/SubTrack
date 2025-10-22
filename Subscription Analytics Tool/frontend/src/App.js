import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <BrowserRouter>
      <div className="p-4">
        <header className="mb-4">
          <Link to="/">SubTrack</Link>
          <span className="float-right">{token ? 'Logged in' : <Link to="/login">Login</Link>}</span>
        </header>
        <Routes>
          <Route path="/" element={<Dashboard token={token} />} />
          <Route path="/login" element={<Login onLogin={(t) => { setToken(t); localStorage.setItem('token', t); }} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
