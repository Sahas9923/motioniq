import {
  MdDashboard,
  MdVideoLibrary,
  MdQuestionAnswer,
  MdForum,
  MdNotes,
  MdLogout,
  MdPlayCircle,
  MdAccessTime,
  MdSchool,
  MdTrendingUp,
} from "react-icons/md";

import { useNavigate } from "react-router-dom";

import "../styles/StudentDashboard.css";

const StudentDashboard = () => {

  const navigate = useNavigate();

  const userName =
    localStorage.getItem("fullName") ||
    "Student";

  const email =
    localStorage.getItem("userEmail") ||
    "";

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <div className="student-dashboard-page">

      {/* SIDEBAR */}
      <div className="student-sidebar">

        <div>

          {/* LOGO */}
          <div className="student-sidebar-logo">

            <div className="logo-icon">
              🎬
            </div>

            <div>

              <h2>MotionIQ</h2>

              <p>Student Portal</p>

            </div>

          </div>

          {/* NAVIGATION */}
          <div className="student-nav-links">

            <button className="active-link">

              <MdDashboard />

              Dashboard

            </button>

            <button
              onClick={() =>
                navigate("/video-library")
              }
            >

              <MdVideoLibrary />

              Video Library

            </button>

            <button
              onClick={() =>
                navigate("/guided-questions")
              }
            >

              <MdQuestionAnswer />

              Questions

            </button>

            <button
              onClick={() =>
                navigate("/discussion")
              }
            >

              <MdForum />

              Discussions

            </button>

            <button
              onClick={() =>
                navigate("/reflections")
              }
            >

              <MdNotes />

              Reflections

            </button>

          </div>

        </div>

        {/* PROFILE */}
        <div>

          <div className="student-profile-box">

            <div className="profile-circle">

              {userName
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            <div>

              <h4>{userName}</h4>

              <p>{email}</p>

            </div>

          </div>

          {/* LOGOUT */}
          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            <MdLogout />

            Logout

          </button>

        </div>

      </div>

      {/* MAIN */}
      <div className="student-dashboard-main">

        {/* TOP */}
        <div className="dashboard-top">

          <div>

            <h1>
              Welcome Back 👋
            </h1>

            <p>
              Continue your cinematic
              learning journey
            </p>

          </div>

        </div>

        {/* STATS */}
        <div className="dashboard-stats">

          <div className="stat-card">

            <div className="stat-icon blue">

              <MdPlayCircle />

            </div>

            <div>

              <h2>24</h2>

              <p>Videos Watched</p>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon purple">

              <MdAccessTime />

            </div>

            <div>

              <h2>18h</h2>

              <p>Learning Hours</p>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">

              <MdSchool />

            </div>

            <div>

              <h2>12</h2>

              <p>Completed Lessons</p>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon orange">

              <MdTrendingUp />

            </div>

            <div>

              <h2>89%</h2>

              <p>Progress Rate</p>

            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="dashboard-content">

          {/* LEFT */}
          <div className="dashboard-left">

            <div className="dashboard-card">

              <div className="card-header">

                <h3>Continue Watching</h3>

                <button>
                  View All
                </button>

              </div>

              <div className="continue-card">

                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  alt=""
                />

                <div className="continue-overlay">

                  <h2>
                    React Fundamentals
                  </h2>

                  <p>
                    Continue where you left off
                  </p>

                  <button>

                    <MdPlayCircle />

                    Resume

                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="dashboard-right">

            <div className="dashboard-card">

              <div className="card-header">

                <h3>Recent Activity</h3>

              </div>

              <div className="activity-list">

                <div className="activity-item">

                  <div className="activity-dot"></div>

                  <div>

                    <h4>
                      Watched UI Design Video
                    </h4>

                    <p>
                      2 hours ago
                    </p>

                  </div>

                </div>

                <div className="activity-item">

                  <div className="activity-dot"></div>

                  <div>

                    <h4>
                      Completed Reflection
                    </h4>

                    <p>
                      Yesterday
                    </p>

                  </div>

                </div>

                <div className="activity-item">

                  <div className="activity-dot"></div>

                  <div>

                    <h4>
                      Joined Discussion Forum
                    </h4>

                    <p>
                      2 days ago
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default StudentDashboard;