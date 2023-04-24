import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  MenuItem,
  Select,
  Button,
  OutlinedInput,
  TextField,
  Dialog,
  DialogActions,
  useMediaQuery,
  DialogContent /* , DialogTitle */,
} from "@mui/material";
import { createPost } from "../../redux/features/post/postGetSlice";
import AudioPlayer from "react-h5-audio-player";
import { storage } from "../../firebase.js";
import Loading from "../loading/Loading";
import defaultImg from "../Player/default.png";
import s from "./Upload.module.css";
import "react-h5-audio-player/lib/styles.css";

export default function Upload() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const genres = useSelector((state) => state.genres.genreList);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState({
    cover: false,
    content: false,
  });
  const [postData, setPostData] = React.useState({
    title: "",
    description: "",
    content: "",
    cover: "",
    type: "",
    genres: [],
  });

  const uploadFile = async (file) => {
    setLoading({ ...loading, cover: true });
    const fileRef = ref(storage, `cover/${file.name + Math.random()}`);
    return uploadBytes(fileRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        setLoading({ ...loading, cover: false });
        return url;
      })
      .catch((err) => console.log(err));
  };

  const uploadMusic = async (file) => {
    setLoading({ ...loading, content: true });
    const fileRef = ref(storage, `content/${file.name + Math.random()}`);
    return uploadBytes(fileRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        setLoading({ ...loading, content: false });
        return url;
      });
  };

  const handleChange = async (event) => {
    const {
      target: { value, name },
    } = event;
    name === "cover"
      ? setPostData({
          ...postData,
          [name]: await uploadFile(event.target.files[0]),
        })
      : name === "content"
      ? setPostData({
          ...postData,
          [name]: await uploadMusic(event.target.files[0]),
          type: event.target.files[0].type.split("/")[0],
        })
      : name === "genres"
      ? setPostData({
          ...postData,
          genres: typeof value === "string" ? value.split(",") : value,
        })
      : setPostData({ ...postData, [name]: value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      postData.title &&
      postData.genres?.length &&
      postData.content &&
      postData.cover &&
      postData.type &&
      !loading.content &&
      !loading.cover
    ) {
      dispatch(createPost({ ...postData, idUser: currentUser._id }));
      setPostData({
        title: "",
        description: "",
        content: "",
        cover: null,
        type: "",
        genres: [],
      });
      setOpen(false);

      window.location.reload();
    } else alert("Check the information");
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        backgroundColor: "transparent",
        borderRadius: "15px",
        color: "white",
      },
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className={s.allContainer}>
      <button className={s.newPostBtn} onClick={handleClickOpen}>
        {" "}
        <svg
          width="15"
          height="15"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.78947 0.789474C5.78947 0.353459 5.43601 0 5 0C4.56399 0 4.21053 0.353459 4.21053 0.789474V4.21053L0.789474 4.21053C0.35346 4.21053 0 4.56399 0 5C0 5.43601 0.353459 5.78947 0.789474 5.78947L4.21053 5.78947V9.21053C4.21053 9.64654 4.56399 10 5 10C5.43602 10 5.78947 9.64654 5.78947 9.21053V5.78947L9.21053 5.78947C9.64654 5.78947 10 5.43602 10 5C10 4.56399 9.64654 4.21053 9.21053 4.21053L5.78947 4.21053V0.789474Z"
            fill="white"
          />
        </svg>{" "}
        New Post...
      </button>
      <Dialog
        className={s.dialog}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <h2 className={s.title}>New Post</h2>
        <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
          <DialogContent className={s.content} id="content">
            <ul className={s.formInputs}>
              <li>
                <TextField
                  className={s.titleInput}
                  required
                  value={postData.title}
                  name="title"
                  onChange={handleChange}
                  id="standard-basic"
                  label="Song title"
                  variant="standard"
                  disabled={loading.cover || loading.content}
                />
              </li>
              <li>
                {" "}
                <TextField
                  value={postData.description}
                  onChange={handleChange}
                  name="description"
                  className={s.description}
                  id="standard-multiline-static"
                  label="Description"
                  multiline
                  rows={6}
                  variant="standard"
                  disabled={loading.cover || loading.content}
                />
              </li>
              <li>
                <Select
                  className={s.selectGenres}
                  name="genres"
                  multiple
                  displayEmpty
                  value={postData.genres}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected?.length === 0) {
                      return <em>Select Genres *</em>;
                    }
                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                  disabled={loading.cover || loading.content}
                >
                  <MenuItem disabled value="">
                    <em>Select Genres</em>
                  </MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={genre.name} value={genre.name}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </li>
              <li className={s.fileContainer}></li>

              <div className={s.playerContainer}>
                <label htmlFor="image">
                  {loading.cover ? (
                    <div className={s.loadingContainer}>
                      <Loading height={"50px"} width={"50px"} />
                    </div>
                  ) : (
                    <div className={s.songCover}>
                      <img
                        src={postData?.cover ? postData.cover : defaultImg}
                        alt="CoverImg"
                      />
                      <div className={!postData?.cover ? s.addImg : s.addNone}>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.78947 0.789474C5.78947 0.353459 5.43601 0 5 0C4.56399 0 4.21053 0.353459 4.21053 0.789474V4.21053L0.789474 4.21053C0.35346 4.21053 0 4.56399 0 5C0 5.43601 0.353459 5.78947 0.789474 5.78947L4.21053 5.78947V9.21053C4.21053 9.64654 4.56399 10 5 10C5.43602 10 5.78947 9.64654 5.78947 9.21053V5.78947L9.21053 5.78947C9.64654 5.78947 10 5.43602 10 5C10 4.56399 9.64654 4.21053 9.21053 4.21053L5.78947 4.21053V0.789474Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                  <input
                    id="image"
                    disabled={loading.cover || loading.content}
                    onChange={(e) => handleChange(e)}
                    type="file"
                    accept="image/*"
                    name="cover"
                  />
                </label>
                <div className={s.songInfo}>
                  <h3>{postData?.title ? postData.title : "Song title"}</h3>
                  {loading.content ? (
                    <div className={s.songLoading}>
                      <Loading height={"50px"} width={"50px"} />
                    </div>
                  ) : (
                    <div>
                      <AudioPlayer
                        style={{ borderRadius: "1rem" }}
                        autoPlay={false}
                        preload={"false"}
                        key={Math.random()}
                        src={postData?.content}
                        showSkipControls={false}
                        showJumpControls={true}
                      />
                      <label className={s.btnRL} htmlFor="song">
                        Upload a Song
                        <input
                          disabled={loading.cover || loading.content}
                          onChange={(e) => handleChange(e)}
                          type="file"
                          id="song"
                          name="content"
                          accept="audio/mp3, video/mp4"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </ul>
          </DialogContent>
          <DialogActions>
            <Button
              className={s.buttonSc}
              autoFocus
              onClick={handleClose}
              disabled={loading.cover || loading.content}
            >
              Cancel
            </Button>
            <Button
              className={s.buttonSc}
              type="submit"
              disabled={loading.cover || loading.content}
            >
              Post
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
