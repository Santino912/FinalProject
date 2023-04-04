import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import PlayButton from "../PlayButton/PlayButton";
import LikeButton from "../post/LikeButton";

import styles from "../likedSongs/CardSong.module.css";
import style from "../likedVideos/cardVideo.module.css";

export default function CardSong({ arrayMap, post, index }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const res = await axios.get(`/users/${post?.user?._id}`);
      setUser(res.data);
    }
    getUser();
  }, [post?.user?._id]);

  return (
    <Box
      className={`${styles.containerSong} ${style.containerSong}`}
      style={{ height: "50px", padding: "0", borderRadius: "6px" }}
    >
      <Box
        className={styles.songContainer}
        onClick={() => navigate(`/home/post/${post._id}`)}
      >
        <Box>
          <p style={{ textAlign: "center", width: "10px" }}>{index + 1}</p>
        </Box>
        <Box>
          <img
            src={post?.cover}
            alt=""
            style={{ width: "40px", height: "40px", borderRadius: "6px" }}
          />
        </Box>
        <Box
          style={{
            fontWeight: "600",
            color: "white",
            fontSize: "18px",
          }}
        >
          <p className={style.titlePostText}>{post.title}</p>
        </Box>
      </Box>
      <Box className={styles.likeButtonContainer}>
        <Link
          className={styles.linkUserName}
          to={`/home/explore/${post?.user?._id}`}
        >
          <Typography
            sx={{
              "&:hover": { color: "white", cursor: "pointer" },
              color: "#C4C4C4",
            }}
            variant="body1"
          >
            {user && user.name}
          </Typography>
        </Link>
        <LikeButton post={post} />
        <PlayButton tracks={arrayMap} track={post} trackIndex={index} />
      </Box>
    </Box>
  );
}
