import React from "react";
import { Box } from "@mui/material";
import styles from "./LikedSongs.module.css";
import heart from "../../images/heartLikes.png";

const LikedSongs = ({ user }) => {
  /*  useEffect(() => {
    dispatch(getUserById(_id, "likedSongs line 19"));
  }, [dispatch, _id]); */
  /*   function likePostCover(cover) {
     const postLiked = allPosts?.find((post) => post?.user?._id === _id);
    return cover;
  } */
  return (
    <Box className={styles.containerLikedSongs}>
      <h3>Liked Songs</h3>
      <Box className={styles.likedSongs}>
        {user?.likedPosts > 0 ? (
          <Box className={styles.containerImageHeart}>
            <img
              className={styles.coverLikedSongs}
              src={user[user?.likedPosts?.length - 1]?.cover}
              alt="HeartImg"
            />
            <img className={styles.heart} src={heart} alt="HeartImg" />
          </Box>
        ) : null}
        {user?.likedPosts < 1 ? (
          <p>{user?.name} has not liked any song</p>
        ) : user?.likedPosts <= 1 ? (
          <p>
            {user?.name} has liked {user?.likedPosts?.length} songs
          </p>
        ) : (
          <p>
            {user?.name} has liked {user?.likedPosts?.length} song
          </p>
        )}
      </Box>
    </Box>
  );
};

export default LikedSongs;
