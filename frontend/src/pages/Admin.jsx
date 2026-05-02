import { useState, useEffect } from "react";
import "../styles/Admin.css";

import { db, storage } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

const Admin = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [faculty, setFaculty] = useState("");

  const [videoType, setVideoType] = useState("UPLOAD");
  const [videoFile, setVideoFile] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchVideos = async () => {
    const snapshot = await getDocs(collection(db, "videos"));
    setVideos(snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  /* ================= HELPERS ================= */

  const getYouTubeId = (url) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const getEmbedURL = (id) => {
    return `https://www.youtube.com/embed/${id}`;
  };

  const getThumbnail = (id) => {
    return `https://img.youtube.com/vi/${id}/0.jpg`;
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFaculty("");
    setVideoFile(null);
    setImageFile(null);
    setYoutubeLink("");
    setEditingId(null);
  };

  /* ================= UPLOAD ================= */
  const handleUpload = async () => {
    try {
      setLoading(true);

      let videoURL = "";
      let imageURL = "";

      /* 🔥 YOUTUBE */
      if (videoType === "YOUTUBE") {
        const id = getYouTubeId(youtubeLink);

        if (!id) {
          alert("Invalid YouTube link");
          return;
        }

        videoURL = getEmbedURL(id);
        imageURL = getThumbnail(id);
      }

      /* 🔥 FILE UPLOAD */
      if (videoType === "UPLOAD") {
        if (!videoFile || !imageFile) {
          alert("Upload video and thumbnail");
          return;
        }

        const videoRef = ref(storage, `videos/${Date.now()}_${videoFile.name}`);
        await uploadBytes(videoRef, videoFile);
        videoURL = await getDownloadURL(videoRef);

        const imageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageURL = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "videos"), {
        title,
        description,
        faculty,
        videoURL,
        videoType,
        imageURL
      });

      alert("Uploaded!");
      resetForm();
      fetchVideos();

    } catch (err) {
      console.error(err);
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "videos", id));
    fetchVideos();
  };

  /* ================= EDIT ================= */
  const handleEdit = (video) => {
    setEditingId(video.id);
    setTitle(video.title);
    setDescription(video.description);
    setFaculty(video.faculty);
    setVideoType(video.videoType);
    setYoutubeLink(video.videoURL);
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    try {
      setLoading(true);

      let videoURL = "";
      let imageURL = "";

      if (videoType === "YOUTUBE") {
        const id = getYouTubeId(youtubeLink);

        if (!id) {
          alert("Invalid YouTube link");
          return;
        }

        videoURL = getEmbedURL(id);
        imageURL = getThumbnail(id);
      }

      await updateDoc(doc(db, "videos", editingId), {
        title,
        description,
        faculty,
        videoURL,
        imageURL
      });

      alert("Updated!");
      resetForm();
      fetchVideos();

    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */
  const filteredVideos =
    filter === "ALL"
      ? videos
      : videos.filter(v => v.faculty === filter);

  /* ================= UI ================= */
  return (
    <div className="admin-container">

      <div className="admin-grid">

        {/* LEFT */}
        <div className="card">

          <h2>{editingId ? "Update Content" : "Upload Content"}</h2>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
            <option value="">Select Faculty</option>
            <option>School of Computing</option>
            <option>School of Engineering</option>
            <option>School of Design</option>
          </select>

          <div className="toggle">
            <button
              className={videoType === "UPLOAD" ? "active" : ""}
              onClick={() => setVideoType("UPLOAD")}
            >
              Upload
            </button>

            <button
              className={videoType === "YOUTUBE" ? "active" : ""}
              onClick={() => setVideoType("YOUTUBE")}
            >
              YouTube
            </button>
          </div>

          {videoType === "UPLOAD" ? (
            <>
              <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} />
              <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
            </>
          ) : (
            <input
              placeholder="Paste YouTube link"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
          )}

          <button
            className="submit-btn"
            onClick={editingId ? handleUpdate : handleUpload}
          >
            {loading ? "Processing..." : editingId ? "Update" : "Upload"}
          </button>

        </div>

        {/* RIGHT */}
        <div className="card">

          <h2>Manage Content</h2>

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="ALL">All</option>
            <option>School of Computing</option>
            <option>School of Engineering</option>
            <option>School of Design</option>
          </select>

          <div className="video-list">

            {filteredVideos.map(video => (
              <div key={video.id} className="video-card">

                <img src={video.imageURL} alt="" />

                <h4>{video.title}</h4>
                <p>{video.description}</p>

                <div className="actions">
                  <button onClick={() => handleEdit(video)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(video.id)}>
                    Delete
                  </button>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Admin;