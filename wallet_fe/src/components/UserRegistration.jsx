import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./UserRegistration.module.css";

const UserRegistration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users", { username, password });
      setMessage("User registered successfully!");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        navigate("/wallet");
      }, 1200);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Registration failed.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" className={styles.button}>Register</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default UserRegistration;
