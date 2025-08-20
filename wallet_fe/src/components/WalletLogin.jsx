import React, { useState } from "react";
import axios from "axios";
import styles from "./UserRegistration.module.css";

const WalletLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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

  return (
    <div className={styles.container} style={{marginBottom: 32}}>
      <h2>View Your Wallet</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
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
        <button type="submit" className={styles.button}>Login & View Wallet</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default WalletLogin;
