import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/VideoPlayer.css";

const VideoPlayer = () => {

  const location = useLocation();
  const video = location.state;

  // prevent crash
  if (!video) {
    return <h2 style={{ padding: "20px" }}>No video selected</h2>;
  }

  return (
    <div className="player-page">

      <div className="player-container">

        {/* VIDEO */}
        <div className="video-wrapper">
          <iframe
            src={`${video.url}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>

        {/* INFO */}
        <div className="video-info">
          <h2>{video.title}</h2>
          <p>{video.description}</p>
        </div>

      </div>

    </div>
  );
};

export default VideoPlayer;