import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../services/firebase";

import {
  MdPeople,
  MdPlayCircle,
  MdQuestionAnswer,
  MdForum,
  MdNotes
} from "react-icons/md";

import "../styles/AdminDashboard.css";

const AdminDashboard = () => {

  /* ================= STATES ================= */
  const navigate = useNavigate();

  const [videoCount, setVideoCount] =
    useState(0);

  const [userCount, setUserCount] =
    useState(0);

  const [questionCount, setQuestionCount] =
    useState(0);

  const [discussionCount, setDiscussionCount] =
    useState(0);

  const [reflectionCount, setReflectionCount] =
    useState(0);

  /* ================= FETCH ================= */

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      /* VIDEOS */
      const videosSnapshot =
        await getDocs(
          collection(db, "videos")
        );

      setVideoCount(
        videosSnapshot.size
      );

      /* USERS */
      const usersSnapshot =
        await getDocs(
          collection(db, "users")
        );

      setUserCount(
        usersSnapshot.size
      );

      /* GUIDED QUESTIONS */
      const questionsSnapshot =
        await getDocs(
          collection(
            db,
            "guidedQuestions"
          )
        );

      setQuestionCount(
        questionsSnapshot.size
      );

      /* DISCUSSIONS */
      const discussionsSnapshot =
        await getDocs(
          collection(
            db,
            "discussions"
          )
        );

      setDiscussionCount(
        discussionsSnapshot.size
      );

      /* REFLECTIONS */
      const reflectionsSnapshot =
        await getDocs(
          collection(
            db,
            "reflections"
          )
        );

      setReflectionCount(
        reflectionsSnapshot.size
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="admin-dashboard">

      {/* ================= TOPBAR ================= */}

      <div className="admin-topbar">

        <div>

          <h1>🎬 MotionIQ-Admin</h1>

          <p>
            Welcome back to MotionIQ Admin Panel
          </p>

        </div>

        <button className="upload-btn"
        
         onClick={() =>navigate("/admin-videos")
        }
        >

          <MdPlayCircle />

          View Library

        </button>

      </div>

      {/* ================= STATS ================= */}

      <div className="stats-grid">

        {/* USERS */}
        <div className="stat-card">

          <div className="stat-icon users">

            <MdPeople />

          </div>

          <div>

            <h2>{userCount}</h2>

            <p>Total Users</p>

          </div>

        </div>

        {/* VIDEOS */}
        <div className="stat-card">

          <div className="stat-icon videos">

            <MdPlayCircle />

          </div>

          <div>

            <h2>{videoCount}</h2>

            <p>Total Videos</p>

          </div>

        </div>

        {/* QUESTIONS */}
        <div className="stat-card">

          <div className="stat-icon questions">

            <MdQuestionAnswer />

          </div>

          <div>

            <h2>{questionCount}</h2>

            <p>Guided Questions</p>

          </div>

        </div>

        {/* REFLECTIONS */}
        <div className="stat-card">

          <div className="stat-icon reflections">

            <MdNotes />

          </div>

          <div>

            <h2>{reflectionCount}</h2>

            <p>Reflections</p>

          </div>

        </div>

        {/* DISCUSSIONS */}
        <div className="stat-card">

          <div className="stat-icon discussions">

            <MdForum />

          </div>

          <div>

            <h2>{discussionCount}</h2>

            <p>Discussions</p>

          </div>

        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="section">

        <h2>Quick Actions</h2>

        <div className="quick-grid">

          {/* VIEW LIBRARY */}
          <div className="quick-card" onClick={() =>navigate("/admin-videos")}>

            <MdPlayCircle />

            <span>View Library</span>

          </div>

          {/* MANAGE USERS */}
          <div className="quick-card">

            <MdPeople />

            <span>Manage Users</span>

          </div>


          {/* DISCUSSIONS */}
          <div className="quick-card">

            <MdForum />

            <span>Discussions</span>

          </div>

        </div>

      </div>

      {/* ================= RECENT ACTIVITY ================= */}

      <div className="section">

        <h2>Recent Activity</h2>

        <div className="activity-list">

          <div className="activity-item">

            <span>
              📹 New video uploaded
            </span>

            <small>
              2 mins ago
            </small>

          </div>

          <div className="activity-item">

            <span>
              👤 New student registered
            </span>

            <small>
              10 mins ago
            </small>

          </div>

          <div className="activity-item">

            <span>
              💬 New discussion posted
            </span>

            <small>
              30 mins ago
            </small>

          </div>

          <div className="activity-item">

            <span>
              📝 Reflection submitted
            </span>

            <small>
              1 hour ago
            </small>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;