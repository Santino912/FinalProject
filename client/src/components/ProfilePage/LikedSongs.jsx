import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import styles from "./LikedSongs.module.css";
import heart from "../../images/heartLikes.png";

const LikedSongs = ({ user }) => {
  const allUserLikes = useSelector((state) => state.users.profilePostsLikes);

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
        {allUserLikes?.length > 0 ? (
          <Box className={styles.containerImageHeart}>
            <img
              className={styles.coverLikedSongs}
              src={allUserLikes[allUserLikes?.length - 1]?.cover}
              alt=""
            />
            <img className={styles.heart} src={heart} alt="" />
          </Box>
        ) : null}
        {allUserLikes?.length < 1 ? (
          <p>{user?.name} has not liked any post</p>
        ) : allUserLikes?.length === 1 ? (
          <p>
            {user?.name} has liked {allUserLikes?.length} song
          </p>
        ) : (
          <p>
            {user?.name} has liked {allUserLikes?.length} songs
          </p>
        )}
      </Box>
    </Box>
  );
};

export default LikedSongs;
