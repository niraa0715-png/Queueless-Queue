import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (username === savedUsername && password === savedPassword) {
      localStorage.setItem("loggedInUser", username);
      navigate("/home");
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>QueueLess</h1>
        <h2>Login</h2>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p>New user?</p>

        <button onClick={() => navigate("/")}>
          Sign In
        </button>

      </div>
    </div>
  );
}

export default Login;