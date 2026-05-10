// AdminEditVideo.jsx

import { useEffect, useState } from "react";

import {
  MdAdd,
  MdArrowBack,
  MdSave,
  MdDelete,
} from "react-icons/md";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  doc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

import "../styles/AdminEditVideo.css";

const AdminEditVideo = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const video =
    location.state?.video;

  /* =========================
     VIDEO STATES
  ========================= */
  const [title, setTitle] =
    useState(
      video?.title || ""
    );

  const [description,
    setDescription] =
      useState(
        video?.description ||
          ""
      );

  const [faculty,
    setFaculty] =
      useState(
        video?.faculty || ""
      );

  const [videoURL,
    setVideoURL] =
      useState(
        video?.videoURL || ""
      );

  const [imageURL,
    setImageURL] =
      useState(
        video?.imageURL || ""
      );

  /* =========================
     QUESTION STATES
  ========================= */
  const [questions,
    setQuestions] =
      useState([]);

  const [question,
    setQuestion] =
      useState("");

  const [option1,
    setOption1] =
      useState("");

  const [option2,
    setOption2] =
      useState("");

  const [option3,
    setOption3] =
      useState("");

  const [option4,
    setOption4] =
      useState("");

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
     UPDATE VIDEO
  ========================= */
  const handleUpdateVideo =
    async () => {

      try {

        await updateDoc(
          doc(
            db,
            "videos",
            video.id
          ),
          {
            title,
            description,
            faculty,
            videoURL,
            imageURL,
          }
        );

        alert(
          "Video Updated!"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Update Failed"
        );

      }

    };

  /* =========================
     ADD QUESTION
  ========================= */
  const handleAddQuestion =
    async () => {

      if (
        !question ||
        !option1 ||
        !option2 ||
        !option3 ||
        !option4
      ) {

        alert(
          "Complete all fields"
        );

        return;

      }

      try {

        await addDoc(
          collection(
            db,
            "guidedQuestions"
          ),
          {
            videoId:
              video.id,

            videoTitle:
              title,

            question,

            answers: [
              option1,
              option2,
              option3,
              option4,
            ],

            createdAt:
              new Date(),
          }
        );

        setQuestion("");

        setOption1("");

        setOption2("");

        setOption3("");

        setOption4("");

        /* REFRESH */
        window.location.reload();

      } catch (err) {

        console.log(err);

      }

    };

  /* =========================
     DELETE QUESTION
  ========================= */
  const handleDeleteQuestion =
    async (id) => {

      try {

        await deleteDoc(
          doc(
            db,
            "guidedQuestions",
            id
          )
        );

        /* REFRESH */
        window.location.reload();

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <div className="edit-page">

      {/* =========================
          TOP
      ========================= */}
      <div className="edit-top">

        <div>

          <h1>
            Edit Video
          </h1>

          <p>
            Manage video details
            and guided questions
          </p>

        </div>

        <button
          className="back-btn"
          onClick={() =>
            navigate(
              "/admin-videos"
            )
          }
        >

          <MdArrowBack />

          Back

        </button>

      </div>

      {/* =========================
          CONTENT
      ========================= */}
      <div className="edit-container">

        {/* =========================
            LEFT
        ========================= */}
        <div className="left-section">

          {/* VIDEO INFO */}
          <div className="edit-card">

            <h2>
              Video Information
            </h2>

            <div className="form-group">

              <label>
                Video Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                value={
                  description
                }
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>
                Faculty
              </label>

              <select
                value={faculty}
                onChange={(e) =>
                  setFaculty(
                    e.target.value
                  )
                }
              >

                <option>
                  School of Computing
                </option>

                <option>
                  School of Business
                </option>

                <option>
                  School of Engineering
                </option>

                <option>
                  School of Design
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>
                Thumbnail URL
              </label>

              <input
                type="text"
                value={imageURL}
                onChange={(e) =>
                  setImageURL(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>
                Video URL
              </label>

              <input
                type="text"
                value={videoURL}
                onChange={(e) =>
                  setVideoURL(
                    e.target.value
                  )
                }
              />

            </div>

            {/* SAVE */}
            <button
              className="save-btn"
              onClick={
                handleUpdateVideo
              }
            >

              <MdSave />

              Save Changes

            </button>

          </div>

          {/* =========================
              ADD QUESTION
          ========================= */}
          <div className="edit-card">

            <h2>
              Add Guided Question
            </h2>

            <div className="form-group">

              <label>
                Question
              </label>

              <textarea
                value={question}
                onChange={(e) =>
                  setQuestion(
                    e.target.value
                  )
                }
              />

            </div>

            {/* OPTIONS */}
            <div className="grid-2">

              <input
                type="text"
                placeholder="Option 1"
                value={option1}
                onChange={(e) =>
                  setOption1(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Option 2"
                value={option2}
                onChange={(e) =>
                  setOption2(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Option 3"
                value={option3}
                onChange={(e) =>
                  setOption3(
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Option 4"
                value={option4}
                onChange={(e) =>
                  setOption4(
                    e.target.value
                  )
                }
              />

            </div>

            {/* ADD BUTTON */}
            <button
              className="add-btn"
              onClick={
                handleAddQuestion
              }
            >

              <MdAdd />

              Add Question

            </button>

          </div>

        </div>

        {/* =========================
            RIGHT
        ========================= */}
        <div className="edit-card">

          <h2>
            Existing Questions
          </h2>

          <div className="question-list">

            {questions.map(
              (q) => (

                <div
                  className="question-card"
                  key={q.id}
                >

                  <div className="question-header">

                    <h3>
                      {q.question}
                    </h3>

                    <button
                      className="question-delete"
                      onClick={() =>
                        handleDeleteQuestion(
                          q.id
                        )
                      }
                    >

                      <MdDelete />

                    </button>

                  </div>

                  <ul>

                    {q.answers?.map(
                      (
                        answer,
                        index
                      ) => (

                        <li
                          key={index}
                        >

                          {answer}

                        </li>

                      )
                    )}

                  </ul>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminEditVideo;