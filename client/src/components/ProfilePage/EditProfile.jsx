import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Box, Button, TextField } from "@mui/material";
import { updateUser } from "../../redux/features/users/usersGetSlice";
import { storage } from "../../firebase";
import Loading from "../loading/Loading";
import PayButton from "../pay/PayButton";
import styles from "./EditProfile.module.css";

const EditProfile = (close) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const [input, setInput] = useState({
    name: currentUser.name,
    username: currentUser.username,
    avatar: currentUser.avatar,
    banner: currentUser.banner,
  });
  const [imageUrl, setImageUrl] = useState(currentUser.avatar);
  const [bannerUrl, setBannerUrl] = useState(currentUser.banner);
  const [loading, setLoading] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);

  function uploadFile(file) {
    setLoading(true);
    const fileRef = ref(storage, `profileAvatar/${file.name + Math.random()}`);
    return uploadBytes(fileRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        setLoading(false);
        setImageUrl(url);
        return url;
      })
      .catch((err) => console.log(err));
  }

  async function uploadBanner(file) {
    setBannerLoading(true);
    const fileRef = ref(storage, `profileBanner/${file.name + Math.random()}`);
    return uploadBytes(fileRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        setBannerLoading(false);
        setBannerUrl(url);
        return url;
      })
      .catch((err) => console.log(err));
  }

  async function handleChange(el) {
    el.target.name === "avatar"
      ? setInput({
          ...input,
          [el.target.name]: await uploadFile(el.target.files[0]),
        })
      : el.target.name === "banner"
      ? setInput({
          ...input,
          [el.target.name]: await uploadBanner(el.target.files[0]),
        })
      : setInput({
          ...input,
          [el.target.name]: el.target.value,
        });
  }

  function handleSubmit() {
    dispatch(updateUser(currentUser._id, input));
    const func = (function () {
      window.location.reload();
    })();
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.containerSettings}>
        <Box className={styles.header}>
          <h1>Edit your profile</h1>
          <p>
            <FontAwesomeIcon onClick={close.close} icon={faXmark} />
          </p>
        </Box>
        <Box className={styles.content}>
          <input
            type="file"
            accept="image/*"
            name="avatar"
            id="avatar"
            onChange={(e) => handleChange(e)}
          />
          <label style={{ position: "relative" }} htmlFor="avatar">
            {loading ? (
              <img className={styles.imageLoading} src={imageUrl} alt="" />
            ) : (
              <img src={imageUrl} alt="" />
            )}

            <Box className={styles.containerLoading}>
              {loading ? <Loading width={"60px"} height={"60px"} /> : null}
            </Box>
          </label>
          <Box className={styles.inputs}>
            <TextField
              onChange={(e) => handleChange(e)}
              label="Choose your name"
              defaultValue={currentUser.name}
              variant="standard"
              sx={{ marginBottom: "25px" }}
              name="name"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              label="Choose your username"
              defaultValue={currentUser.username}
              variant="standard"
              name="username"
            />
          </Box>
          <Button
            sx={{
              position: "absolute",
              right: "5px",
              bottom: "5px",
              fontSize: "16px",
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
        {currentUser.plan === "Premium" ? (
          <Box className={styles.containerBanner}>
            <p>Choose your banner!</p>
            <input
              type="file"
              accept="image/*"
              name="banner"
              id="banner"
              onChange={(e) => handleChange(e)}
            />
            <label style={{ position: "relative" }} htmlFor="banner">
              {bannerLoading ? (
                <img className={styles.imageLoading} src={bannerUrl} alt="" />
              ) : (
                <img src={bannerUrl} alt="" />
              )}

              <Box className={styles.containerBannerLoading}>
                {bannerLoading ? (
                  <Loading width={"60px"} height={"60px"} />
                ) : null}
              </Box>
            </label>
          </Box>
        ) : (
          <Box style={{ display: "flex", alignItems: "center" }}>
            <p
              style={{ color: "white", fontSize: "14px", marginRight: "10px" }}
            >
              Go premium to modify the banner!
            </p>
            <PayButton />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EditProfile;
