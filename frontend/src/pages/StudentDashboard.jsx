import React from "react";
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
  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">🎬 MotionIQ</h2>
        <p className="portal">Student Portal</p>

        <ul className="menu">
          <li className="active"><MdDashboard /> Dashboard</li>
          <li><MdPlayCircle /> Videos</li>
          <li><MdQuestionAnswer /> Guided Questions</li>
          <li><MdNotes /> Reflections</li>
          <li><MdForum /> Discussion</li>
          <li><MdFeedback /> Feedback</li>
        </ul>

        <div className="bottom-menu">
          <p><MdPerson /> Profile</p>
          <p><MdSettings /> Settings</p>
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
              You're on a 5-day learning streak. You're in the top 10% of your class.
            </p>
          </div>

          <div className="actions">
            <button className="outline">View Schedule</button>
            <button className="primary">Quick Lesson</button>
          </div>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="card">
            <h4>Weekly Streak</h4>
            <h2>5 Days</h2>
            <span className="green">+20%</span>
          </div>

          <div className="card">
            <h4>Videos Completed</h4>
            <h2>12</h2>
            <span className="green">+2 new</span>
          </div>

          <div className="card">
            <h4>Pending Tasks</h4>
            <h2>4</h2>
            <span className="gray">Due today</span>
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
                <h4>Advanced Cinematic Lighting: The Noir Style</h4>
                <p>
                  Exploring high-contrast lighting techniques and shadow manipulation.
                </p>

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
                <p>
                  How symmetry affects viewer psychology and narrative focus.
                </p>

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

            <div className="tasks">
              <h3>Pending Tasks</h3>

              <div className="task">
                <p>Answer Guided Questions</p>
                <span>Due in 2 hours • Module 4</span>
              </div>

              <div className="task">
                <p>Submit Reflection</p>
                <span>Due tomorrow • Project A</span>
              </div>

              <div className="task">
                <p>Peer Review Session</p>
                <span>Scheduled for Thursday</span>
              </div>

              <button className="calendar">View Calendar</button>
            </div>

            <div className="feedback">
              <h3>Latest Feedback</h3>

              <div className="fb">
                <p className="name">Prof. Marcus Sterling</p>
                <span>Video: Composition Basics</span>
                <p className="msg">"Excellent analysis..."</p>
              </div>

              <div className="fb">
                <p className="name">Sarah Jenkins</p>
                <span>Reflection: Soundscapes</span>
                <p className="msg">"Great connection..."</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;