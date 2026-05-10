import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  MdDashboard,
  MdVideoLibrary,
  MdSearch,
  MdMovie,
  MdForum,
  MdQuestionAnswer,
  MdNotes,
  MdLogout,
  MdAccessTime,
  MdOutlineNotes,
  MdSend,
  MdClose,
} from "react-icons/md";

import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../services/firebase";

import "../styles/Reflection.css";

const Reflection = () => {

  const navigate =
    useNavigate();

  const [videos, setVideos] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedVideo, setSelectedVideo] =
    useState(null);

  const [showPopup, setShowPopup] =
    useState(false);

  const [reflection, setReflection] =
    useState("");

  const [videoReflections, setVideoReflections] =
    useState([]);

  /* USER */
  const userName =
    localStorage.getItem(
      "fullName"
    ) || "Student";

  const email =
    localStorage.getItem(
      "userEmail"
    ) || "";

  /* LOAD VIDEOS */
  useEffect(() => {

    fetchVideos();

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

        const data =
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setVideos(data);

      } catch (err) {

        console.log(err);

      }

    };

  /* OPEN REFLECTION */
  const openReflection =
    async (video) => {

      setSelectedVideo(video);

      setShowPopup(true);

      fetchReflections(
        video.id
      );

    };

  /* FETCH REFLECTIONS */
  const fetchReflections =
    async (videoId) => {

      try {

        const q = query(
          collection(
            db,
            "reflections"
          ),
          where(
            "videoId",
            "==",
            videoId
          )
        );

        const querySnapshot =
          await getDocs(q);

        const data =
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setVideoReflections(data);

      } catch (err) {

        console.log(err);

      }

    };

  /* SAVE REFLECTION */
  const handleSaveReflection =
    async () => {

      if (!reflection) {

        alert(
          "Please enter reflection"
        );

        return;

      }

      try {

        await addDoc(
          collection(
            db,
            "reflections"
          ),
          {
            videoId:
              selectedVideo.id,

            videoTitle:
              selectedVideo.title,

            reflection,

            userName,

            createdAt:
              serverTimestamp(),
          }
        );

        setReflection("");

        fetchReflections(
          selectedVideo.id
        );

      } catch (err) {

        console.log(err);

      }

    };

  /* FILTER */
  const filteredVideos =
    videos.filter((video) =>
      video.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  /* LOGOUT */
  const handleLogout =
    () => {

      localStorage.clear();

      navigate("/");

    };

  return (

    <div className="student-library-page">

      {/* SIDEBAR */}
      <div className="student-sidebar">

        <div>

          {/* LOGO */}
          <div className="student-sidebar-logo">

            <div className="logo-icon">
              🎬
            </div>

            <div>

              <h2>
                MotionIQ
              </h2>

              <p>
                Student Portal
              </p>

            </div>

          </div>

          {/* NAVIGATION */}
          <div className="student-nav-links">

            <button
              onClick={() =>
                navigate(
                  "/student-dashboard"
                )
              }
            >

              <MdDashboard />

              Dashboard

            </button>

            <button
              onClick={() =>
                navigate(
                  "/videos"
                )
              }
            >

              <MdVideoLibrary />

              Video Library

            </button>

            <button
              onClick={() =>
                navigate(
                  "/guided-questions"
                )
              }
            >

              <MdQuestionAnswer />

              Questions

            </button>

            <button className="active-link">

              <MdNotes />

              Reflections

            </button>

            <button
              onClick={() =>
                navigate(
                  "/discussion"
                )
              }
            >

              <MdForum />

              Discussions

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

            Logout

          </button>

        </div>

      </div>

      {/* MAIN */}
      <div className="student-library-main">

        {/* TOP */}
        <div className="library-top">

          <div>

            <h1>
              Reflections
            </h1>

            <p>
              Read and share reflections from videos
            </p>

          </div>

        </div>

        {/* SEARCH */}
        <div className="filter-bar">

          <div className="search-box">

            <MdSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search videos..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* VIDEOS */}
        <div className="student-video-grid">

          {filteredVideos.map(
            (video) => (

              <div
                className="student-video-card"
                key={video.id}
              >

                {/* IMAGE */}
                <div className="video-image-wrapper">

                  <img
                    src={
                      video.imageURL
                    }
                    alt={
                      video.title
                    }
                    className="student-video-image"
                  />

                </div>

                {/* CONTENT */}
                <div className="student-video-content">

                  <div className="student-video-top">

                    <div>

                      <h3>
                        {
                          video.title
                        }
                      </h3>

                      <span>
                        {
                          video.faculty
                        }
                      </span>

                    </div>

                    <div className="video-badge">

                      <MdMovie />

                      {
                        video.videoType
                      }

                    </div>

                  </div>

                  <p>
                    {
                      video.description
                    }
                  </p>

                  <div className="video-meta">

                    <div>

                      <MdAccessTime />

                      45 mins

                    </div>

                  </div>

                  {/* BUTTON */}
                  <div className="student-actions">

                    <button
                      className="watch-btn"
                      onClick={() =>
                        openReflection(
                          video
                        )
                      }
                    >

                      <MdOutlineNotes />

                      Open Reflections

                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* REFLECTION POPUP */}
      {showPopup && (

        <div className="popup-overlay">

          <div className="reflection-popup">

            {/* TOP */}
            <div className="popup-top">

              <div>

                <h2>
                  {
                    selectedVideo?.title
                  }
                </h2>

                <p>
                  Student Reflections
                </p>

              </div>

              {/* CLOSE */}
              <button
                className="close-popup-btn"
                onClick={() =>
                  setShowPopup(false)
                }
              >

                <MdClose />

              </button>

            </div>

            {/* LIST */}
            <div className="reflection-list">

              {videoReflections.length > 0 ? (

                videoReflections.map(
                  (item) => (

                    <div
                      className="reflection-item"
                      key={item.id}
                    >

                      {/* AVATAR */}
                      <div className="reflection-avatar">

                        {item.userName
                          ?.charAt(0)
                          ?.toUpperCase() || "S"}

                      </div>

                      {/* CONTENT */}
                      <div className="reflection-content">

                        <h4>
                          {item.userName}
                        </h4>

                        <p>
                          {item.reflection}
                        </p>

                      </div>

                    </div>

                  )
                )

              ) : (

                <div className="empty-box">

                  No reflections yet.

                </div>

              )}

            </div>

            {/* ADD */}
            <div className="add-reflection-box">

              <h3>
                Add Your Reflection
              </h3>

              <textarea
                placeholder="Write your reflection..."
                value={reflection}
                onChange={(e) =>
                  setReflection(
                    e.target.value
                  )
                }
              ></textarea>

              <button
                className="submit-reflection-btn"
                onClick={
                  handleSaveReflection
                }
              >

                <MdSend />

                Submit Reflection

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default Reflection;