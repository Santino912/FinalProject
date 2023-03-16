import React, { useEffect, useState } from "react";
import styles from "./PopularPost.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Box } from "@mui/material";

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
        <img src={post.cover} alt="" />
        <p>{post.title}</p>
      </Box>
      <Box className={styles.songSecondHalf}>
        <p>
          <FontAwesomeIcon icon={faHeart} />{" "}
          {likes?.filter((likes) => likes.isActive)?.length}
        </p>
      </Box>
    </Box>
  );
};

export default PopularPost;
