import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  MdDashboard,
  MdVideoLibrary,
  MdSearch,
  MdMovie,
  MdPlayCircle,
  MdForum,
  MdQuestionAnswer,
  MdNotes,
  MdLogout,
  MdAccessTime,
  MdCheckCircle,
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

import "../styles/GuidedQuestions.css";

const GuidedQuestions = () => {

  const navigate =
    useNavigate();

  const [videos, setVideos] =
    useState([]);

  const [questions, setQuestions] =
    useState([]);

  const [selectedVideo, setSelectedVideo] =
    useState(null);

  const [selectedAnswers, setSelectedAnswers] =
    useState({});

  const [showPopup, setShowPopup] =
    useState(false);

  const [showReflection, setShowReflection] =
    useState(false);

  const [reflection, setReflection] =
    useState("");

  const [search, setSearch] =
    useState("");

  /* USER */
  const userName =
    localStorage.getItem(
      "fullName"
    ) || "Student";

  const email =
    localStorage.getItem(
      "userEmail"
    ) || "";

  /* FETCH VIDEOS */
  useEffect(() => {

    fetchVideos();

  }, []);

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

  /* OPEN QUESTIONS */
  const openQuestions =
    async (video) => {

      setSelectedVideo(video);

      try {

        const q = query(
          collection(
            db,
            "guidedQuestions"
          ),
          where(
            "videoId",
            "==",
            video.id
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

        setQuestions(data);

        setShowPopup(true);

      } catch (err) {

        console.log(err);

      }

    };

  /* SELECT ANSWER */
  const handleSelectAnswer =
    (
      questionId,
      answer
    ) => {

      setSelectedAnswers(
        (prev) => ({
          ...prev,
          [questionId]:
            answer,
        })
      );

    };

  /* SUBMIT */
  const handleSubmit =
    async () => {

      if (
        Object.keys(
          selectedAnswers
        ).length <
        questions.length
      ) {

        alert(
          "Please answer all questions"
        );

        return;

      }

      try {

        await addDoc(
          collection(
            db,
            "questionAnswers"
          ),
          {
            videoId:
              selectedVideo.id,

            videoTitle:
              selectedVideo.title,

            answers:
              selectedAnswers,

            createdAt:
              serverTimestamp(),
          }
        );

        setShowPopup(false);

        setShowReflection(true);

      } catch (err) {

        console.log(err);

      }

    };

  /* SAVE REFLECTION */
  const handleSaveReflection =
    async () => {

      try {

        await addDoc(
          collection(
            db,
            "reflections"
          ),
          {
            videoId:
              selectedVideo.id,

            reflection,

            createdAt:
              serverTimestamp(),
          }
        );

        alert(
          "Reflection Saved!"
        );

        setShowReflection(false);

        setReflection("");

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

  /* FILTER */
  const filteredVideos =
    videos.filter((video) =>
      video.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

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
                  "/videos"
                )
              }
            >

              <MdVideoLibrary />

              Video Library

            </button>

            <button className="active-link">

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

            <button
            
            onClick={() =>
                navigate(
                  "/discussion"
                )
              }>

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
              Guided Questions
            </h1>

            <p>
              Answer questions related to videos
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

        {/* GRID */}
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
                        openQuestions(
                          video
                        )
                      }
                    >

                      <MdPlayCircle />

                      Answer Questions

                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* QUESTIONS POPUP */}
      {showPopup && (

        <div className="popup-overlay">

          <div className="popup-card">

            <div className="popup-header">

              <div>

                <h2>
                  Guided Questions
                </h2>

                <p>
                  Answer all questions
                </p>

              </div>

              <div className="question-count">

                {questions.length}

                <span>
                  Questions
                </span>

              </div>

            </div>

            <div className="questions-wrapper">

              {questions.map(
                (
                  q,
                  index
                ) => (

                  <div
                    className="question-box"
                    key={q.id}
                  >

                    <div className="question-top">

                      <div className="question-number">

                        {index + 1}

                      </div>

                      <h4>
                        {q.question}
                      </h4>

                    </div>

                    <div className="answer-list">

                      {q.answers?.map(
                        (
                          answer,
                          i
                        ) => (

                          <label
                            className={`answer-option ${
                              selectedAnswers[
                                q.id
                              ] === answer
                                ? "selected-answer"
                                : ""
                            }`}
                            key={i}
                          >

                            <input
                              type="radio"
                              name={q.id}
                              checked={
                                selectedAnswers[
                                  q.id
                                ] === answer
                              }
                              onChange={() =>
                                handleSelectAnswer(
                                  q.id,
                                  answer
                                )
                              }
                            />

                            <span>
                              {answer}
                            </span>

                          </label>

                        )
                      )}

                    </div>

                  </div>

                )
              )}

            </div>

            <div className="popup-actions">

              <button
                className="later-btn"
                onClick={() =>
                  setShowPopup(false)
                }
              >
                Later
              </button>

              <button
                className="continue-btn"
                onClick={
                  handleSubmit
                }
              >

                <MdCheckCircle />

                Submit Answers

              </button>

            </div>

          </div>

        </div>

      )}

      {/* REFLECTION */}
      {showReflection && (

        <div className="popup-overlay">

          <div className="reflection-card">

            <h2>
              Reflection
            </h2>

            <p>
              Share your learning from this session.
            </p>

            <textarea
              placeholder="Write reflection..."
              value={reflection}
              onChange={(e) =>
                setReflection(
                  e.target.value
                )
              }
            ></textarea>

            <div className="reflection-actions">

              <button
                className="later-btn"
                onClick={() =>
                  setShowReflection(false)
                }
              >
                Later
              </button>

              <button
                className="continue-btn"
                onClick={
                  handleSaveReflection
                }
              >
                Finish Session
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default GuidedQuestions;