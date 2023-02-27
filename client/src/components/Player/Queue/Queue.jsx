import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import defaultImg from "../default.png";
import s from "./Queue.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIndex,
  removeTrack,
  togglePlay,
} from "../../../redux/features/player/playerGetSlice";
import PlaylistRemoveRoundedIcon from "@mui/icons-material/PlaylistRemoveRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Queue({ tracks, trackIndex }) {
  const [open, setOpen] = React.useState(false);
  const { isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTrack = (i) => {
    trackIndex === i ? dispatch(togglePlay()) : dispatch(changeIndex(i));
  };

  return (
    <div className={s.queueContainer}>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleClickOpen}
        aria-label="open"
      >
        <QueueMusicRoundedIcon />
      </IconButton>
      <Dialog
        className={s.customDialog}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#000A1F" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{
                ml: 2,
                flex: 1,
                fontFamily: "Inter, sans-serif",
                fontWeight: "600",
              }}
              variant="h4"
              component="div"
            >
              Queue
            </Typography>
          </Toolbar>
        </AppBar>
        <List
          sx={{
            backgroundColor: "rgba(4, 11, 33, 0.65)",
            backdropFilter: "blur(15px)",
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          {tracks?.map((t, i) => (
            <div className={s.allContainer} key={`${i}_${Math.random()}`}>
              <ListItem
                className={s.queueTrack}
                sx={{ color: "white", cursor: "pointer" }}
                key={`${t}_${Math.random()}`}
                button
                onClick={() => handleTrack(i)}
              >
                <div className={s.queueItem}>
                  <img src={t.cover ? t.cover : defaultImg} alt="not found" />
                  <ListItemText
                    className={s.trackInfo}
                    sx={{ color: "white" }}
                    primary={t.title}
                    secondary="Artist"
                  />
                  {!isPlaying ? (
                    <svg
                      width="56"
                      height="57"
                      viewBox="0 0 56 57"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 39L39.375 28.5L21 18V39Z" fill="#000A1F" />
                    </svg>
                  ) : trackIndex === i ? (
                    <svg
                      width="56"
                      height="57"
                      viewBox="0 0 56 57"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.3789 19H22.35H22.15H22.1211H22.1211H22.121C21.7257 19 21.3846 19 21.1037 19.0229C20.8072 19.0472 20.5123 19.1006 20.2285 19.2452C19.8052 19.461 19.461 19.8052 19.2452 20.2285C19.1006 20.5123 19.0472 20.8072 19.0229 21.1037C19 21.3846 19 21.7257 19 22.121V22.1211V22.1211V22.15V35.35V35.3789V35.3789V35.379C19 35.7743 19 36.1154 19.0229 36.3963C19.0472 36.6928 19.1006 36.9877 19.2452 37.2715C19.461 37.6948 19.8052 38.0391 20.2285 38.2548C20.5123 38.3994 20.8072 38.4528 21.1037 38.4771C21.3846 38.5 21.7257 38.5 22.121 38.5H22.1211H22.15H22.35H22.3789H22.379C22.7743 38.5 23.1154 38.5 23.3963 38.4771C23.6928 38.4528 23.9877 38.3994 24.2715 38.2548C24.6948 38.0391 25.0391 37.6948 25.2548 37.2715C25.3994 36.9877 25.4528 36.6928 25.4771 36.3963C25.5 36.1153 25.5 35.7743 25.5 35.3789L25.5 35.35V22.15L25.5 22.1211C25.5 21.7257 25.5 21.3847 25.4771 21.1037C25.4528 20.8072 25.3994 20.5123 25.2548 20.2285C25.0391 19.8052 24.6948 19.461 24.2715 19.2452C23.9877 19.1006 23.6928 19.0472 23.3963 19.0229C23.1154 19 22.7743 19 22.379 19H22.3789H22.3789ZM33.3789 19H33.35H33.15H33.1211H33.1211H33.121C32.7257 19 32.3846 19 32.1037 19.0229C31.8072 19.0472 31.5123 19.1006 31.2285 19.2452C30.8052 19.461 30.461 19.8052 30.2452 20.2285C30.1006 20.5123 30.0472 20.8072 30.0229 21.1037C30 21.3847 30 21.7257 30 22.1211V22.1211V22.15V35.35V35.3789V35.3789C30 35.7743 30 36.1154 30.0229 36.3963C30.0472 36.6928 30.1006 36.9877 30.2452 37.2715C30.461 37.6948 30.8052 38.0391 31.2285 38.2548C31.5123 38.3994 31.8072 38.4528 32.1037 38.4771C32.3846 38.5 32.7257 38.5 33.121 38.5H33.1211H33.15H33.35H33.3789H33.379C33.7743 38.5 34.1154 38.5 34.3963 38.4771C34.6928 38.4528 34.9877 38.3994 35.2715 38.2548C35.6948 38.0391 36.0391 37.6948 36.2548 37.2715C36.3994 36.9877 36.4528 36.6928 36.4771 36.3963C36.5 36.1153 36.5 35.7743 36.5 35.3789V35.35V22.15V22.1211C36.5 21.7257 36.5 21.3847 36.4771 21.1037C36.4528 20.8072 36.3994 20.5123 36.2548 20.2285C36.0391 19.8052 35.6948 19.461 35.2715 19.2452C34.9877 19.1006 34.6928 19.0472 34.3963 19.0229C34.1154 19 33.7743 19 33.379 19H33.3789H33.3789Z"
                        fill="#000A1F"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="56"
                      height="57"
                      viewBox="0 0 56 57"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 39L39.375 28.5L21 18V39Z" fill="#000A1F" />
                    </svg>
                  )}
                </div>
                <Divider />
              </ListItem>
              {tracks.length > 1 && (
                <PlaylistRemoveRoundedIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => dispatch(removeTrack(t._id))}
                />
              )}
            </div>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
