import React, { useState } from "react";
import "../styles/VideoLibrary.css";
import { Link, useNavigate } from "react-router-dom";

import {
  MdDashboard,
  MdPlayCircle,
  MdQuestionAnswer,
  MdNotes,
  MdForum,
  MdFeedback,
  MdPerson,
  MdSettings,
} from "react-icons/md";

// images
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.png";
import img6 from "../assets/6.jpg";
import img7 from "../assets/7.png";
import img8 from "../assets/8.jpg";
import img9 from "../assets/9.jpg";
import boy from "../assets/boy.jpg";

const videos = [
  {
    img: img1,
    title: "The Minute",
    category: "SHORT FILM",
    progress: 65,
    url: "https://www.youtube.com/embed/5hPtU8Jbpg0",
    description:
      "A short story that makes you think about decisions and consequences in everyday life."
  },
  {
    img: img2,
    title: "Office Situation Gone Wrong",
    category: "COMEDY",
    progress: 0,
    url: "https://www.youtube.com/embed/2Z4m4lnjxkY",
    description:
      "A funny workplace scenario showing unexpected outcomes."
  },
  {
    img: img3,
    title: "A Simple Choice",
    category: "SHORT CLIP",
    progress: 0,
    url: "https://www.youtube.com/embed/1La4QzGeaaQ",
    description:
      "One small choice can change everything."
  },
  {
    img: img4,
    title: "Misunderstood Conversation",
    category: "SOCIAL",
    progress: 22,
    url: "https://www.youtube.com/embed/6P2nPI6CTlc",
    description:
      "Assumptions can lead to confusion."
  },
  {
    img: img5,
    title: "The Hidden Message",
    category: "SHORT FILM",
    progress: 0,
    url: "https://www.youtube.com/embed/0O2aH4XLbto",
    description:
      "Look deeper to understand the meaning."
  },
  {
    img: img6,
    title: "Why Did He Do That?",
    category: "DRAMA",
    progress: 0,
    url: "https://www.youtube.com/embed/bZ1KDfJ6pY4",
    description:
      "Think about people's actions and reasons."
  },
  {
    img: img7,
    title: "Different Point of View",
    category: "SOCIAL",
    progress: 40,
    url: "https://www.youtube.com/embed/8hP9D6kZseM",
    description:
      "Same situation, different perspectives."
  },
  {
    img: img8,
    title: "Right or Wrong?",
    category: "SHORT CLIP",
    progress: 10,
    url: "https://www.youtube.com/embed/mfWZ7q0uG4Y",
    description:
      "Decide what is right or wrong."
  },
  {
    img: img9,
    title: "Funny but True",
    category: "COMEDY",
    progress: 0,
    url: "https://www.youtube.com/embed/tJ0YkH7yK1k",
    description:
      "Humor reflecting real-life behavior."
  }
];

const VideoLibrary = () => {

  // ✅ hooks INSIDE component
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">🎬 MotionIQ</h2>
        <p className="portal">Student Portal</p>

        <ul className="menu">
          <li><Link to="/student-dashboard"><MdDashboard /> Dashboard</Link></li>
          <li className="active"><Link to="/videos"><MdPlayCircle /> Videos</Link></li>
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
                  <input type="text" placeholder="Search..." />
                  <div className="profile">
                    <div>
                      <h4>Alex Rivera</h4>
                      <p>Student ID: #8291</p>
                    </div>
                    <img src={boy} alt="" />
                  </div>
                </div>

        <h1>Video Library</h1>

        <div className="video-grid">
          {videos.map((video, index) => (
            <div
              className="video-card"
              key={index}
              onClick={() => navigate("/player", { state: video })}
              style={{ cursor: "pointer" }}
            >
              <img src={video.img} alt="" />

              <div className="video-content">
                <span className="tag">{video.category}</span>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VideoLibrary;