import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import { getSongsLikesByUserId } from "../../redux/features/like/likeGetSlice";
import { getUserByFirebaseId } from "../../redux/features/users/usersGetSlice";
import PlayAllButton from "../PlayAllButton/PlayAllButton";
import style from "./likedSongs.module.css";
import SideBar from "../SideBar/SideBar";
import { useAuth } from "../../context";
import CardSong from "./CardSong";

export default function LikedSongs() {
  const dispatch = useDispatch();
  const userDB = useSelector((state) => state.users.currentUser);
  const likesCurrentUser = useSelector(
    (state) => state.likes.likesSongCurrentUser
  );
  const { userFirebase } = useAuth();

  useEffect(() => {
    dispatch(getUserByFirebaseId(userFirebase.uid));
  }, [dispatch, userFirebase.uid]);

  useEffect(() => {
    if (Object.keys(userDB).length > 0) {
      dispatch(getSongsLikesByUserId(userDB._id));
    }
  }, [userDB, dispatch]);

  return (
    <Grid container className={style.likedVideos} xs={12}>
      <Grid style={{ maxWidth: "266px" }} item container xs={2.5}>
        <SideBar userDB={userDB} />
      </Grid>
      <Grid item container xs={9.5} p={`2%`}>
        {likesCurrentUser.length > 0 ? (
          <Box style={{ width: "100%" }}>
            <PlayAllButton songs={likesCurrentUser} />
            <Box style={{ marginTop: "30px" }}>
              {likesCurrentUser?.map((post, index) => (
                <CardSong
                  arrayMap={likesCurrentUser}
                  post={post}
                  index={index}
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
