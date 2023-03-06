import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  Grid,
  Slide,
  SvgIcon,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./comment.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Comment({
  content,
  userId,
  commentId,
  getComments,
  currentUser,
  post,
}) {
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getUser() {
      const res = await axios.get(`/users/${userId}`);
      setUser(res.data);
    }
    getUser();
  }, []);

  return (
    <Grid container item p={`1%`} pb={`1.5%`} className={style.comment}>
      <Grid item>
        <Avatar src={user && user.avatar} sx={{ width: 24, height: 24 }} />
      </Grid>
      <Grid item>
        <Link to={`/home/explore/${post.user._id}`}>
          <p className={style.userName}>{user?.name}</p>
        </Link>
      </Grid>
      <Grid item ml={`3%`} style={{ width: "85%" }}>
        <Typography>{content}</Typography>
      </Grid>
      <Grid item className={style.buttonContainer}>
        {currentUser.role === "Admin" ||
        currentUser._id === userId ||
        post.userId === currentUser._id ? (
          // <Button className={style.button} style={{ minWidth: `50%` }} variant="contained" onClick={handleClickOpen}>X</Button>
          <button onClick={handleClickOpen} className={style.buttonDelete}>
            <SvgIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -100 320 742"
              className={style.icon}
            >
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </SvgIcon>
          </button>
        ) : (
          ""
        )}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          className={style.dialog}
          PaperProps={{
            style: {
              backgroundColor: "#000A1F",
              color: "#1976FA",
              padding: "1%",
            },
          }}
        >
          <h2>Are you sure you want to delete this comment?</h2>
          <DialogActions>
            <Button onClick={handleClose} className={style.button}>
              Close
            </Button>
            <Button
              onClick={async () => {
                handleClose();
                await axios.delete(`/comments/${commentId}`);
                await getComments();
              }}
              className={style.button}
            >
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}
