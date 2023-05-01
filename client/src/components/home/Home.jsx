import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearPost, getPostHome } from "../../redux/features/post/postGetSlice";
import { useAuth } from "../../context";
import Post from "../post/Post";
import style from "./home.module.css";
import Loading from "../loading/Loading";

export default function Home() {
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);

  const posts = useSelector((state) => state.posts.postListAll);
  const { userFirebase } = useAuth();
  useEffect(() => {
    setLoaded(true);
    dispatch(getPostHome(setLoaded));
    return () => dispatch(clearPost());
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
        {posts?.length > 0 && !loaded ? (
          posts.map((post, i) => <Post key={i} post={post} comments={false} />)
        ) : (
          <Loading width={"50px"} height={"50px"} />
        )}
      </Box>
    </Box>
  );
}
