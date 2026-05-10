// LecturerDashboard.jsx

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
  MdPeople,
  MdSettings,
} from "react-icons/md";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../services/firebase";

import "../styles/LecturerDashboard.css";

const LecturerDashboard = () => {

  /* STATES */
  const [videos, setVideos] =
    useState([]);

  const [reflectionCount,
    setReflectionCount] =
      useState(0);

  /* USER DATA */
  const userName =
    localStorage.getItem(
      "fullName"
    ) || "Lecturer";

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

  /* FETCH VIDEOS */
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

  /* FETCH REFLECTIONS */
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

  /* LOGOUT */
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
      <div className="studentsidebar">

        <div>

          {/* LOGO */}
          <div className="sidebar-logo">

            <div className="logo-icon">
              🎓
            </div>

            <div>

              <h2>
                MotionIQ
              </h2>

              <p>
                Lecturer Portal
              </p>

            </div>

          </div>

          {/* NAVIGATION */}
          <div className="nav-links">

            <Link
              to="/lecturer-dashboard"
              className="active-link"
            >

              <MdDashboard />

              Dashboard

            </Link>

            <Link to="/videos">

              <MdPlayCircle />

              Video Library

            </Link>

            <Link to="/questions">

              <MdQuestionAnswer />

              Questions

            </Link>

            <Link to="/reflections">

              <MdNotes />

              Reflections

            </Link>

            <Link to="/discussion">

              <MdForum />

              Discussions

            </Link>

            <Link to="/students">

              <MdPeople />

              Students

            </Link>

          </div>

        </div>

        {/* PROFILE + LOGOUT */}
        <div>

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

          {/* LOGOUT */}
          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            <MdLogout />

            Sign Out

          </button>

        </div>

      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <div className="main-content">

        {/* =========================
            TOP
        ========================= */}
        <div className="dashboard-top">

          {/* LEFT */}
          <div>

            <h1>
              Welcome Back,
              {" "}
              {userName}
            </h1>

            <p>
              Logged in as {email}
            </p>

          </div>

          {/* RIGHT BUTTON */}
          <div className="dashboard-actions">

            <button
              className="manage-videos-btn"
              onClick={() =>
                navigate(
                  "/lecturer-videos"
                )
              }
            >

              <MdSettings />

              Manage Videos

            </button>

          </div>

        </div>

        {/* =========================
            HERO
        ========================= */}
        <div className="hero-banner">

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <span>
              MOTIONIQ LECTURER PANEL
            </span>

            <h2>
              Manage Student Learning
              Through Film Analysis
            </h2>

            <p>
              Upload videos, monitor reflections,
              evaluate discussions, and guide
              collaborative learning experiences.
            </p>

          </div>

        </div>

        {/* =========================
            STATS
        ========================= */}
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
                Guided Questions
              </p>

            </div>

          </div>

          <div className="stat-card">

            <MdNotes className="stat-icon" />

            <div>

              <h3>
                {reflectionCount}
              </h3>

              <p>
                Student Reflections
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

        {/* =========================
            RECENT VIDEOS
        ========================= */}
        <div className="video-section">

          <div className="section-header">

            <h3>
              Uploaded Videos
            </h3>

            <span>
              Latest Content
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
                      {video.title}
                    </h4>

                    <p>
                      {video.description}
                    </p>

                    <span>
                      {video.faculty}
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

export default LecturerDashboard;