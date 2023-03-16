import { Grid, SvgIcon, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikesByUserId } from "../../redux/features/like/likeGetSlice";
import { getPost } from "../../redux/features/post/postGetSlice";
import { createUserNotification } from "../../redux/features/users/usersGetSlice";
import style from "./post.module.css";
import { findLikeByIdUserAndIdPost } from "./utils/LikesRequests";

export default function LikeButton({ post }) {
  const [like, setLike] = useState();
  const [likes, setLikes] = useState();
  const [click, setClick] = useState();
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  async function getLikes() {
    const res = await axios.get(`/likes/posts/${post._id}`);
    setLikes(res.data);
  }

  const notification = async () => {
    const data = await findLikeByIdUserAndIdPost(post._id, currentUser._id);
    if (data.isActive === undefined) {
      await dispatch(
        createUserNotification({
          title: JSON.stringify({
            name: `${currentUser.username} liked your post`,
            img: currentUser.avatar,
            post: post.title,
          }),
          content: `/home/post/${post._id}`,
          userId: post.user?._id,
          fromUser: currentUser._id,
          idPost: post._id,
        })
      );
      console.log("notification created!");
    }
  };

  const handleLike = () => {
    setLike(!like);
    setClick(!click);
    if (!like) notification();
  };

  useEffect(() => {
    getLikes();
    getLikeOfThisUser();
  }, [post, dispatch]);

  useEffect(() => {
    async function updateLikes() {
      if (click !== undefined) {
        await getLikes();
        const data = await findLikeByIdUserAndIdPost(post._id, currentUser._id);
        async function updateLike() {
          await axios.put(`/likes`, {
            idPost: post._id,
            userId: currentUser._id,
            isActive: like,
          });
        }
        async function createLike() {
          await axios.post(`/likes`, {
            idPost: post._id,
            idUser: currentUser._id,
          });
        }

        data.isActive === undefined ? await createLike() : await updateLike();
        await getLikes();
      }
      dispatch(getLikesByUserId(currentUser._id));
      dispatch(getPost());
    }
    updateLikes();
  }, [click]);

  async function getLikeOfThisUser() {
    const data = await findLikeByIdUserAndIdPost(post._id, currentUser._id);
    setLike(data?.isActive);
  }

  useEffect(() => {
    if (like === undefined && likes !== undefined) {
      getLikeOfThisUser();
    }
  }, [likes, dispatch, like]);

  return (
    <Grid
      container
      justifyContent="flex-end"
      m={`2.5%`}
      style={{ width: "100px" }}
    >
      <Grid item mr={`10%`}>
        <Typography>
          {likes?.filter((likes) => likes.isActive)?.length === 0
            ? "0"
            : likes?.filter((likes) => likes.isActive)?.length}
        </Typography>
      </Grid>
      <Grid item>
        <button onClick={handleLike}>
          <SvgIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 612 512"
            className={style.icon}
          >
            {like ? (
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
            ) : (
              <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
            )}
          </SvgIcon>
        </button>
      </Grid>
    </Grid>
  );
}
