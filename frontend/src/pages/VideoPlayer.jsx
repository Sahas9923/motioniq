import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/VideoPlayer.css";

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const video = location.state;

  if (!video) {
    return (
      <div className="player-page">
        <h2>No video selected</h2>
      </div>
    );
  }

  // 🔥 SUPPORT BOTH OLD + FIREBASE STRUCTURE
  const videoSrc = video.videoURL || video.url;
  const type = video.videoType || "YOUTUBE";

  // 🔥 FIX YOUTUBE EMBED ISSUE
  const getYouTubeEmbed = (url) => {
    if (!url) return "";

    // already embed
    if (url.includes("embed")) return url;

    // extract video ID
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

    const match = url.match(regExp);

    return match
      ? `https://www.youtube.com/embed/${match[1]}?autoplay=1`
      : url;
  };

  return (
    <div className="player-page">

      <div className="player-container">

        {/* 🔙 BACK */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* 🎥 VIDEO */}
        <div className="video-wrapper">

          {/* YOUTUBE */}
          {type === "YOUTUBE" && (
            <iframe
              src={getYouTubeEmbed(videoSrc)}
              title={video.title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          )}

          {/* UPLOADED VIDEO */}
          {type === "UPLOAD" && (
            <video controls>
              <source src={videoSrc} />
            </video>
          )}

        </div>

        {/* 📄 INFO */}
        <div className="video-info">
          <h2>{video.title}</h2>
          <p>{video.description}</p>

          {video.faculty && (
            <span className="video-tag">{video.faculty}</span>
          )}
        </div>

      </div>
    </div>
  );
};

export default VideoPlayer;