import { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getUserData } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;

      const userData = await getUserData(user.uid);

      if (userData.role === "STUDENT") {
        navigate("/student-dashboard");
      } else {
        navigate("/lecturer-dashboard");
      }

    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">

      <div className="left-panel">
        <div className="logo">
          <div className="logo-box"></div>
          <h2>MotionIQ</h2>
        </div>

        <div className="left-content">
          <h1>
            Analyzing the Frame.
            <br />
            <span>Questioning the Narrative.</span>
          </h1>
          <p>Scholarly film analysis platform.</p>
        </div>

        <div className="footer-text">
          © 2026 MotionIQ Academic
        </div>
      </div>

      <div className="right-panel">
        <div className="login-box">

          <h2>Welcome Back</h2>

          <label>Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />

          <button className="login-btn" onClick={handleLogin}>
            Log In
          </button>

          <div className="bottom-text">
            Don’t have an account?{" "}
            <Link to="/register" className="link-style">
              Register
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;