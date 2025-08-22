import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./UserRegistration.module.css";

const WalletLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt login (fetch user and wallet)
      const res = await axios.post("http://localhost:8080/api/users/login", { username, password });
      setMessage("");
      setUsername("");
      setPassword("");
      if (onLogin) onLogin(res.data); // Pass user/wallet data up
    } catch {
      setMessage("Invalid username or password.");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className={styles.container} style={{marginBottom: 32}}>
      <h2>View Your Wallet</h2>
      <form onSubmit={handleSubmit} className={styles.form} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <div style={{display: 'flex', gap: '12px'}}>
          <button type="submit" className={styles.button}>Login & View Wallet</button>
          <button type="button" className={styles.button} style={{background: '#6366f1', color: '#fff'}} onClick={handleRegister}>Register as New User</button>
        </div>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default WalletLogin;
