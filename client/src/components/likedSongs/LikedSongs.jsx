import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { getSongsLikesByUserId } from "../../redux/features/like/likeGetSlice";
import { getUserByFirebaseId } from "../../redux/features/users/usersGetSlice";
import PlayAllButton from "../PlayAllButton/PlayAllButton";
import { useAuth } from "../../context";
import CardSong from "./CardSong";
import style from "./likedSongs.module.css";

export default function LikedSongs(_id) {
  const dispatch = useDispatch();
  const userDB = useSelector((state) => state.users.currentUser);
  const likesCurrentUser = useSelector(
    (state) => state.likes.likesSongCurrentUser
  );
  const { userFirebase } = useAuth();

  useEffect(() => {
    dispatch(getUserByFirebaseId(userFirebase?.uid));
    dispatch(getSongsLikesByUserId(userDB?._id));
  }, [dispatch]);
  return (
    <Box container className={style.likedVideos}>
      <Box className={style.sideBarSpace} />
      <Box className={style.currentLikesContainer}>
        {likesCurrentUser?.length > 0 ? (
          <Box style={{ width: "100%" }}>
            <PlayAllButton songs={likesCurrentUser} />
            <Box className={style.songsContainer}>
              {likesCurrentUser?.map((like, index) => (
                <CardSong
                  arrayMap={likesCurrentUser}
                  post={like?.post}
                  index={index}
                  key={index}
                />
              ))}
            </Box>
          </Box>
        ) : (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ height: "100%" }}
          >
            <p className={style.noLikedSongsText}>No liked songs yet</p>
          </Box>
        )}
      </Box>
    </Box>
  );
}
