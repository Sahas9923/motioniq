import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT"); // ✅ role state
  const [showDialog, setShowDialog] = useState(false);

  const handleCreateAccount = () => {
    // 🔐 Save role (for later use)
    localStorage.setItem("role", role);

    setShowDialog(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="register-container">

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
            critical cinematic inquiry.
          </p>
        </div>

        <div className="footer-text">
          © 2026 MotionIQ Academic · University Partnership Program
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="form-wrapper">

          <h2 className="title">Get Started Now</h2>
          <p className="subtitle">
            Please enter your academic credentials to continue.
          </p>

          <label className="join-label">Join as a:</label>

          {/* ✅ ROLE SWITCH FIXED */}
          <div className="role-switch">
            <button
              className={role === "STUDENT" ? "active" : ""}
              onClick={() => setRole("STUDENT")}
            >
              Student
            </button>

            <button
              className={role === "LECTURER" ? "active" : ""}
              onClick={() => setRole("LECTURER")}
            >
              Lecturer
            </button>
          </div>

          <div className="info-box">
            <p>
              Provide your verified university credentials for LMS integration.
            </p>
          </div>

          <label>Full Name</label>
          <input type="text" placeholder="Jane Doe" />

          <label>University Email Address</label>
          <input type="email" placeholder="j.doe@university.edu" />

          {/* 🔄 OPTIONAL: show course only for students */}
          {role === "STUDENT" && (
            <>
              <label>Course Code</label>
              <input type="text" placeholder="e.g. FILM101" />
            </>
          )}

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <div className="password-hint">
            Use 8+ characters with letters, numbers & symbols.
          </div>

          <label className="checkbox-row">
            <input type="checkbox" />
            <span>
              I agree to Terms & Policies
            </span>
          </label>

          <button
            className="submit-btn"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>

          <div className="signin-link">
            Already have an account?{" "}
            <span
              className="link-text"
              onClick={() => navigate("/")}
            >
              Sign In
            </span>
          </div>

        </div>
      </div>

      {/* SUCCESS DIALOG */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Account Created Successfully!</h3>
            <p>Redirecting to Login...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;