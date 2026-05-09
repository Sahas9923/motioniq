import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../services/firebase";

import "../styles/AdminLogin.css";

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // APPROVED ADMIN EMAILS
  const adminEmails = [
    "admin@motioniq.com",
    "admin@gmail.com"
  ];

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      // FIREBASE LOGIN
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      // CHECK IF ADMIN
      if (adminEmails.includes(user.email)) {

        localStorage.setItem(
          "isAdmin",
          "true"
        );

        localStorage.setItem(
          "adminEmail",
          user.email
        );

        navigate("/admin-dashboard");

      } else {

        alert(
          "Access Denied! You are not an admin."
        );

      }

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="admin-login-page">

      <div className="admin-login-card">

        <h1 className="admin-logo">
          🎬 MotionIQ
        </h1>

        <h2>
          Admin Login
        </h2>

        <p className="admin-subtitle">
          Sign in to continue
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>

  );
};

export default AdminLogin;