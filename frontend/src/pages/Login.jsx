// Login.jsx

import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  MdEmail,
  MdLock,
  MdArrowForward,
} from "react-icons/md";

import "../styles/Login.css";

import {
  loginUser,
  getUserData,
} from "../services/authService";

const Login = () => {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  /* LOGIN */
  const handleLogin =
    async () => {

      try {

        /* LOGIN USER */
        const userCredential =
          await loginUser(
            email,
            password
          );

        const user =
          userCredential.user;

        /* GET FIRESTORE DATA */
        const userData =
          await getUserData(
            user.uid
          );

        /* SAVE USER INFO */
        localStorage.setItem(
          "uid",
          user.uid
        );

        localStorage.setItem(
          "userEmail",
          email
        );

        localStorage.setItem(
          "userRole",
          userData.role
        );

        localStorage.setItem(
          "fullName",
          userData.fullName
        );

        /* NAVIGATION */
        if (
          userData.role ===
          "STUDENT"
        ) {

          navigate(
            "/student-dashboard"
          );

        } else {

          navigate(
            "/lecturer-dashboard"
          );

        }

      } catch (err) {

        console.log(err);

        alert(
          "Login Failed"
        );

      }

    };

  return (

    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-left">

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
            CINEMA • ANALYSIS • EDUCATION
          </span>

          <h1>
            Discover Cinema
            <br />
            Beyond The Screen
          </h1>

          <p>
            MotionIQ helps students
            and lecturers explore
            cinematic storytelling,
            critical thinking,
            collaborative learning,
            and interactive analysis.
          </p>

          {/* FEATURES */}
          <div className="feature-grid">

            <div className="feature-card">

              <h3>
                🎥 Film Library
              </h3>

              <p>
                Curated cinematic
                educational content.
              </p>

            </div>

            <div className="feature-card">

              <h3>
                🧠 Guided Learning
              </h3>

              <p>
                Interactive questions
                and reflections.
              </p>

            </div>

            <div className="feature-card">

              <h3>
                💬 Discussions
              </h3>

              <p>
                Academic collaboration
                and communication.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">

        <div className="login-card">

          {/* TOP */}
          <div className="card-top">

            <h2>
              Welcome Back
            </h2>

            <p>
              Login to continue your
              learning journey
            </p>

          </div>

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
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* LOGIN BUTTON */}
          <button
            className="login-btn"
            onClick={handleLogin}
          >

            Login

            <MdArrowForward />

          </button>

          {/* REGISTER */}
          <div className="register-text">

            Don’t have an account?

            <Link to="/register">
              Register
            </Link>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Login;