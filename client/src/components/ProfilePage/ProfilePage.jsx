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
  getPostsByUser,
  getFollowsByUserId,
  getPostLiked,
} from "../../redux/features/users/usersGetSlice";
import { Stack, ThemeProvider } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, createTheme, Menu, MenuItem, Modal } from "@mui/material";
import { getPost } from "../../redux/features/post/postGetSlice";
import { changeUserChat } from "../../redux/features/chat/chatGetSlice";
import styles from "./ProfilePage.module.css";
import checkIcon from "../../images/checkIcon.png";
import Popular from "./Popular";
import LikedSongs from "./LikedSongs";
import AllPosts from "./AllPosts";
import EditProfile from "./EditProfile";
import Upload from "../Upload/Upload";
import PlayAllButton from "../PlayAllButton/PlayAllButton";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getFollowOfThisUser } from "../../redux/features/users/utilsUsers";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const user = useSelector((state) => state.users.user);
  const currentUser = useSelector((state) => state.users.currentUser);
  const profileUserFollowers = useSelector((state) => state.users.userFollows);
  const artistPosts = useSelector((state) => state.users.userProfilePosts);
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
    dispatch(getPostLiked(_id));
    dispatch(getPostsByUser(_id));
    dispatch(getFollowsByUserId(_id));
  }, [dispatch, _id]);
  useEffect(() => {
    setFollowed(getFollowOfThisUser(profileUserFollowers, _id));
  }, [profileUserFollowers]);

  const notification = async () => {
    if (currentUser._id !== user._id) {
      await dispatch(
        createUserNotification({
          title: JSON.stringify({
            name: `${currentUser.username} has started following you.`,
            img: currentUser.avatar,
            post: "",
          }),
          content: "",
          userId: user._id,
          fromUser: currentUser._id,
        })
      );
      console.log("notification created!");
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenSettings = () => {
    setOpen(!open);
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(!openSettings);
  };

  const handleFollow = async () => {
    await dispatch(
      setUserFollow({
        idUser: currentUser._id,
        followTo: user._id,
      })
    );
    await notification();
    setFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(
      setUserUnfollow({
        idUser: currentUser._id,
        followTo: user._id,
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
      currentUser.idGoogle > user.idGoogle
        ? currentUser.idGoogle + user.idGoogle
        : user.idGoogle + currentUser.idGoogle;
    dispatch(changeUserChat({ destination: user, chatId: combinedId }));
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userConversations", currentUser.idGoogle), {
          [combinedId + ".userInfo"]: {
            uid: user.idGoogle,
            displayName: user.name,
            photoURL: user.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userConversations", user.idGoogle), {
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

        <Box className={styles.containerSideBar} />

        <Box className={styles.containerProfile}>
          <Box className={styles.containerProfileData}>
            <Box className={styles.bannerContainer}>
              <img src={user?.banner} className={styles.banner} alt="Banner" />
            </Box>
            <Box className={styles.containerImgName}>
              <img src={user.avatar} className={styles.avatar} alt="Avatar" />
              <Box className={styles.artistData}>
                {user.plan === "Premium" ? (
                  <Box className={styles.badge}>
                    <img src={checkIcon} alt="CheckIcon" />
                    <p>Premium Artist</p>
                  </Box>
                ) : null}
                <h1 className={styles.profileUserName}>{user.name}</h1>
                <Box className={styles.followersCount}>
                  <p className={styles.followersCount}>
                    {profileUserFollowers?.length === 1
                      ? `${profileUserFollowers?.length} follower `
                      : `${profileUserFollowers?.length} followers `}
                    {user.followingUsers?.length > 0
                      ? user.followingUsers?.length === 1
                        ? ` ・ Follow ${profileUserFollowers?.length} user`
                        : ` ・ Follow ${profileUserFollowers?.length} users`
                      : null}
                  </p>
                </Box>
              </Box>
            </Box>
            <Box className={styles.optionsContainer}>
              {currentUser._id === user._id && (
                <FontAwesomeIcon
                  onClick={() => handleOpen()}
                  className={styles.optionsButton}
                  icon={faEllipsis}
                />
              )}
              {open && (
                <Box
                  className={styles.optionsModal}
                  onClick={() => handleOpen()}
                >
                  <Button onClick={() => handleOpenSettings()}>
                    Edit profile
                  </Button>
                </Box>
              )}
            </Box>
          </Box>

          <Box className={styles.contentContainer}>
            <Box className={styles.playFollowMessageContainer}>
              <Box className={styles.playFollowContainer}>
                {artistPosts?.length > 0 ? (
                  <Box>
                    <PlayAllButton songs={artistPosts} />
                  </Box>
                ) : null}
                {currentUser._id !== user._id ? (
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
              {currentUser._id !== user._id ? (
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
            {artistPosts?.length > 0 ? (
              <Box>
                <Box className={styles.popuAndLiked}>
                  <Box className={styles.popu}>
                    <Popular user={user} />
                  </Box>
                  <Box className={styles.liked}>
                    <LikedSongs user={user} />
                  </Box>
                </Box>
                <Box className={styles.allPosts}>
                  <AllPosts artistPostsObj={artistPosts} />
                </Box>
              </Box>
            ) : (
              <Box>
                <Box className={styles.popuAndLiked}>
                  {currentUser._id === user._id ? (
                    <Box className={styles.noPostsYet}>
                      <p>Share your music with other users</p>
                      <Box className={styles.buttonPost}>
                        <Upload />
                      </Box>
                    </Box>
                  ) : (
                    <p className={styles.noPostsYet}>
                      This user has not posted anything yet
                    </p>
                  )}

                  <Box className={styles.liked}>
                    <LikedSongs user={user} />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          {openSettings && (
            <Box className={styles.editProfile}>
              <EditProfile
                close={handleCloseSettings}
                setOpenSettings={() => setOpenSettings()}
              />
            </Box>
          )}
        </Box>
      </Stack>
    </ThemeProvider>
  );
};

export default ProfilePage;
