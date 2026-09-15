import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {

    if (username === "" || password === "") {
      alert("Enter all details");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Sign in successful");

    navigate("/login");
  };

  return (
    <div className="signin-page">

      <div className="signin-card">

        <h2>QueueLess Queue</h2>

        <h2>Sign In</h2>

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

        <button onClick={handleSignIn}>
          Sign In
        </button>

        <p>Already have an account?</p>

        <button
          className="login-button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default SignIn;