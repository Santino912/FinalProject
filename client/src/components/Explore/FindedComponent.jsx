import React from "react";
import { Box, Typography } from "@mui/material";
import PostShort from "./utils/shortComponents/PostShort";
import style from "./ShortStyle.module.css";
import { booleanFilterToShort } from "./utils/func/filters";
import UserShort from "./utils/shortComponents/UserShort";

const FindedComponent = ({ posts, users, searchBoolean }) => {
  return (
    <>
      {posts?.length > 0 && booleanFilterToShort(searchBoolean) && (
        <Box className={style.containerAll}>
          <Typography variant={"h4"} component={"h2"} className={style.title}>
            Posts
          </Typography>
          <Box className={style.postsContainer}>
            {posts.map((post, i) => (
              <PostShort key={i} post={post} />
            ))}
          </Box>
        </Box>
      )}
      {users?.length > 0 && booleanFilterToShort(searchBoolean) && (
        <Box className={style.containerAll}>
          <Typography variant={"h4"} component={"h2"} className={style.title}>
            Users
          </Typography>
          <Box className={style.postsContainer}>
            {users.map((user, i) => (
              <UserShort key={i} user={user} />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default FindedComponent;
