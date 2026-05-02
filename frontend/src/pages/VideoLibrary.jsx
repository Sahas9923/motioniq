import React, { useState, useEffect } from "react";
import "../styles/VideoLibrary.css";
import "../styles/Layout.css";
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

import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const VideoLibrary = () => {

  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔥 FETCH FROM FIRESTORE */
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const snapshot = await getDocs(collection(db, "videos"));

        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setVideos(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  /* 🔥 USER DATA (FOR FILTERING) */
  const user = JSON.parse(localStorage.getItem("user"));

  const filteredVideos = user?.faculty
    ? videos.filter(v => v.faculty === user.faculty)
    : videos;

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
      </div>

      {/* MAIN */}
      <div className="main">

        <div className="header">
          <input type="text" placeholder="Search videos..." />
        </div>

        <h1>Video Library</h1>

        {/* 🔥 LOADING */}
        {loading ? (
          <p style={{ color: "white" }}>Loading videos...</p>
        ) : (
          <div className="video-grid">

            {filteredVideos.map((video) => (
              <div
                className="video-card"
                key={video.id}
                onClick={() => navigate("/player", { state: video })}
              >
                <img src={video.imageURL} alt="" />

                <div className="video-content">
                  <span className="tag">{video.faculty}</span>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default VideoLibrary;