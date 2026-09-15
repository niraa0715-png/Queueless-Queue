import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    if (username === "aashika" && password === "aashika@0706") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid admin username or password");
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <h2>QueueLess Queue</h2>

        <h2>Admin Login</h2>

        <label>Username</label>

        <input
          type="text"
          placeholder="Enter admin username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button onClick={handleAdminLogin}>
          Login
        </button>

        <p>Admin access only</p>

      </div>

    </div>
  );
}

export default AdminLogin;