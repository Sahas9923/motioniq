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
} from "react-icons/md";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../services/firebase";

import "../styles/VideoLibrary.css";

const StudentVideoLibrary = () => {

  const navigate =
    useNavigate();

  const [videos, setVideos] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [
    facultyFilter,
    setFacultyFilter,
  ] = useState("");

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

        data.sort(
          (a, b) =>
            b.createdAt?.seconds -
            a.createdAt?.seconds
        );

        setVideos(data);

      } catch (err) {

        console.log(err);

      }

    };

  /* FILTER */
  const filteredVideos =
    videos.filter((video) => {

      const matchesSearch =
        video.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFaculty =
        facultyFilter === "" ||
        video.faculty ===
          facultyFilter;

      return (
        matchesSearch &&
        matchesFaculty
      );

    });

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

            <button className="active-link">

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
              Video Library
            </h1>

            <p>
              Explore cinematic
              educational content
            </p>

          </div>

        </div>

        {/* FILTER */}
        <div className="filter-bar">

          {/* SEARCH */}
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

          {/* FACULTY */}
          <select
            className="faculty-filter"
            value={facultyFilter}
            onChange={(e) =>
              setFacultyFilter(
                e.target.value
              )
            }
          >

            <option value="">
              All Faculties
            </option>

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

                  <div className="play-overlay">

                    <MdPlayCircle />

                  </div>

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

                    <div>

                      HD Quality

                    </div>

                  </div>

                  {/* WATCH */}
                  <div className="student-actions">

                    <button
                      className="watch-btn"
                      onClick={() =>

                        navigate(
                          "/player",
                          {
                            state:{

                              id:
                                video.id,

                              videoURL:
                                video.videoURL,

                              videoType:
                                video.videoType,

                              title:
                                video.title,

                              description:
                                video.description,

                              faculty:
                                video.faculty,

                              imageURL:
                                video.imageURL,

                            },
                          }
                        )

                      }
                    >

                      <MdPlayCircle />

                      Watch Now

                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

};

export default StudentVideoLibrary;