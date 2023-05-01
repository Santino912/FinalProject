import React from "react";
import { Box, Typography } from "@mui/material";
import style from "../../ShortStyle.module.css";

const PostShort = ({ post }) => {
  console.log(post);
  return (
    <Box className={style.FindedContainerShort}>
      <Box className={style.avatarContainer}>
        <Box className={style.cover} />
      </Box>

      <Box className={style.textContainer}>
        <Typography className={style.titleName} variant={"h4"} component={"h4"}>
          {post?.title}
        </Typography>
        <Typography
          className={style.subTitleName}
          variant={"h5"}
          component={"h5"}
        >
          {`@${post?.user?.username}`}
        </Typography>
        <Typography className={style.date} variant={"h6"} component={"h6"}>
          {`${post?.postDate?.split("T")[0]}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default PostShort;
