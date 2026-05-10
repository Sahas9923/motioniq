import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  MdDashboard,
  MdVideoLibrary,
  MdForum,
  MdQuestionAnswer,
  MdNotes,
  MdLogout,
  MdSend,
  MdMovie,
} from "react-icons/md";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../services/firebase";

import "../styles/Discussion.css";

const Discussion = () => {

  const navigate =
    useNavigate();

  const [videos, setVideos] =
    useState([]);

  const [messages, setMessages] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [selectedVideo, setSelectedVideo] =
    useState(null);

  /* USER */
  const userName =
    localStorage.getItem(
      "fullName"
    ) || "Student";

  const email =
    localStorage.getItem(
      "userEmail"
    ) || "";

  /* LOAD */
  useEffect(() => {

    fetchVideos();

    fetchMessages();

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

  /* FETCH MESSAGES */
  const fetchMessages =
    async () => {

      try {

        const querySnapshot =
          await getDocs(
            collection(
              db,
              "discussions"
            )
          );

        const data =
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        /* SORT */
        data.sort(
          (a, b) => {

            const timeA =
              a.createdAt
                ?.seconds || 0;

            const timeB =
              b.createdAt
                ?.seconds || 0;

            return timeA - timeB;

          }
        );

        setMessages(data);

      } catch (err) {

        console.log(err);

      }

    };

  /* SEND */
  const sendMessage =
    async () => {

      if (
        !message.trim() ||
        !selectedVideo
      ) {

        return;

      }

      try {

        /* SAVE */
        await addDoc(
          collection(
            db,
            "discussions"
          ),
          {
            userName,

            email,

            message,

            videoId:
              selectedVideo.id,

            videoTitle:
              selectedVideo.title,

            videoImage:
              selectedVideo.imageURL,

            faculty:
              selectedVideo.faculty,

            createdAt:
              serverTimestamp(),
          }
        );

        /* CLEAR */
        setMessage("");

        /* REFRESH */
        fetchMessages();

      } catch (err) {

        console.log(err);

      }

    };

  /* LOGOUT */
  const handleLogout =
    () => {

      localStorage.clear();

      navigate("/");

    };

  return (

    <div className="discussion-page">

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

          {/* NAV */}
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
                  "/video-library"
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

            <button
              onClick={() =>
                navigate(
                  "/reflections"
                )
              }
            >

              <MdNotes />

              Reflections

            </button>

            <button className="active-link">

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
      <div className="discussion-main">

        {/* LEFT VIDEOS */}
        <div className="movie-list">

          <div className="section-title">

            <h2>
              Videos
            </h2>

          </div>

          {videos.map(
            (video) => (

              <div
                key={video.id}
                className={`movie-card ${
                  selectedVideo?.id ===
                  video.id
                    ? "active-movie"
                    : ""
                }`}
                onClick={() =>
                  setSelectedVideo(
                    video
                  )
                }
              >

                <img
                  src={
                    video.imageURL
                  }
                  alt={
                    video.title
                  }
                />

                <div>

                  <h4>
                    {video.title}
                  </h4>

                  <p>
                    {video.faculty}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

        {/* CHAT */}
        <div className="chat-section">

          {/* HEADER */}
          <div className="chat-header">

            <div>

              <h2>
                Discussion Room
              </h2>

              <p>

                {selectedVideo
                  ? selectedVideo.title
                  : "Select a video"}

              </p>

            </div>

            <div className="online-badge">

              <div className="online-dot"></div>

              Active Room

            </div>

          </div>

          {/* EMPTY */}
          {!selectedVideo && (

            <div className="empty-chat">

              <MdMovie
                size={60}
              />

              <h3>
                Select a Video
              </h3>

              <p>
                Open a discussion room
                by selecting a video
              </p>

            </div>

          )}

          {/* MESSAGES */}
          {selectedVideo && (

            <div className="chat-messages">

              {messages
                .filter(
                  (msg) =>
                    msg.videoId ===
                    selectedVideo.id
                )
                .map((msg) => (

                  <div
                    className="chat-message"
                    key={msg.id}
                  >

                    {/* AVATAR */}
                    <div className="chat-avatar">

                      {msg.userName
                        ?.charAt(0)
                        ?.toUpperCase()}

                    </div>

                    {/* BUBBLE */}
                    <div className="chat-bubble">

                      <h4>
                        {msg.userName}
                      </h4>

                      <p>
                        {msg.message}
                      </p>

                    </div>

                  </div>

                ))}

            </div>

          )}

          {/* INPUT */}
          {selectedVideo && (

            <div className="chat-input-area">

              <textarea
                placeholder="Write message..."
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
              ></textarea>

              <button
                className="send-btn"
                onClick={
                  sendMessage
                }
              >

                <MdSend />

                Send

              </button>

            </div>

          )}

        </div>

        {/* RIGHT ROOMS */}
        <div className="discussion-rooms">

          <div className="section-title">

            <h2>
              Chat Rooms
            </h2>

          </div>

          {videos.map(
            (video) => (

              <div
                key={video.id}
                className="room-card"
                onClick={() =>
                  setSelectedVideo(
                    video
                  )
                }
              >

                <div className="room-icon">

                  <MdMovie />

                </div>

                <div>

                  <h4>
                    {video.title}
                  </h4>

                  <p>
                    Discussion Room
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

};

export default Discussion;