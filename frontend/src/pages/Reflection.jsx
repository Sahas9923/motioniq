import React, { useState } from "react";
import "../styles/Reflection.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  { img: img1, title: "The Minute", category: "SHORT FILM" },
  { img: img2, title: "Office Situation Gone Wrong", category: "COMEDY" },
  { img: img3, title: "A Simple Choice", category: "SHORT CLIP" },
  { img: img4, title: "Misunderstood Conversation", category: "SOCIAL" },
  { img: img5, title: "The Hidden Message", category: "SHORT FILM" },
  { img: img6, title: "Why Did He Do That?", category: "DRAMA" },
  { img: img7, title: "Different Point of View", category: "SOCIAL" },
  { img: img8, title: "Right or Wrong?", category: "SHORT CLIP" },
  { img: img9, title: "Funny but True", category: "COMEDY" },
];

const Reflection = () => {

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reflection, setReflection] = useState("");

  const openModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
    setReflection("");
  };

  const handleSubmit = () => {
    console.log("Reflection:", reflection);
    alert("Reflection submitted!");
    setShowModal(false);
  };

  const navigate = useNavigate();
    const [showSettings, setShowSettings] = useState(false);
  
     const handleLogout = () => {
    localStorage.clear(); // optional
    navigate("/"); // redirect to login
    };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">🎬 MotionIQ</h2>
        <p className="portal">Student Portal</p>

        <ul className="menu">
          <li><Link to="/student-dashboard"><MdDashboard /> Dashboard</Link></li>
          <li><Link to="/videos"><MdPlayCircle /> Videos</Link></li>
          <li><Link to="/guided-questions"><MdQuestionAnswer /> Guided Questions</Link></li>
          <li className="active"><MdNotes /> Reflections</li>
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

        <div className="premium">
          <p className="premium-title">Premium Access</p>
          <p>Unlock advanced tools.</p>
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

        <h1>Reflections</h1>

        {/* VIDEO LIST */}
        <div className="video-list">
          {videos.map((video, index) => (
            <div className="video-item" key={index}>

              <img src={video.img} alt="" />

              <div className="info">
                <h3>{video.title}</h3>
                <p>{video.category}</p>
              </div>

              <button onClick={() => openModal(video)}>
                Reflect
              </button>

            </div>
          ))}
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">

              <h2>{selectedVideo.title}</h2>

              <textarea
                placeholder="Write your reflection here..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
              />

              <div className="modal-actions">
                <button onClick={() => setShowModal(false)}>Close</button>
                <button onClick={handleSubmit}>Submit</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Reflection;