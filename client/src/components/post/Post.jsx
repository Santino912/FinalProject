import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  SvgIcon,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import style from "./post.module.css";
import styleTooltip from "../tooltip/tooltip.module.css";
import { useEffect } from "react";
import axios from "axios";
import CommentsContainer from "../commentsContainer/CommentsContainer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Audio from "../Audio/Audio.jsx";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { createPost, deletePost } from "../../redux/features/post/postGetSlice";
import share from "../../images/logoiconbg.png";
import Video from "../Video/Video";
import LikeButton from "./LikeButton";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
import {
  addTrack,
  removeTrack,
} from "../../redux/features/player/playerGetSlice";
import { createUserNotification } from "../../redux/features/users/usersGetSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function validate(input) {
  let errors = {};
  if (!input.motiveReport) {
    errors.motiveReport = "motive is required";
  }

  if (!input.detailsReport) {
    errors.detailsReport = "detail is required";
  }

  return errors;
}

export default function Post({ post, comments, margin, border, height }) {
  const shareURL = `${process.env.REACT_APP_URL}/home/post/${post._id}`;
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
  const [date, setDate] = useState();
  const currentUser = useSelector((state) => state.users.currentUser);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertAddPlaylist, setOpenAlertAddPlaylist] = useState(false);
  const [openShareInMyProfile, setOpenShareInMyProfile] = useState(false);
  const [descriptionShare, setDescriptionShare] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMore = Boolean(anchorEl);
  const [errors, setErrors] = React.useState({});
  const [input, setInput] = React.useState({
    motiveReport: "",
    detailsReport: "",
  });

  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  const notification = async () => {
    if (currentUser._id !== post.user._id) {
      await dispatch(
        createUserNotification({
          title: JSON.stringify({
            name: `${currentUser.username} has shared your post`,
            img: currentUser.avatar,
            post: post.title,
          }),
          content: `/home/explore/${currentUser._id}`,
          userId: post.user._id,
          fromUser: currentUser._id,
          idPost: post._id,
        })
      );
      console.log("notification created!");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenReport = () => {
    setOpenReport(true);
    handleCloseMore();
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  const handleClickOpenShareInMyProfile = () => {
    setOpenShareInMyProfile(true);
  };

  const handleCloseShareInMyProfile = () => {
    setOpenShareInMyProfile(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleCloseAlertAddPlaylist = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertAddPlaylist(false);
  };

  useEffect(() => {
    setDate(new Date(Date.parse(post.postDate)).toLocaleString("sv"));
  }, [post]);

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  return (
    <Grid
      container
      direction="column"
      className={style.post}
      wrap={"nowrap"}
      p={`1.5%`}
      m={margin}
      style={{ border, height }}
    >
      <Grid item container spacing={1} justifyContent="space-between">
        <Grid item container spacing={2} className={style.avatarName}>
          <Grid item>
            <Link to={`/home/explore/${post?.user?._id}`}>
              <Avatar
                src={post.user && post.user.avatar}
                sx={{ "&:hover": { filter: "brightness(70%)" } }}
              />
            </Link>
          </Grid>
          <Grid item container xs={4} direction="column">
            <Link to={`/home/explore/${post?.user?._id}`}>
              <Typography
                sx={{ "&:hover": { color: "white", cursor: "pointer" } }}
                variant="body1"
              >
                {post.user && post.user.name}
              </Typography>
            </Link>
            <Link to={`/home/explore/${post?.user?._id}`}>
              <Typography
                sx={{
                  "&:hover": { cursor: "pointer", textDecoration: "underline" },
                }}
                variant="body2"
              >
                {post.user && `@${post.user.username}`}
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
            aria-expanded={openMore ? true : undefined}
            aria-haspopup={true}
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
            {currentUser.role === "Admin" ||
            currentUser._id === post.user._id ? (
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
                    dispatch(deletePost(post._id));
                    handleCloseMore();
                    dispatch(removeTrack(post));
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
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body1">{post.description}</Typography>
      </Grid>
      {post.user?.name && post?.type === "video" ? (
        <Video song={post} />
      ) : (
        post?.type === "audio" && <Audio song={post} artist={post.user} />
      )}
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography variant="body2">
            {date &&
              `${date.split(" ")[1].split(":")[0]}:${
                date.split(" ")[1].split(":")[1]
              } · ${
                monthNames[parseInt(date.split(" ")[0].split("-")[1]) - 1]
              } ${date.split(" ")[0].split("-")[2]}, ${
                date.split(" ")[0].split("-")[0]
              }`}
          </Typography>
        </Grid>
        <Grid item container xs={5} justifyContent="flex-end" spacing={2}>
          <Grid item>
            <LikeButton post={post} />
          </Grid>
          <Grid item>
            <button onClick={handleClickOpen}>
              <SvgIcon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 612 512"
                className={style.icon}
              >
                <path d="M568.5 142.6l-144-135.1c-9.625-9.156-24.81-8.656-33.91 .9687c-9.125 9.625-8.688 24.81 .9687 33.91l100.1 94.56h-163.4C287.5 134.2 249.7 151 221 179.4C192 208.2 176 246.7 176 288v87.1c0 13.25 10.75 23.1 24 23.1S224 389.3 224 376V288c0-28.37 10.94-54.84 30.78-74.5C274.3 194.2 298.9 183 328 184h163.6l-100.1 94.56c-9.656 9.094-10.09 24.28-.9687 33.91c4.719 4.1 11.06 7.531 17.44 7.531c5.906 0 11.84-2.156 16.47-6.562l144-135.1C573.3 172.9 576 166.6 576 160S573.3 147.1 568.5 142.6zM360 384c-13.25 0-24 10.75-24 23.1v47.1c0 4.406-3.594 7.1-8 7.1h-272c-4.406 0-8-3.594-8-7.1V184c0-4.406 3.594-7.1 8-7.1H112c13.25 0 24-10.75 24-23.1s-10.75-23.1-24-23.1H56c-30.88 0-56 25.12-56 55.1v271.1C0 486.9 25.13 512 56 512h272c30.88 0 56-25.12 56-55.1v-47.1C384 394.8 373.3 384 360 384z" />
              </SvgIcon>
            </button>
            <Grid item className={style.dialogContainer}>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
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
                <h2>Share!</h2>

                <DialogContent className={style.dialogContent}>
                  <button
                    style={{
                      width: 42,
                      height: 46,
                      margin: `2%`,
                      border: "none",
                    }}
                    onClick={handleClickOpenShareInMyProfile}
                  >
                    <Avatar src={share} sx={{ width: 42, height: 42 }} />
                  </button>
                  <Dialog
                    open={openShareInMyProfile}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
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
                    <h2>Add a description if you want!</h2>

                    <DialogContent className={style.dialogContent}>
                      <TextField
                        label="Description"
                        variant="standard"
                        fullWidth
                        value={descriptionShare}
                        onChange={(e) => setDescriptionShare(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleCloseShareInMyProfile}
                        className={style.button}
                      >
                        Close
                      </Button>
                      <Button
                        onClick={() => {
                          handleCloseShareInMyProfile();
                          dispatch(
                            createPost({
                              title: descriptionShare,
                              content: post?.content,
                              type: post?.type,
                              idUser: currentUser?._id,
                              idShared: post?._id,
                              genres: post?.genres?.map((genre) => genre.name),
                            })
                          );
                          notification();
                          handleClose();
                          setDescriptionShare("");
                        }}
                        className={style.button}
                      >
                        Share
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <FacebookShareButton url={shareURL} style={{ margin: `2%` }}>
                    <FacebookIcon size={42} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareURL} style={{ margin: `2%` }}>
                    <TwitterIcon size={42} round={true} />
                  </TwitterShareButton>
                  <TelegramShareButton url={shareURL} style={{ margin: `2%` }}>
                    <TelegramIcon size={42} round={true} />
                  </TelegramShareButton>
                  <WhatsappShareButton url={shareURL} style={{ margin: `2%` }}>
                    <WhatsappIcon size={42} round={true} />
                  </WhatsappShareButton>
                  <LinkedinShareButton url={shareURL} style={{ margin: `2%` }}>
                    <LinkedinIcon size={42} round={true} />
                  </LinkedinShareButton>
                  <EmailShareButton url={shareURL} style={{ margin: `2%` }}>
                    <EmailIcon size={42} round={true} />
                  </EmailShareButton>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} className={style.button}>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <Grid sx={{ height: "100%" }} item>
            {comments ? (
              ""
            ) : (
              <Link to={`/home/post/${post._id}`}>
                <button>
                  <SvgIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 612 512"
                    className={style.icon}
                  >
                    <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" />
                  </SvgIcon>
                </button>
              </Link>
            )}
          </Grid>
          <Grid item>
            <button
              onClick={() => {
                dispatch(addTrack(post));
                setOpenAlertAddPlaylist(true);
              }}
            >
              <PlaylistAddRoundedIcon
                className={style.icon}
                style={{ fontSize: "29px", marginLeft: "-40%" }}
              />
            </button>
          </Grid>
          <Snackbar
            open={openAlertAddPlaylist}
            autoHideDuration={4000}
            onClose={handleCloseAlertAddPlaylist}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseAlertAddPlaylist}
              severity="success"
              sx={{ width: "100%" }}
            >
              Added to playlist successfully!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
      {comments ? <CommentsContainer post={post} /> : ""}
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
              padding: "2%",
            },
          }}
        >
          <h2>Report this post</h2>
          {errors.motiveReport ? (
            <Box className={styleTooltip.tooltip}>
              <span className={styleTooltip.tooltiptext}>
                {errors.motiveReport}
              </span>
            </Box>
          ) : (
            ""
          )}
          <TextField
            name="motiveReport"
            label="Motive"
            variant="standard"
            fullWidth
            value={input["motiveReport"]}
            onChange={handleInputChange}
            style={{ marginTop: "1.5%" }}
            required
          />
          <TextField
            name="detailsReport"
            label="Details"
            variant="standard"
            multiline
            rows={4}
            fullWidth
            value={input["detailsReport"]}
            onChange={handleInputChange}
            style={{ marginTop: "1.5%" }}
            required
          />
          {errors.detailsReport ? (
            <Box className={styleTooltip.tooltip}>
              <span className={styleTooltip.tooltiptextBottom}>
                {errors.detailsReport}
              </span>
            </Box>
          ) : (
            ""
          )}
          <DialogActions>
            <Button onClick={handleCloseReport} className={style.button}>
              Close
            </Button>
            <Button
              onClick={async () => {
                if (input.motiveReport && input.detailsReport) {
                  handleCloseReport();
                  await axios.post("/reports", {
                    content: input.detailsReport,
                    title: input.motiveReport,
                    idUser: currentUser._id,
                    idPost: post._id,
                  });
                  setInput({
                    detailsReport: "",
                    motiveReport: "",
                  });
                  setOpenAlert(true);
                }
              }}
              className={style.button}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: "100%" }}
          >
            Thanks for the report, we'll check it out!
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}
