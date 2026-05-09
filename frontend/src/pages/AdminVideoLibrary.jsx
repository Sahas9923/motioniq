// AdminVideoLibrary.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MdSearch,
  MdAdd,
  MdMovie,
  MdPlayCircle,
  MdDelete,
  MdEdit,
} from "react-icons/md";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../services/firebase";

import "../styles/AdminVideoLibray.css";

const AdminVideoLibrary = () => {

  const navigate = useNavigate();

  const [videos, setVideos] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [
    facultyFilter,
    setFacultyFilter,
  ] = useState("");

  /* FETCH VIDEOS */
  useEffect(() => {

    fetchVideos();

  }, []);

  const fetchVideos = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "videos")
        );

      const data =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      /* RECENT FIRST */
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

  /* DELETE */
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this video?"
        );

      if (!confirmDelete) return;

      try {

        await deleteDoc(
          doc(db, "videos", id)
        );

        setVideos(
          videos.filter(
            (video) =>
              video.id !== id
          )
        );

      } catch (err) {

        console.log(err);

        alert("Delete Failed");

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

  return (

    <div className="admin-library">

      {/* TOP */}
      <div className="library-top">

        {/* LEFT */}
        <div className="library-left">

          <button
            className="back-circle-btn"
            onClick={() =>
              navigate(
                "/admin-dashboard"
              )
            }
          >

            ←

          </button>

          <div>

            <h1>
              Video Library
            </h1>

            <p>
              Manage uploaded
              educational videos
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <button
          className="upload-btn"
          onClick={() =>
            navigate(
              "/admin-upload"
            )
          }
        >

          <MdAdd />

          Upload Video

        </button>

      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">

        {/* SEARCH */}
        <div className="search-box">

          <MdSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        {/* FACULTY FILTER */}
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

      {/* VIDEO GRID */}
      <div className="video-list">

        {filteredVideos.length >
        0 ? (

          filteredVideos.map(
            (video) => (

              <div
                className="video-card"
                key={video.id}
              >

                {/* IMAGE */}
                <img
                  src={
                    video.imageURL
                  }
                  alt={video.title}
                  className="video-image"
                />

                {/* CONTENT */}
                <div className="video-content">

                  <div className="video-top">

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

                    <div className="video-type">

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

                  {/* ACTIONS */}
                  <div className="video-actions">

                    {/* WATCH */}
                    <button
                      className="watch-btn"
                      onClick={() =>
                        navigate(
                          "/player",
                          {
                            state:
                              {
                                videoURL:
                                  video.videoURL,
                                title:
                                  video.title,
                                description:
                                  video.description,
                              },
                          }
                        )
                      }
                    >

                      <MdPlayCircle />

                      Watch

                    </button>

                    {/* EDIT */}
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(
                          "/admin-edit-video",
                          {
                            state:
                              {
                                video,
                              },
                          }
                        )
                      }
                    >

                      <MdEdit />

                      Edit

                    </button>

                    {/* DELETE */}
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          video.id
                        )
                      }
                    >

                      <MdDelete />

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            )
          )

        ) : (

          <div className="empty-state">

            <h2>
              No Videos Found
            </h2>

            <p>
              Try changing search
              or filters
            </p>

          </div>

        )}

      </div>

    </div>

  );

};

export default AdminVideoLibrary;