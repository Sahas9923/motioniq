import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Layout.css";

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

const Layout = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ✅ active link highlight
  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard">

      {/* 🔥 SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">🎬 MotionIQ</h2>
        <h4 className="portal">Student Portal</h4>

        <ul className="menu">
          <li className={isActive("/student-dashboard") ? "active" : ""}>
            <Link to="/student-dashboard"><MdDashboard /> Dashboard</Link>
          </li>

          <li className={isActive("/videos") ? "active" : ""}>
            <Link to="/videos"><MdPlayCircle /> Videos</Link>
          </li>

          <li className={isActive("/guided-questions") ? "active" : ""}>
            <Link to="/guided-questions"><MdQuestionAnswer /> Guided Questions</Link>
          </li>

          <li className={isActive("/reflections") ? "active" : ""}>
            <Link to="/reflections"><MdNotes /> Reflections</Link>
          </li>

          <li className={isActive("/discussion") ? "active" : ""}>
            <Link to="/discussion"><MdForum /> Discussion</Link>
          </li>

          <li>
            <MdFeedback /> Feedback
          </li>
        </ul>

        {/* 🔥 BOTTOM */}
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

          {/* 🔥 PREMIUM */}
          <div className="premium">
            <p className="premium-title">Premium Access</p>
            <p>Unlock advanced tools.</p>
            <button>Upgrade Now</button>
          </div>
        </div>
      </div>

      {/* 🔥 MAIN */}
      <div className="main">
        {children}
      </div>
    </div>
  );
};

export default Layout;