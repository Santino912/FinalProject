import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
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
    <Grid container className={style.likedVideos} xs={12}>
      <Grid className={style.sideBarSpace} item container xs={2.5} />
      <Grid item container xs={9.5} p={`2%`}>
        {likesCurrentUser?.length > 0 ? (
          <Box style={{ width: "100%" }}>
            <PlayAllButton songs={likesCurrentUser} />
            <Box style={{ marginTop: "30px" }}>
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
          <p style={{ margin: "0 auto", color: "white" }}>No liked songs yet</p>
        )}
      </Grid>
    </Grid>
  );
}
