import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/StudentDashboard.css";

import {
  MdDashboard,
  MdPlayCircle,
  MdQuestionAnswer,
  MdNotes,
  MdForum,
  MdSettings,
  MdLogout
} from "react-icons/md";

const StudentDashboard = () => {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

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
          <li className="active"><MdDashboard /> Dashboard</li>
          <li><Link to="/videos"><MdPlayCircle /> Videos</Link></li>
          <li><Link to="/guided-questions"><MdQuestionAnswer /> Guided Questions</Link></li>
          <li><Link to="/reflections"><MdNotes /> Reflections</Link></li>
          <li><Link to="/discussion"><MdForum /> Discussion</Link></li>
        </ul>

        {/* SETTINGS */}
        <div className="bottom-menu">
          <div className="settings-container">
            <p onClick={() => setShowSettings(!showSettings)}>
              <MdSettings /> Settings
            </p>

            {showSettings && (
              <div className="settings-dropdown">
                <button onClick={handleLogout}>
                  <MdLogout /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <div className="header">
          <h1>Dashboard</h1>
          <input placeholder="Search videos..." />
        </div>

        {/* EMPTY STATE / CONTENT */}
        <div className="empty-state">
          <h2>No content yet</h2>
          <p>Start by exploring videos or guided questions.</p>

          <div className="actions">
            <Link to="/videos" className="primary-btn">Browse Videos</Link>
            <Link to="/guided-questions" className="outline-btn">Answer Questions</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;