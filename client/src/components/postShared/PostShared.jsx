import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { deletePost } from "../../redux/features/post/postGetSlice";
import style2 from "./postShared.module.css";
import style from "../post/post.module.css";
import Post from "../post/Post";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PostShared({ postShared, margin }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [post, setPost] = useState();
  const [date, setDate] = useState();
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [openReport, setOpenReport] = useState(false);
  const [motiveReport, setMotiveReport] = useState("");
  const [detailsReport, setDetailsReport] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMore = Boolean(anchorEl);
  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  const handleClickOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  async function getPost() {
    const res = await axios.get(`/posts/${postShared.idShared}`);
    setPost(res.data);
  }

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    getPost();
  }, [postShared]);

  useEffect(() => {
    setDate(new Date(Date.parse(postShared.postDate)).toLocaleString("sv"));
  }, [postShared]);

  return (
    <Grid
      container
      direction="column"
      className={style.post}
      p={`1.5%`}
      m={margin}
    >
      <Grid item container spacing={1} justifyContent="space-between">
        <Grid item container spacing={2} className={style.avatarName}>
          <Grid item>
            <Link to={`/home/explore/${postShared.userId}`}>
              <Avatar
                src={postShared.user && postShared.user.avatar}
                sx={{ "&:hover": { filter: "brightness(70%)" } }}
              />
            </Link>
          </Grid>
          <Grid item container xs={4} direction="column">
            <Link to={`/home/explore/${postShared.userId}`}>
              <Typography
                sx={{ "&:hover": { color: "white", cursor: "pointer" } }}
                variant="body1"
              >
                {postShared.user && postShared.user.name}
              </Typography>
            </Link>
            <Link to={`/home/explore/${postShared.userId}`}>
              <Typography
                sx={{
                  "&:hover": { cursor: "pointer", textDecoration: "underline" },
                }}
                variant="body2"
              >
                {postShared.user && `@${postShared.user.username}`}
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          className={style.buttonContainer}
        >
          <IconButton
            aria-label="more"
            id="demo-customized-button"
            aria-controls={openMore ? "demo-customized-menu" : undefined}
            aria-expanded={openMore ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClickMore}
          >
            <SvgIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className={style.icon}
            >
              <path d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z" />
            </SvgIcon>
          </IconButton>
          <Menu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            elevation={0}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorEl={anchorEl}
            open={openMore}
            onClose={handleCloseMore}
          >
            <MenuItem onClick={handleClickOpenReport} disableRipple>
              <SvgIcon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 612 512"
                className={style.icon}
              >
                <path d="M476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87c-34.63 0-77.87 8.003-137.2 32.05V24C48 10.75 37.25 0 24 0S0 10.75 0 24v464C0 501.3 10.75 512 24 512s24-10.75 24-24v-104c53.59-23.86 96.02-31.81 132.8-31.81c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0zM464 319.8c-30.31 10.82-58.08 16.1-84.6 16.1c-30.8 0-58.31-7-87.44-14.41c-32.01-8.141-68.29-17.37-111.1-17.37c-42.35 0-85.99 9.09-132.8 27.73V84.14l18.03-7.301c47.39-19.2 86.38-28.54 119.2-28.54c28.24 .0039 49.12 6.711 73.31 14.48c25.38 8.148 54.13 17.39 90.58 17.39c35.43 0 72.24-8.496 114.9-26.61V319.8z" />
              </SvgIcon>
              Report
            </MenuItem>
            <Grid item className={style.dialogContainer}>
              <Dialog
                fullWidth={true}
                maxWidth="xs"
                open={openReport}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseReport}
                aria-describedby="alert-dialog-slide-description"
                className={style.dialog}
                PaperProps={{
                  style: {
                    backgroundColor: "#011f40",
                    color: "#1976FA",
                    padding: "1%",
                  },
                }}
              >
                <h2>Report this post</h2>
                <TextField
                  label="Motive"
                  variant="standard"
                  fullWidth
                  value={motiveReport}
                  onChange={(e) => setMotiveReport(e.target.value)}
                  style={{ marginTop: "1.5%" }}
                />
                <TextField
                  label="Details"
                  variant="standard"
                  multiline
                  rows={4}
                  fullWidth
                  value={detailsReport}
                  onChange={(e) => setDetailsReport(e.target.value)}
                  style={{ marginTop: "1.5%" }}
                />
                {/* </DialogContent> */}
                <DialogActions>
                  <Button onClick={handleCloseReport} className={style.button}>
                    Close
                  </Button>
                  <Button
                    onClick={async () => {
                      handleCloseReport();
                      await axios.post("/reports", {
                        content: detailsReport,
                        title: motiveReport,
                        idUser: currentUser._id,
                        idPost: postShared._id,
                      });
                      setMotiveReport("");
                      setDetailsReport("");
                      handleCloseMore();
                    }}
                    className={style.button}
                  >
                    Send
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            {currentUser.role === "Admin" ||
            currentUser._id === postShared.userId ? (
              <MenuItem onClick={handleClickOpenDelete} disableRipple>
                <SvgIcon
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="20 0 552 512"
                  className={style.icon}
                >
                  <path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" />
                </SvgIcon>
                Delete
              </MenuItem>
            ) : (
              ""
            )}
            <Dialog
              open={openDelete}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDelete}
              aria-describedby="alert-dialog-slide-description"
              className={style.dialog}
              PaperProps={{
                style: {
                  backgroundColor: "#011f40",
                  color: "#1976FA",
                  padding: "1%",
                },
              }}
            >
              <h2>Are you sure you want to delete this post?</h2>
              <DialogActions>
                <Button onClick={handleCloseDelete} className={style.button}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleCloseDelete();
                    dispatch(deletePost(postShared._id));
                    handleCloseMore();
                  }}
                  className={style.button}
                >
                  Accept
                </Button>
              </DialogActions>
            </Dialog>
          </Menu>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6">{postShared.title}</Typography>
        <Typography variant="body1">{postShared.description}</Typography>
      </Grid>
      <Grid item className={`${style2.postShared}`}>
        {post ? (
          <Post post={post} border={"1px solid #02b599"} margin={"0px"} />
        ) : (
          "This post is not longer available."
        )}
      </Grid>
      <Grid
        item
        style={
          post && post.type === "audio"
            ? { marginTop: "15px" }
            : { marginTop: "-30px" }
        }
      >
        <Typography variant="body2">
          {date &&
            `${date.split(" ")[1].split(":")[0]}:${
              date.split(" ")[1].split(":")[1]
            } · ${monthNames[parseInt(date.split(" ")[0].split("-")[1]) - 1]} ${
              date.split(" ")[0].split("-")[2]
            }, ${date.split(" ")[0].split("-")[0]}`}
        </Typography>
      </Grid>
    </Grid>
  );
}
