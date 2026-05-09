// StudentDashboard.jsx

import { useEffect, useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  MdMovie,
  MdQuestionAnswer,
  MdForum,
  MdNotes,
  MdLogout,
  MdPlayCircle,
  MdDashboard,
} from "react-icons/md";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../services/firebase";

import "../styles/StudentDashboard.css";

const StudentDashboard = () => {

  /* STATES */
  const [videos, setVideos] =
    useState([]);

  const [reflectionCount, setReflectionCount] =
    useState(0);

  /* USER DATA */
  const userName =
    localStorage.getItem(
      "fullName"
    ) || "Student";

  const email =
    localStorage.getItem(
      "userEmail"
    ) || "";

  const navigate =
    useNavigate();

  /* LOAD DATA */
  useEffect(() => {

    fetchVideos();

    fetchReflections();

  }, []);

  /* =========================
     FETCH VIDEOS
  ========================= */
  const fetchVideos =
    async () => {

      try {

        const querySnapshot =
          await getDocs(
            collection(
              db,
              "videos"
            )
          );

        const videoData =
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setVideos(videoData);

      } catch (err) {

        console.log(err);

      }

    };

  /* =========================
     FETCH REFLECTIONS
  ========================= */
  const fetchReflections =
    async () => {

      try {

        const querySnapshot =
          await getDocs(
            collection(
              db,
              "reflections"
            )
          );

        setReflectionCount(
          querySnapshot.size
        );

      } catch (err) {

        console.log(err);

      }

    };

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout =
    () => {

      localStorage.clear();

      navigate("/");

    };

  return (

    <div className="dashboard-page">

      {/* =========================
          SIDEBAR
      ========================= */}
      <div className="sidebar">

        {/* LOGO */}
        <div className="sidebar-logo">

          <div className="logo-icon">
            🎬
          </div>

          <div>

            <h2>
              MotionIQ
            </h2>

            <p>
              Student Portal
            </p>

          </div>

        </div>

        {/* NAVIGATION */}
        <div className="nav-links">

          <Link
            to="/student-dashboard"
            className="active-link"
          >

            <MdDashboard />

            Dashboard

          </Link>

          <Link to="/videos">

            <MdPlayCircle />

            Video Library

          </Link>

          <Link to="/guided-questions">

            <MdQuestionAnswer />

            Questions

          </Link>

          <Link to="/discussion">

            <MdForum />

            Discussions

          </Link>

          <Link to="/reflections">

            <MdNotes />

            Reflections

          </Link>

        </div>

        {/* PROFILE */}
        <div className="profile-box">

          <div className="profile-circle">

            {userName
              ?.charAt(0)
              ?.toUpperCase()}

          </div>

          <div>

            <h4>
              {userName}
            </h4>

            <p>
              {email}
            </p>

          </div>

        </div>

      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <div className="main-content">

        {/* TOP */}
        <div className="dashboard-top">

          <div>

            <h1>
              Welcome Back,
              {" "}
              {userName} 👋
            </h1>

            <p>
              Logged in as {email}
            </p>

          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            <MdLogout />

            Sign Out

          </button>

        </div>

        {/* HERO */}
        <div className="hero-banner">

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <span>
              MOTIONIQ LEARNING PLATFORM
            </span>

            <h2>
              Explore Film Analysis
              Beyond The Screen
            </h2>

            <p>
              Learn cinematic storytelling,
              reflections, critical thinking,
              and collaborative analysis.
            </p>

          </div>

        </div>

        {/* STATS */}
        <div className="stats-grid">

          <div className="stat-card">

            <MdMovie className="stat-icon" />

            <div>

              <h3>
                {videos.length}
              </h3>

              <p>
                Total Videos
              </p>

            </div>

          </div>

          <div className="stat-card">

            <MdQuestionAnswer className="stat-icon" />

            <div>

              <h3>
                82
              </h3>

              <p>
                Questions
              </p>

            </div>

          </div>

          <div className="stat-card">

            <MdNotes className="stat-icon" />

            <div>

              <h3>
                {
                  reflectionCount
                }
              </h3>

              <p>
                Reflections
              </p>

            </div>

          </div>

          <div className="stat-card">

            <MdForum className="stat-icon" />

            <div>

              <h3>
                16
              </h3>

              <p>
                Discussions
              </p>

            </div>

          </div>

        </div>

        {/* RECENT VIDEOS */}
        <div className="video-section">

          <div className="section-header">

            <h3>
              Recent Videos
            </h3>

            <span>
              Latest Uploads
            </span>

          </div>

          <div className="video-grid">

            {videos
              .slice(0, 3)
              .map((video) => (

                <div
                  className="video-card"
                  key={video.id}
                >

                  <img
                    src={
                      video.imageURL
                    }
                    alt={
                      video.title
                    }
                    className="video-image"
                  />

                  <div className="video-info">

                    <h4>
                      {
                        video.title
                      }
                    </h4>

                    <p>
                      {
                        video.description
                      }
                    </p>

                    <span>
                      {
                        video.faculty
                      }
                    </span>

                  </div>

                </div>

              ))}

          </div>

        </div>

      </div>

    </div>

  );

};

export default StudentDashboard;