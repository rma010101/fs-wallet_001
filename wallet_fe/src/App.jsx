import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import UserAdmin from './components/UserAdmin';
import WalletLogin from './components/WalletLogin';
import WalletDetails from './components/WalletDetails';
import './App.css';

function Home({ onLogin }) {
  return (
    <div style={{maxWidth: '600px', margin: '40px auto', padding: '32px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', textAlign: 'center'}}>
      <h1 style={{marginBottom: '16px'}}>Welcome to RMA B</h1>
      <WalletLogin onLogin={onLogin} />
      <p style={{fontSize: '1em', marginBottom: '24px'}}>
        LHUB Wallet is a secure and modern platform for managing users, wallets, and transactions.<br />
        <br />
        <strong>Features:</strong>
        <ul style={{textAlign: 'left', margin: '16px auto', maxWidth: '400px', fontSize: '1em'}}>
          <li>User registration and management</li>
          <li>Wallet creation and balance tracking</li>
          <li>Transaction history and administration</li>
          <li>Admin dashboard for CRUD operations</li>
        </ul>
        <br />
      </p>
    </div>
  );
}

function AppRoutes() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setLoggedInUser(user);
    navigate('/wallet');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate('/');
  };

  return (
    <>
      <nav style={{display: 'flex', gap: '20px', justifyContent: 'center', margin: '20px 0'}}>
        <Link to="/">Home</Link>
        <Link to="/admin/users">User Admin</Link>
        {loggedInUser && <button style={{marginLeft: '20px'}} onClick={handleLogout}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/" element={!loggedInUser ? <Home onLogin={handleLogin} /> : <WalletDetails user={loggedInUser} />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/admin/users" element={<UserAdmin />} />
        <Route path="/wallet" element={loggedInUser ? <WalletDetails user={loggedInUser} /> : <Home onLogin={handleLogin} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App
