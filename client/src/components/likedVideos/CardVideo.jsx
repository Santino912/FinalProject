import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../post/LikeButton";
import Post from "../post/Post";
import PlayButton from "../PlayButton/PlayButton";
import styles from "../ProfilePage/PopularPost.module.css";
import style from "./cardVideo.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CardVideo({ post, index, allPosts }) {
  const [user, setUser] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getUser() {
      const res = await axios.get(`/users/${post.user._id}`);
      setUser(res.data);
    }
    getUser();
  }, []);

  return (
    <div
      className={`${styles.containerSong} ${style.containerSong}`}
      style={{ height: "50px", padding: "0.5%", borderRadius: "6px" }}
    >
      <div className={styles.songFirstHalf}>
        <div
          className={styles.songFirstHalfIndex}
          style={{ marginRight: "20%" }}
        >
          <p>{index + 1}</p>
        </div>
        <button onClick={handleClickOpen}>
          <img
            src={post.cover}
            alt=""
            style={{ height: "40px", borderRadius: "6px" }}
          />
        </button>
        <button
          style={{
            width: "20px",
            fontWeight: "600",
            color: "white",
            fontSize: "18px",
          }}
          onClick={handleClickOpen}
        >
          <p style={{ cursor: "pointer" }}>{post.title}</p>
        </button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            style: {
              backgroundColor: "#011f40",
              color: "#1976FA",
              padding: "1%",
            },
          }}
          maxWidth={"lg"}
          fullWidth={true}
        >
          <DialogContent>
            <Post post={post} margin={0} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={styles.songSecondHalf}>
        <Link to={`/home/explore/${post?.user?._id}`}>
          <Typography
            sx={{
              "&:hover": { color: "white", cursor: "pointer" },
              color: "#C4C4C4",
            }}
            variant="body1"
          >
            {user && user.name}
          </Typography>
        </Link>
        <LikeButton post={post} />
        <PlayButton tracks={allPosts} track={post} trackIndex={index} />
      </div>
    </div>
  );
}
