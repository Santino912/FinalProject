import { SvgIcon, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LikeFalse, LikeTrue } from "../../images/svg/LikeState";
import { LikeRequestAndNotification } from "./utils/LikesRequests";
//import { createUserNotification } from "../../utils";
import style from "./post.module.css";

export default function LikeButton({ post }) {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const likeBoolean = post?.likes?.some(
      (like) => like?.user === currentUser?._id
    );
    setLikes(post?.countLikes);
    setLike(likeBoolean);
  }, [dispatch, post, currentUser?._id, post?.likes]);

  const handleLike = () => {
    setLike(!like);
    const num = like ? likes - 1 : likes + 1;
    setLikes(num);
    const value = {
      idUser: post?.user?._id,
      fromUser: currentUser?._id,
      idPost: post?._id,
    };
    LikeRequestAndNotification(value);
  };

  return (
    <Box display={"flex"} style={{ width: "30%", gap: "5px" }}>
      <Box display={"flex"}>
        <Typography>{likes}</Typography>
      </Box>
      <Box display={"flex"}>
        <button onClick={() => handleLike()}>
          <SvgIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 612 512"
            className={style.icon}
          >
            {like ? <LikeTrue /> : <LikeFalse />}
          </SvgIcon>
        </button>
      </Box>
    </Box>
  );
}
