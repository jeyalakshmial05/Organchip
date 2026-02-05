import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function login(e) {
    e.preventDefault();
    if (username === "jeii" && password === "123") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }
  return (
    <div className="login-card">
    <h2>Organ-on-a-Chip</h2>
    <p>Please enter your credentials to access the Bioreactor Dashboard.</p>
    <form onSubmit={login}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      <div className="footer-text">© 2025 Organ-on-a-Chip Monitoring System</div>
    </form>
    </div>
  );
}
export default Login;