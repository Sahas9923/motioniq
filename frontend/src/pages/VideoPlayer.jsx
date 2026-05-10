// VideoPlayer.jsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../services/firebase";

import "../styles/VideoPlayer.css";

const VideoPlayer = () => {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const video =
    location.state;

  /* =========================
     STATES
  ========================= */
  const [questions, setQuestions] =
    useState([]);

  const [showQuestions,
    setShowQuestions] =
      useState(false);

  const [showReflection,
    setShowReflection] =
      useState(false);

  const [reflection,
    setReflection] =
      useState("");

  const [selectedAnswers,
    setSelectedAnswers] =
      useState({});

  /* =========================
     LOAD QUESTIONS
  ========================= */
  useEffect(() => {

    const fetchQuestions =
      async () => {

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

        } catch (err) {

          console.log(err);

        }

      };

    if (video?.id) {

      fetchQuestions();

    }

  }, [video]);

  /* =========================
     NO VIDEO
  ========================= */
  if (!video) {

    return (

      <div className="player-page">

        <h2>
          No Video Selected
        </h2>

      </div>

    );

  }

  /* VIDEO SOURCE */
  const videoSrc =
    video.videoURL || video.url;

  const type =
    video.videoType || "YOUTUBE";

  /* =========================
     YOUTUBE EMBED
  ========================= */
  const getYouTubeEmbed =
    (url) => {

      if (!url)
        return "";

      if (
        url.includes("embed")
      )
        return url;

      const regExp =
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

      const match =
        url.match(regExp);

      return match
        ? `https://www.youtube.com/embed/${match[1]}?autoplay=1`
        : url;

    };

  /* =========================
     FINISH VIDEO
  ========================= */
  const handleFinishVideo =
    () => {

      if (
        questions.length > 0
      ) {

        setShowQuestions(
          true
        );

      } else {

        setShowReflection(
          true
        );

      }

    };

  /* =========================
     SELECT ANSWER
  ========================= */
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

  /* =========================
     SUBMIT QUESTIONS
  ========================= */
  const handleSubmitQuestions =
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
              video.id,

            videoTitle:
              video.title,

            answers:
              selectedAnswers,

            createdAt:
              serverTimestamp(),
          }
        );

        setShowQuestions(
          false
        );

        setShowReflection(
          true
        );

      } catch (err) {

        console.log(err);

      }

    };

  /* =========================
     SAVE REFLECTION
  ========================= */
  const handleSaveReflection =
    async () => {

      if (
        !reflection.trim()
      ) {

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
              video.id,

            videoTitle:
              video.title,

            reflection,

            createdAt:
              serverTimestamp(),
          }
        );

        alert(
          "Session Completed!"
        );

        setShowReflection(
          false
        );

        setReflection("");

        navigate(-1);

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <div className="player-page">

      <div className="player-container">

        {/* =========================
            TOP BAR
        ========================= */}
        <div className="player-top">

          <button
            className="back-btn"
            onClick={() =>
              navigate(-1)
            }
          >
            ← Back
          </button>

          <button
            className="finish-btn"
            onClick={
              handleFinishVideo
            }
          >
            Finish Video
          </button>

        </div>

        {/* =========================
            VIDEO
        ========================= */}
        <div className="video-wrapper">

          {/* YOUTUBE */}
          {type ===
            "YOUTUBE" && (

            <iframe
              src={
                getYouTubeEmbed(
                  videoSrc
                )
              }
              title={
                video.title
              }
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

          )}

          {/* UPLOAD */}
          {type ===
            "UPLOAD" && (

            <video controls>

              <source
                src={
                  videoSrc
                }
              />

            </video>

          )}

        </div>

        {/* =========================
            VIDEO INFO
        ========================= */}
        <div className="video-details">

          <h1>
            {video.title}
          </h1>

          <p>
            {video.description}
          </p>

          {video.faculty && (

            <span className="video-badge">

              {video.faculty}

            </span>

          )}

        </div>

      </div>

      {/* =========================
          QUESTIONS POPUP
      ========================= */}
      {showQuestions && (

        <div className="popup-overlay">

          <div className="popup-card">

            <h2>
              Guided Questions
            </h2>

            {questions.map(
              (
                q,
                index
              ) => (

                <div
                  className="question-box"
                  key={q.id}
                >

                  <h4>
                    Question {index + 1}
                  </h4>

                  <p>
                    {q.question}
                  </p>

                  {/* ANSWERS */}
                  <div className="answer-list">

                    {q.answers?.map(
                      (
                        answer,
                        i
                      ) => (

                        <label
                          className="answer-option"
                          key={i}
                        >

                          <input
                            type="radio"
                            name={q.id}
                            checked={
                              selectedAnswers[
                                q.id
                              ] ===
                              answer
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

            {/* ACTIONS */}
            <div className="popup-actions">

              <button
                className="later-btn"
                onClick={() =>
                  setShowQuestions(
                    false
                  )
                }
              >
                Later
              </button>

              <button
                className="continue-btn"
                onClick={
                  handleSubmitQuestions
                }
              >
                Submit Answers
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =========================
          REFLECTION POPUP
      ========================= */}
      {showReflection && (

        <div className="popup-overlay">

          <div className="popup-card">

            <h2>
              Reflection
            </h2>

            <textarea
              placeholder="Write your reflection here..."
              value={reflection}
              onChange={(e) =>
                setReflection(
                  e.target.value
                )
              }
            ></textarea>

            {/* ACTIONS */}
            <div className="popup-actions">

              <button
                className="later-btn"
                onClick={() =>
                  setShowReflection(
                    false
                  )
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

export default VideoPlayer;