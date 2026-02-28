import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const handleCreateAccount = () => {
    // Later you will connect backend API here

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
        <div className="form-wrapper">

          <h2 className="title">Get Started Now</h2>
          <p className="subtitle">
            Please enter your academic credentials to continue.
          </p>

          <label className="join-label">Join as a:</label>

          <div className="role-switch">
            <button className="active">Student</button>
            <button>Lecturer</button>
          </div>

          <div className="info-box">
            <p>
              To synchronize your viewing assignments and grades,
              please provide your verified university credentials.
              This ensures seamless integration with your campus
              <strong> LMS</strong>.
            </p>
          </div>

          <label>Full Name</label>
          <input type="text" placeholder="Jane Doe" />

          <label>University Email Address</label>
          <input type="email" placeholder="j.doe@university.edu" />

          <label>Course Code</label>
          <input type="text" placeholder="e.g. FILM101" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <div className="password-hint">
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </div>

          <label className="checkbox-row">
            <input type="checkbox" />
            <span>
              I agree to the{" "}
              <span className="link-text">Academic Integrity Policy</span> and the{" "}
              <span className="link-text">Terms of Service</span>.
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