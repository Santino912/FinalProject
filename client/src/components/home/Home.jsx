import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearPost, getPost } from "../../redux/features/post/postGetSlice";
import { getUserByFirebaseId } from "../../redux/features/users/usersGetSlice";
import { useAuth } from "../../context";
import Post from "../post/Post";
import style from "./home.module.css";
import PostShared from "../postShared/PostShared";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.postListAll);
  const { userFirebase } = useAuth();
  useEffect(() => {
    dispatch(getPost());
    dispatch(getUserByFirebaseId(userFirebase?.uid));
    dispatch(clearPost());
  }, [dispatch, userFirebase.uid]);

  return (
    <Box className={style.home}>
      <Box className={style.posts}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "700",
            color: "white",
            paddingTop: "20px",
            paddingBottom: "10px",
          }}
        >
          Home
        </Typography>
        {/* <PostShared postShared={postShared}/> */}
        {posts?.length > 0 &&
          posts
            .slice(0)
            .reverse()
            .map((post, i) =>
              post.idShared ? (
                <PostShared postShared={post} />
              ) : (
                <Post key={i} post={post} comments={false} />
              )
            )}
      </Box>
    </Box>
  );
}
