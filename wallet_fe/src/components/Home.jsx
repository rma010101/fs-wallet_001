import React, { useState } from "react";

const Home = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const user = await response.json();
        // user should have { username, role }
        onLogin(user, "/wallet");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error); // Log error for debugging
      alert("Login failed. Please check your connection or try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to BS B</h1>
      <div style={{ margin: "20px auto", maxWidth: "300px" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button onClick={handleLoginClick} style={{ width: "100%" }}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;