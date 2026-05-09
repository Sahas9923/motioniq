// Register.jsx

import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  MdPerson,
  MdEmail,
  MdLock,
  MdSchool,
  MdBadge,
  MdArrowForward,
} from "react-icons/md";

import "../styles/Register.css";

import {
  registerStudent,
  registerLecturer,
} from "../services/authService";

const Register = () => {

  const navigate =
    useNavigate();

  /* ROLE */
  const [role, setRole] =
    useState("STUDENT");

  /* COMMON */
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [faculty, setFaculty] =
    useState("");

  /* STUDENT */
  const [batch, setBatch] =
    useState("");

  /* LECTURER */
  const [staffId, setStaffId] =
    useState("");

  /* REGISTER */
  const handleRegister =
    async () => {

      try {

        /* VALIDATION */
        if (
          !fullName ||
          !email ||
          !password ||
          !faculty
        ) {

          alert(
            "Please fill all fields"
          );

          return;

        }

        /* STUDENT */
        if (
          role === "STUDENT"
        ) {

          if (!batch) {

            alert(
              "Please select batch"
            );

            return;

          }

          await registerStudent(

            fullName,

            email,

            password,

            faculty,

            batch

          );

        }

        /* LECTURER */
        if (
          role === "LECTURER"
        ) {

          if (!staffId) {

            alert(
              "Please enter staff ID"
            );

            return;

          }

          await registerLecturer(

            fullName,

            email,

            password,

            faculty,

            staffId

          );

        }

        alert(
          "Registration Successful!"
        );

        navigate("/");

      } catch (err) {

        alert(err.message);

      }

    };

  return (

    <div className="register-page">

      {/* LEFT */}
      <div className="register-left">

        <div className="overlay"></div>

        {/* BRAND */}
        <div className="brand">

          <div className="logo-circle">
            🎬
          </div>

          <h2>
            MotionIQ
          </h2>

        </div>

        {/* HERO */}
        <div className="hero-content">

          <span className="tag">
            CINEMA • EDUCATION • ANALYSIS
          </span>

          <h1>
            Join The Future
            <br />
            Of Film Learning
          </h1>

          <p>
            MotionIQ helps students and
            lecturers explore cinematic
            storytelling, critical thinking,
            guided analysis, discussions,
            and reflections through
            interactive learning.
          </p>

          {/* FEATURES */}
          <div className="feature-list">

            <div className="feature-card">

              <h3>
                🎥 Film Library
              </h3>

              <p>
                Explore curated educational
                films and visual media.
              </p>

            </div>

            <div className="feature-card">

              <h3>
                🧠 Guided Analysis
              </h3>

              <p>
                Learn with interactive
                questions and activities.
              </p>

            </div>

            <div className="feature-card">

              <h3>
                💬 Discussions
              </h3>

              <p>
                Collaborate with students
                and lecturers in real time.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="register-right">

        <div className="register-card">

          {/* TOP */}
          <div className="card-top">

            <h2>
              Create Account
            </h2>

            <p>
              Register to continue your
              MotionIQ journey
            </p>

          </div>

          {/* ROLE SWITCH */}
          <div className="role-switch">

            <button
              className={
                role === "STUDENT"
                  ? "active"
                  : ""
              }
              onClick={() => {

                setRole(
                  "STUDENT"
                );

              }}
            >

              Student

            </button>

            <button
              className={
                role === "LECTURER"
                  ? "active"
                  : ""
              }
              onClick={() => {

                setRole(
                  "LECTURER"
                );

              }}
            >

              Lecturer

            </button>

          </div>

          {/* FULL NAME */}
          <div className="input-group">

            <label>
              Full Name
            </label>

            <div className="input-box">

              <MdPerson className="input-icon" />

              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* FACULTY */}
          <div className="input-group">

            <label>
              Faculty
            </label>

            <div className="input-box">

              <MdSchool className="input-icon" />

              <select
                value={faculty}
                onChange={(e) =>
                  setFaculty(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Faculty
                </option>

                <option>
                  School of Computing
                </option>

                <option>
                  School of Business
                </option>

                <option>
                  School of Engineering
                </option>

                <option>
                  School of Design
                </option>

              </select>

            </div>

          </div>

          {/* STUDENT BATCH */}
          {role === "STUDENT" && (

            <div className="input-group">

              <label>
                Batch
              </label>

              <div className="input-box">

                <MdBadge className="input-icon" />

                <select
                  value={batch}
                  onChange={(e) =>
                    setBatch(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Select Batch
                  </option>

                  <option>
                    2022
                  </option>

                  <option>
                    2023
                  </option>

                  <option>
                    2024
                  </option>

                  <option>
                    2025
                  </option>

                </select>

              </div>

            </div>

          )}

          {/* LECTURER STAFF ID */}
          {role === "LECTURER" && (

            <div className="input-group">

              <label>
                Staff ID
              </label>

              <div className="input-box">

                <MdBadge className="input-icon" />

                <input
                  type="text"
                  placeholder="Enter your staff ID"
                  value={staffId}
                  onChange={(e) =>
                    setStaffId(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          )}

          {/* EMAIL */}
          <div className="input-group">

            <label>
              Email Address
            </label>

            <div className="input-box">

              <MdEmail className="input-icon" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div className="input-group">

            <label>
              Password
            </label>

            <div className="input-box">

              <MdLock className="input-icon" />

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            className="register-btn"
            onClick={handleRegister}
          >

            Create Account

            <MdArrowForward />

          </button>

          {/* LOGIN */}
          <div className="bottom-text">

            Already have an account?

            <Link to="/">
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Register;