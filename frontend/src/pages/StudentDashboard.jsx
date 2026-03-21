import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/StudentDashboard.css";

import boy from "../assets/boy.jpg";
import film from "../assets/film.jpg";
import girl from "../assets/girl.jpg";

import {
  MdDashboard,
  MdPlayCircle,
  MdQuestionAnswer,
  MdNotes,
  MdForum,
  MdFeedback,
  MdPerson,
  MdSettings
} from "react-icons/md";

const StudentDashboard = () => {

  // ✅ STATE
  const [showSettings, setShowSettings] = useState(false);

  // ✅ NAVIGATION
  const navigate = useNavigate();

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ✅ DASHBOARD DATA (can connect backend later)
  const stats = {
    videosWatched: 12,
    questionsCompleted: 8,
    reflectionsDone: 5,
  };

  const discussions = [
    {
      title: "The Minute",
      message: "I think the decision was rushed."
    },
    {
      title: "Office Situation",
      message: "This happens in real life a lot."
    },
    {
      title: "A Simple Choice",
      message: "Small decisions matter."
    }
  ];

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">🎬 MotionIQ</h2>
        <p className="portal">Student Portal</p>

        <ul className="menu">
          <li className="active"><MdDashboard /> Dashboard</li>
          <li><Link to="/videos"><MdPlayCircle /> Videos</Link></li>
          <li><Link to="/guided-questions"><MdQuestionAnswer /> Guided Questions</Link></li>
          <li><Link to="/reflections"><MdNotes /> Reflections</Link></li>
          <li><Link to="/discussion"><MdForum /> Discussion</Link></li>
          <li><MdFeedback /> Feedback</li>
        </ul>

        {/* SETTINGS */}
        <div className="bottom-menu">
          <p><MdPerson /> Profile</p>

          <div className="settings-container">
            <p onClick={() => setShowSettings(!showSettings)}>
              <MdSettings /> Settings
            </p>

            {showSettings && (
              <div className="settings-dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>

        <div className="premium">
          <p className="premium-title">Premium Access</p>
          <p>Unlock advanced cinematic analysis tools.</p>
          <button>Upgrade Now</button>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <div className="header">
          <input placeholder="Search lessons, films, or feedback..." />

          <div className="profile">
            <div>
              <h4>Alex Rivera</h4>
              <p>Student ID: #8291</p>
            </div>
            <img src={boy} alt="profile" />
          </div>
        </div>

        {/* WELCOME */}
        <div className="welcome">
          <div>
            <h1>Welcome Back, Alex!</h1>
            <p>
              You're actively improving your critical thinking skills. Keep progressing!
            </p>
          </div>

          <div className="actions">
            <button className="outline">View Schedule</button>
            <button className="primary">Quick Lesson</button>
          </div>
        </div>

        {/* 🔥 UPDATED STATS */}
        <div className="stats">

          <div className="card">
            <h4>Videos Watched</h4>
            <h2>{stats.videosWatched}</h2>
            <span className="green">+3 this week</span>
          </div>

          <div className="card">
            <h4>Questions Completed</h4>
            <h2>{stats.questionsCompleted}</h2>
            <span className="green">+2 today</span>
          </div>

          <div className="card">
            <h4>Reflections Submitted</h4>
            <h2>{stats.reflectionsDone}</h2>
            <span className="gray">Keep going</span>
          </div>

        </div>

        {/* CONTENT */}
        <div className="content">

          {/* LEFT */}
          <div className="left">

            <div className="section-header">
              <h3>Continue Watching</h3>
              <span>View All</span>
            </div>

            <div className="video-card">
              <img src={film} alt="" />
              <div className="video-info">
                <h4>Advanced Cinematic Lighting</h4>
                <p>High-contrast lighting techniques.</p>

                <div className="progress">
                  <span>65% Completed</span>
                  <span className="resume">Resume →</span>
                </div>

                <div className="bar">
                  <div style={{ width: "65%" }}></div>
                </div>
              </div>
            </div>

            <div className="video-card">
              <img src={girl} alt="" />
              <div className="video-info">
                <h4>Symmetry and Composition</h4>
                <p>Understanding visual balance.</p>

                <div className="progress">
                  <span>20% Completed</span>
                  <span className="resume">Resume →</span>
                </div>

                <div className="bar">
                  <div style={{ width: "20%" }}></div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="right">

            {/* 🔥 DISCUSSIONS */}
            <div className="discussion-box">
              <h3>Your Discussion Contributions</h3>

              {discussions.map((item, index) => (
                <div key={index} className="discussion-item">
                  <h4>{item.title}</h4>
                  <p>"{item.message}"</p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;