import { Button, Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import Post from "../post/Post";
import styles from "./AllPosts.module.css";
import PostShared from "../postShared/PostShared";

const AllPosts = (artistPostsObj) => {
  const [checked, setChecked] = useState("all");
  const artistPosts = artistPostsObj.artistPostsObj;
  const [posts, setPosts] = useState(artistPosts);

  function handleCheckedAll() {
    setChecked("all");
  }

  function handleCheckedVideo() {
    setChecked("video");
    setPosts(artistPosts.filter((post) => post.type.includes("video")));
  }

  function handleCheckedAudio() {
    setChecked("audio");
    setPosts(artistPosts.filter((post) => post.type.includes("audio")));
  }

  return (
    <Box className={styles.containerAllPosts}>
      <Box className={styles.containerTitleFilters}>
        <h2>All Posts</h2>
        <Box className={styles.containerFilters}>
          {checked === "all" ? (
            <Button
              sx={{
                backgroundColor: "rgba(0, 255, 214, 1)",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 255, 214, 1)",
                },
              }}
            >
              All
            </Button>
          ) : (
            <Button onClick={handleCheckedAll}>All</Button>
          )}
          {checked === "video" ? (
            <Button
              sx={{
                backgroundColor: "rgba(0, 255, 214, 1)",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 255, 214, 1)",
                },
              }}
            >
              Video
            </Button>
          ) : (
            <Button onClick={handleCheckedVideo}>Video</Button>
          )}
          {checked === "audio" ? (
            <Button
              sx={{
                backgroundColor: "rgba(0, 255, 214, 1)",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 255, 214, 1)",
                },
              }}
            >
              Audio
            </Button>
          ) : (
            <Button onClick={handleCheckedAudio}>Audio</Button>
          )}
        </Box>
      </Box>
      <Box>
        {checked !== "all" ? (
          posts.length === 0 ? (
            <p className={styles.noResultsText}>No post was found</p>
          ) : (
            posts.map((post, i) =>
              post.idShared ? (
                <PostShared postShared={post} />
              ) : (
                <Post key={i} post={post} comments={false} />
              )
            )
          )
        ) : (
          artistPosts.map((post, i) =>
            post.idShared ? (
              <PostShared postShared={post} />
            ) : (
              <Post key={i} post={post} comments={false} />
            )
          )
        )}
      </Box>
    </Box>
  );
};

export default AllPosts;
