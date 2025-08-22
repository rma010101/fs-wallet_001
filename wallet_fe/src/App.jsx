import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import UserAdmin from "./components/UserAdmin";
import UserRegistration from "./components/UserRegistration";
import WalletDetails from "./components/WalletDetails";
import Home from "./components/Home";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (user, redirectPath) => {
    setLoggedInUser(user);
    navigate(redirectPath);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate("/");
  };

  return (
    <div>
      <nav style={{display: 'flex', gap: '20px', justifyContent: 'center', margin: '20px 0'}}>
        <Link to="/">Home</Link>
        {loggedInUser && loggedInUser.role === 'ADMIN' && (
          <Link to="/admin/users">User Admin</Link>
        )}
        {loggedInUser && <button style={{marginLeft: '20px'}} onClick={handleLogout}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/" element={!loggedInUser ? <Home onLogin={handleLogin} /> : <WalletDetails user={loggedInUser} />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route
          path="/admin/users"
          element={
            loggedInUser && loggedInUser.role === "ADMIN" ? (
              <UserAdmin />
            ) : (
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Access Denied</h2>
                <p>You must be an admin to view this page.</p>
              </div>
            )
          }
        />
        <Route path="/wallet" element={loggedInUser ? <WalletDetails user={loggedInUser} /> : <Home onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;