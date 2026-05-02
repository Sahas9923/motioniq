import { useState } from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const [role, setRole] = useState("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [faculty, setFaculty] = useState("");
  const [batch, setBatch] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
  const [dob, setDob] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!faculty) {
        alert("Select faculty");
        return;
      }

      if (role === "STUDENT") {
        if (!batch) {
          alert("Select batch");
          return;
        }
        if (!indexNumber) {
          alert("Enter index number");
          return;
        }
      }

      await registerUser(
        email,
        password,
        role,
        faculty,
        batch,
        indexNumber,
        dob
      );

      alert("Account created!");

      navigate(role === "STUDENT"
        ? "/student-dashboard"
        : "/lecturer-dashboard");

    } catch (err) {
      alert(err.message);
    }
  };

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
            Join the Platform.
            <br />
            <span>Start Your Journey.</span>
          </h1>
          <p>Register for academic film analysis.</p>
        </div>

        <div className="footer-text">
          © 2026 MotionIQ Academic
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="login-box">

          <h2>Create Account</h2>

          {/* ROLE SWITCH */}
          <div className="role-switch">
            <button
              className={role === "STUDENT" ? "active" : ""}
              onClick={() => setRole("STUDENT")}
            >
              Student
            </button>

            <button
              className={role === "LECTURER" ? "active" : ""}
              onClick={() => {
                setRole("LECTURER");
                setBatch("");
                setIndexNumber("");
              }}
            >
              Lecturer
            </button>
          </div>

          {/* FORM GRID */}
          <div className="form-grid">

            {/* Faculty */}
            <div className="form-group">
              <label>Faculty</label>
              <select onChange={(e) => setFaculty(e.target.value)}>
                <option value="">Select Faculty</option>
                <option>School of Computing</option>
                <option>School of Engineering</option>
                <option>School of Design</option>
                <option>School of Business</option>
              </select>
            </div>

            {/* DOB */}
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" onChange={(e) => setDob(e.target.value)} />
            </div>

            {/* STUDENT ONLY */}
            {role === "STUDENT" && (
              <>
                <div className="form-group">
                  <label>Batch</label>
                  <select onChange={(e) => setBatch(e.target.value)}>
                    <option value="">Select Batch</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Index Number</label>
                  <input type="text" onChange={(e) => setIndexNumber(e.target.value)} />
                </div>
              </>
            )}

            {/* Email FULL */}
            <div className="form-group full-width">
              <label>Email</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>

            {/* Password FULL */}
            <div className="form-group full-width">
              <label>Password</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>

          </div>

          <button className="login-btn" onClick={handleRegister}>
            Register
          </button>

          <div className="bottom-text">
            Already have an account?{" "}
            <Link to="/" className="link-style">
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;