import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/fantasy/index.css";
import "./Video.css";
import { useSelector } from "react-redux";

function Video({ song }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const currentUser = useSelector((state) => state.users.currentUser);
  const options = {
    autoplay: false,
    controls: true,
    controlBar: {
      pictureInPictureToggle: currentUser?.plan === "Premium",
    },
    sources: [
      {
        src: song.content,
        type: "video/mp4",
      },
    ],
  };

  useEffect(() => {
    const player = playerRef.current;
    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      playerRef.current = videojs(videoElement, options);
    }

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="video-cont">
      <div data-vjs-player>
        <video
          ref={videoRef}
          preload="false"
          poster={song?.cover}
          className={`video-js vjs-big-play-centered vjs-theme-fantasy`}
        ></video>
      </div>
    </div>
  );
}

export default Video;
