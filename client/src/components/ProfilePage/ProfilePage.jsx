import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  getUserLikes,
  setUserFollow,
  setUserUnfollow,
  createUserNotification,
  cleanUserState,
} from "../../redux/features/users/usersGetSlice";
import { getPost } from "../../redux/features/post/postGetSlice";
import { Stack, ThemeProvider } from "@mui/system";
import { Box, Button, createTheme, Menu, MenuItem, Modal } from "@mui/material";
import styles from "./ProfilePage.module.css";
import SideBar from "../SideBar/SideBar";
import checkIcon from "../../images/checkIcon.png";
import Popular from "./Popular";
import LikedSongs from "./LikedSongs";
import AllPosts from "./AllPosts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import EditProfile from "./EditProfile";
import Upload from "../Upload/Upload";
import { changeUserChat } from "../../redux/features/chat/chatGetSlice";
import PlayAllButton from "../PlayAllButton/PlayAllButton";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const profileUser = useSelector((state) => state.users.user);
  const currentUser = useSelector((state) => state.users.currentUser);
  const profileUserFollowers = useSelector(
    (state) => state.users.user.FollowerUsers
  );
  const allPosts = useSelector((state) => state.posts.postListAll);
  const artistPosts = Array.isArray(allPosts)
    ? allPosts.filter((post) => post.userId === _id)
    : [];
  const userDB = useSelector((state) => state.users.currentUser);
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    return () => dispatch(cleanUserState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPost());
    dispatch(getUserById(_id));
    dispatch(getUserLikes(_id));
  }, [dispatch, _id]);

  useEffect(() => {
    getFollowOfThisUser();
  });

  function getFollowOfThisUser() {
    let check;
    if (profileUserFollowers) {
      check = profileUserFollowers.find((user) => user._id === currentUser._id);
    }
    if (check !== undefined) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
    return check;
  }

  const notification = async () => {
    if (currentUser._id !== profileUser._id) {
      await dispatch(
        createUserNotification({
          title: JSON.stringify({
            name: `${currentUser.username} has started following you.`,
            img: currentUser.avatar,
            post: "",
          }),
          content: "",
          userId: profileUser._id,
          fromUser: currentUser._id,
        })
      );
      console.log("notification created!");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const handleFollow = async () => {
    await dispatch(
      setUserFollow({
        idUser: currentUser._id,
        followTo: profileUser._id,
      })
    );
    await notification();
    setFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(
      setUserUnfollow({
        idUser: currentUser._id,
        followTo: profileUser._id,
      })
    );
    setFollowed(false);
  };

  const theme = createTheme({
    typography: {
      fontFamily: [
        "Inter",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });

  const handleOnSelect = async () => {
    const combinedId =
      currentUser.idGoogle > profileUser.idGoogle
        ? currentUser.idGoogle + profileUser.idGoogle
        : profileUser.idGoogle + currentUser.idGoogle;
    dispatch(changeUserChat({ destination: profileUser, chatId: combinedId }));
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userConversations", currentUser.idGoogle), {
          [combinedId + ".userInfo"]: {
            uid: profileUser.idGoogle,
            displayName: profileUser.name,
            photoURL: profileUser.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userConversations", profileUser.idGoogle), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.idGoogle,
            displayName: currentUser.name,
            photoURL: currentUser.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row">
        <Box className={styles.fondo}></Box>

        <Box className={styles.containerSideBar}>
          <SideBar userDB={userDB} />
        </Box>

        <Box className={styles.containerProfile}>
          <Box className={styles.containerProfileData}>
            <Box
              style={{
                background: `url(${profileUser?.banner})`,
                backgroundSize: "cover",
                backgroundColor: "brightness(50%)",
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: "-100",
                filter: "blur(1px)",
              }}
            ></Box>
            <Box className={styles.containerImgName}>
              <img src={profileUser.avatar} alt="" />
              <Box className={styles.artistData}>
                {profileUser.plan === "Premium" ? (
                  <Box className={styles.badge}>
                    <img src={checkIcon} alt="" />
                    <p>Premium Artist</p>
                  </Box>
                ) : null}
                <h1>{profileUser.name}</h1>
                <Box className={styles.followersCount}>
                  <p className={styles.followersCount}>
                    {profileUser.FollowerUsers?.length === 1
                      ? `${profileUser?.FollowerUsers?.length} follower `
                      : `${profileUser?.FollowerUsers?.length} followers `}
                    {profileUser.FollowingUsers?.length > 0
                      ? profileUser.FollowingUsers.length === 1
                        ? ` ・ Follow ${profileUser?.FollowingUsers?.length} user`
                        : ` ・ Follow ${profileUser?.FollowingUsers?.length} users`
                      : null}
                  </p>
                </Box>
              </Box>
            </Box>
            <Box className={styles.optionsContainer}>
              {currentUser._id === profileUser._id ? (
                <FontAwesomeIcon
                  onClick={handleOpen}
                  className={styles.optionsButton}
                  icon={faEllipsis}
                />
              ) : null}
              <Menu
                className={styles.optionsModal}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "top",
                }}
              >
                <MenuItem onClick={handleOpenSettings}>Edit profile</MenuItem>
              </Menu>
              <Modal
                open={openSettings}
                onClose={handleCloseSettings}
                sx={{ backdropFilter: "blur(3px)" }}
              >
                <EditProfile
                  close={handleCloseSettings}
                  setOpenSettings={setOpenSettings}
                />
              </Modal>
            </Box>
          </Box>

          <Box className={styles.contentContainer}>
            <Box className={styles.playFollowMessageContainer}>
              <Box className={styles.playFollowContainer}>
                {artistPosts.length > 0 ? (
                  <Box>
                    <PlayAllButton songs={artistPosts} />
                  </Box>
                ) : null}
                {currentUser._id !== profileUser._id ? (
                  !followed ? (
                    <Button
                      onClick={handleFollow}
                      variant="contained"
                      sx={{
                        height: "48px",
                        marginLeft: "30px",
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                        backgroundColor: "rgba(0, 255, 214, 1)",
                        width: "110px",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(0, 255, 214, 1)",
                        },
                      }}
                    >
                      Follow
                    </Button>
                  ) : (
                    <Button
                      onClick={handleUnfollow}
                      variant="contained"
                      sx={{
                        height: "48px",
                        marginLeft: "30px",
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                        backgroundColor: "rgba(195, 195, 195, 1)",
                        width: "110px",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(195, 195, 195, 0.8)",
                        },
                      }}
                    >
                      Following
                    </Button>
                  )
                ) : null}
              </Box>
              {currentUser._id !== profileUser._id ? (
                <Box>
                  <p
                    style={{
                      color: "white",
                      fontSize: "30px",
                      marginLeft: "10px",
                    }}
                  >
                    <Link to="/messages">
                      <FontAwesomeIcon
                        onClick={handleOnSelect}
                        icon={faEnvelope}
                      />
                    </Link>
                  </p>
                </Box>
              ) : null}
            </Box>
            {artistPosts.length > 0 ? (
              <Box>
                <Box className={styles.popuAndLiked}>
                  <Box className={styles.popu}>
                    <Popular _id={_id} />
                  </Box>
                  <Box className={styles.liked}>
                    <LikedSongs _id={_id} />
                  </Box>
                </Box>
                <Box className={styles.allPosts}>
                  <AllPosts artistPostsObj={artistPosts} />
                </Box>
              </Box>
            ) : (
              <Box>
                <Box className={styles.popuAndLiked}>
                  {currentUser._id === profileUser._id ? (
                    <Box className={styles.noPostsYet}>
                      <p>Share your music with other users</p>
                      <button className={styles.buttonPost}>
                        <Upload />
                      </button>
                    </Box>
                  ) : (
                    <p className={styles.noPostsYet}>
                      This user has not posted anything yet
                    </p>
                  )}

                  <Box className={styles.liked}>
                    <LikedSongs />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
    </ThemeProvider>
  );
};

export default ProfilePage;
