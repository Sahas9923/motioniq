import React from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      
      {/* LEFT PANEL */}
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

          <p>
            The premier platform for scholarly film analysis and
            critical cinematic inquiry. Empowering university
            students to decode the language of motion pictures.
          </p>
        </div>

        <div className="footer-text">
          © 2026 MotionIQ Academic · University Partnership Program
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="login-box">

          <h2>Welcome Back</h2>
          <p className="subtitle">
            Please enter your academic credentials to continue.
          </p>

          <div className="role-switch">
            <button className="active">Student</button>
            <button>Lecturer</button>
          </div>

          <button className="sso-btn">
            Sign in with University SSO
          </button>

          <div className="divider">
            <span>Or use credentials</span>
          </div>

          <label>University Email</label>
          <input type="email" placeholder="name@university.com" />

          <div className="password-row">
            <label>Password</label>
            <a href="#">Forgot?</a>
          </div>

          <input type="password" placeholder="••••••••" />

          <label className="remember">
            <input type="checkbox" />
            <span>Stay signed in for 30 days</span>
            </label>

          <button className="login-btn">
            Log In
          </button>

          <div className="bottom-text">
            New to MotionIQ?{" "}
            <Link to="/register" className="link-style">
                Request access from administrator
            </Link>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Login;