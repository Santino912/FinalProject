import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Box } from "@mui/material";
import styles from "./PopularPost.module.css";

const PopularPost = ({ post }) => {
  const [likes, setLikes] = useState();

  useEffect(() => {
    getLikes();
  }, []);

  async function getLikes() {
    if (post._id === undefined) return;
    const res = await axios.get(`/likes/posts/${post._id}`);
    setLikes(res.data);
  }

  return (
    <Box className={styles.containerSong}>
      <Box className={styles.songFirstHalf}>
        <img src={post.cover} alt={`${post.cover}`} />
        <p className={styles.songFirstHalfTitle}>{post.title}</p>
      </Box>
      <Box className={styles.songSecondHalf}>
        <p style={{ minWeigth: "30px" }}>
          <FontAwesomeIcon icon={faHeart} />{" "}
          {likes?.filter((likes) => likes.isActive)?.length}
        </p>
      </Box>
    </Box>
  );
};

export default PopularPost;
