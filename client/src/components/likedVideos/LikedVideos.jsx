import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { useAuth } from "../../context";
import { getUserByFirebaseId } from "../../redux/features/users/usersGetSlice";
import { getLikesByUserId } from "../../redux/features/like/likeGetSlice";
import CardVideo from "./CardVideo";
import PlayAllButton from "../PlayAllButton/PlayAllButton";
import style from "./likedVideos.module.css";

export default function LikedVideos() {
  const dispatch = useDispatch();
  const userDB = useSelector((state) => state.users.currentUser);
  const likesCurrentUser = useSelector(
    (state) => state.likes.likesVideoCurrentUser
  );
  const { userFirebase } = useAuth();

  useEffect(() => {
    dispatch(getUserByFirebaseId(userFirebase.uid));
  }, []);

  useEffect(() => {
    if (Object.keys(userDB)?.length > 0) {
      dispatch(getLikesByUserId(userDB._id));
    }
  }, [userDB]);

  return (
    <Box container className={style.likedVideos}>
      <Box className={style.sideBarSpace} />
      <Box className={style.likesUserContainer}>
        {likesCurrentUser?.length > 0 ? (
          <Box style={{ width: "100%" }}>
            <PlayAllButton songs={likesCurrentUser} />
            <Box style={{ marginTop: "30px" }}>
              {likesCurrentUser?.map((post, index) => (
                <CardVideo
                  key={index}
                  post={post}
                  index={index}
                  allPosts={likesCurrentUser}
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
