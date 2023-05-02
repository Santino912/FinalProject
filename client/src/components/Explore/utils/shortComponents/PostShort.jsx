import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import style from "../../ShortStyle.module.css";

const PostShort = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Box className={style.findedContainerShort}>
      <Box className={style.avatarContainer}>
        <img
          src={post?.cover}
          className={style.cover}
          alt={`${post?.title} cover`}
        />
      </Box>

      <Box className={style.textContainer}>
        <Typography className={style.titleName} variant={"h4"} component={"h4"}>
          {post?.title}
        </Typography>
        <Typography
          className={style.subTitleName}
          variant={"h5"}
          component={"h5"}
          onClick={() => navigate(`${post?.user?._id}`)}
        >
          {post?.user?.username}
        </Typography>
        <Typography className={style.date} variant={"h6"} component={"h6"}>
          {`${post?.postDate?.split("T")[0]}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default PostShort;
