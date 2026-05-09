// UploadVideo.jsx

import { useState } from "react";

import {
  MdImage,
  MdVideocam,
  MdArrowBack,
  MdUpload,
} from "react-icons/md";

import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import {
  db,
  storage,
} from "../services/firebase";

import "../styles/AdminUploadVideo.css";

const UploadVideo = () => {

  const navigate = useNavigate();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [faculty, setFaculty] =
    useState("");

  const [videoType, setVideoType] =
    useState("UPLOAD");

  const [thumbnail, setThumbnail] =
    useState("");

  const [videoURL, setVideoURL] =
    useState("");

  const [thumbnailFile, setThumbnailFile] =
    useState(null);

  const [videoFile, setVideoFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  /* UPLOAD */
  const handleUpload = async () => {

    try {

      setLoading(true);

      let imageURL = thumbnail;
      let finalVideoURL = videoURL;

      /* THUMBNAIL */
      if (thumbnailFile) {

        const imageRef = ref(
          storage,
          `images/${Date.now()}_${thumbnailFile.name}`
        );

        await uploadBytes(
          imageRef,
          thumbnailFile
        );

        imageURL =
          await getDownloadURL(imageRef);

      }

      /* VIDEO */
      if (
        videoType === "UPLOAD" &&
        videoFile
      ) {

        const videoRef = ref(
          storage,
          `videos/${Date.now()}_${videoFile.name}`
        );

        await uploadBytes(
          videoRef,
          videoFile
        );

        finalVideoURL =
          await getDownloadURL(videoRef);

      }

      /* SAVE FIRESTORE */
      await addDoc(
        collection(db, "videos"),
        {
          title,
          description,
          faculty,
          videoType,
          imageURL,
          videoURL: finalVideoURL,
          createdAt: new Date(),
        }
      );

      alert("Video Uploaded!");

      navigate("/admin-videos");

    } catch (err) {

      console.log(err);

      alert("Upload Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="upload-page">

      {/* TOP */}
      <div className="upload-top">

        <div>

          <h1>
            Upload Video
          </h1>

          <p>
            Add educational cinematic content
          </p>

        </div>

        <button
          className="back-btn"
          onClick={() =>
            navigate("/admin-videos")
          }
        >

          <MdArrowBack />

          Back

        </button>

      </div>

      {/* CONTAINER */}
      <div className="upload-container">

        {/* FORM */}
        <div className="upload-form">

          {/* TITLE */}
          <div className="form-group">

            <label>
              Video Title
            </label>

            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>

          {/* DESCRIPTION */}
          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

          </div>

          {/* FACULTY */}
          <div className="form-group">

            <label>
              Faculty
            </label>

            <select
              value={faculty}
              onChange={(e) =>
                setFaculty(e.target.value)
              }
            >

              <option value="">
                Select Faculty
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

          {/* TYPE */}
          <div className="form-group">

            <label>
              Video Type
            </label>

            <select
              value={videoType}
              onChange={(e) =>
                setVideoType(e.target.value)
              }
            >

              <option>
                UPLOAD
              </option>

              <option>
                YOUTUBE
              </option>

            </select>

          </div>

          {/* THUMBNAIL */}
          <div className="form-group">

            <label>
              Thumbnail
            </label>

            <div className="upload-file-box">

              <MdImage />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                  const file =
                    e.target.files[0];

                  if (file) {

                    setThumbnailFile(file);

                    setThumbnail(
                      URL.createObjectURL(file)
                    );

                  }

                }}
              />

            </div>

          </div>

          {/* VIDEO */}
          <div className="form-group">

            <label>
              {videoType === "UPLOAD"
                ? "Upload Video"
                : "YouTube URL"}
            </label>

            {videoType === "UPLOAD" ? (

              <div className="upload-file-box">

                <MdUpload />

                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {

                    const file =
                      e.target.files[0];

                    if (file) {

                      setVideoFile(file);

                      setVideoURL(
                        URL.createObjectURL(file)
                      );

                    }

                  }}
                />

              </div>

            ) : (

              <div className="input-icon-box">

                <MdVideocam />

                <input
                  type="text"
                  placeholder="Paste YouTube URL"
                  value={videoURL}
                  onChange={(e) =>
                    setVideoURL(e.target.value)
                  }
                />

              </div>

            )}

          </div>

          {/* BUTTON */}
          <button
            className="upload-save-btn"
            onClick={handleUpload}
          >

            {loading
              ? "Uploading..."
              : "Upload Video"}

          </button>

        </div>

        {/* PREVIEW */}
        <div className="preview-card">

          <h2>
            Live Preview
          </h2>

          {thumbnail ? (

            <img
              src={thumbnail}
              alt="preview"
              className="preview-image"
            />

          ) : (

            <div className="empty-preview">
              No Thumbnail
            </div>

          )}

          <div className="preview-info">

            <h3>
              {title || "Video Title"}
            </h3>

            <span>
              {faculty || "Faculty"}
            </span>

            <p>
              {description ||
                "Video description preview"}
            </p>

          </div>

          {videoURL && videoType === "UPLOAD" && (

            <video
              src={videoURL}
              controls
              className="preview-video"
            />

          )}

          {videoURL &&
            videoType === "YOUTUBE" && (

            <iframe
              className="youtube-preview"
              src={videoURL.replace(
                "watch?v=",
                "embed/"
              )}
              title="YouTube Preview"
              allowFullScreen
            ></iframe>

          )}

        </div>

      </div>

    </div>

  );

};

export default UploadVideo;