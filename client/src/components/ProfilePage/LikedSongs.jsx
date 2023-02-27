import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/features/users/usersGetSlice";
import styles from "./LikedSongs.module.css";
import heart from "../../images/heartLikes.png";
import { Box } from "@mui/material";

const LikedSongs = (_id) => {
  const dispatch = useDispatch();
  const profileUser = useSelector((state) => state.users.user);
  const allUserLikes = useSelector((state) => state.users.userLikes);
  const [userLikes, setUserLikes] = useState(
    allUserLikes.filter((likes) => likes.isActive)
  );
  const allPosts = useSelector((state) => state.posts.postList);

  useEffect(() => {
    dispatch(getUserById(_id));
  }, [dispatch]);

  useEffect(() => {
    setUserLikes(allUserLikes.filter((likes) => likes.isActive));
  }, [allUserLikes]);

  function likePostCover(_id) {
    const postLiked = allPosts.find((post) => post._id === _id);
    return postLiked;
  }

  return (
    <Box className={styles.containerLikedSongs}>
      <h3>Liked Songs</h3>
      <Box className={styles.likedSongs}>
        {userLikes.length > 0 ? (
          <Box className={styles.containerImageHeart}>
            <img
              className={styles.coverLikedSongs}
              src={likePostCover(userLikes[userLikes.length - 1].postId)?.cover}
              alt=""
            />
            <img className={styles.heart} src={heart} alt="" />
          </Box>
        ) : null}
        {userLikes.length < 1 ? (
          <p>{profileUser.name} has not liked any post</p>
        ) : userLikes.length === 1 ? (
          <p>
            {profileUser.name} has liked {userLikes.length} song
          </p>
        ) : (
          <p>
            {profileUser.name} has liked {userLikes.length} songs
          </p>
        )}
      </Box>
    </Box>
  );
};

export default LikedSongs;
