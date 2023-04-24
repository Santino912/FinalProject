import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdToProfile } from "../../redux/features/users/usersGetSlice";
import { Stack, ThemeProvider } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, createTheme } from "@mui/material";
import { changeUserChat } from "../../redux/features/chat/chatGetSlice";
import styles from "./ProfilePage.module.css";
import checkIcon from "../../images/checkIcon.png";
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
import { followRequest } from "./utils";
import { cleanUserToProfile } from "../../redux/features/users/usersSlice";
//import { createUserNotification } from "../../utils";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const currentUser = useSelector((state) => state.users.currentUser);
  const profileUser = useSelector((state) => state.users.userToProfile);
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const followBoolean = profileUser?.followers?.some(
      (follow) => follow?.user === currentUser?._id
    );
    setFollowing(followBoolean);
    setFollowersCount(profileUser?.followersCount);
    setFollowingCount(profileUser?.followingCount);
  }, [profileUser, dispatch]);

  useEffect(() => {
    dispatch(getUserByIdToProfile(_id));

    return () => {
      dispatch(cleanUserToProfile());
    };
  }, [dispatch, _id]);

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

  const handleFollow = () => {
    setFollowing(!following);
    const num = following ? -1 : +1;
    setFollowersCount(followersCount + num);
    followRequest({ idUser: currentUser?._id, followTo: profileUser?._id });
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

        <Box className={styles.containerSideBar} />

        <Box className={styles.containerProfile}>
          <Box className={styles.containerProfileData}>
            <Box className={styles.bannerContainer}>
              <img
                src={profileUser?.banner}
                className={styles.banner}
                alt="Banner"
              />
            </Box>
            <Box className={styles.containerImgName}>
              <img
                src={profileUser.avatar}
                className={styles.avatar}
                alt="Avatar"
              />
              <Box className={styles.artistData}>
                {profileUser.plan === "Premium" ? (
                  <Box className={styles.badge}>
                    <img src={checkIcon} alt="CheckIcon" />
                    <p>Premium Artist</p>
                  </Box>
                ) : null}
                <h1 className={styles.profileUserName}>{profileUser.name}</h1>
              </Box>
            </Box>
            <Box className={styles.optionsContainer}>
              {currentUser._id === profileUser._id && (
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
            <Box className={styles.followersCount}>
              <p className={styles.followersCount}>
                {followersCount <= 1
                  ? `・${followersCount} Follower`
                  : `・${followersCount} Followers`}
                {followingCount <= 1
                  ? `・ Follow ${followingCount} user`
                  : `・ Follow ${followingCount} users`}
              </p>
            </Box>
            <Box className={styles.playFollowMessageContainer}>
              <Box className={styles.playFollowContainer}>
                {profileUser?.posts?.length > 0 ? (
                  <Box>
                    <PlayAllButton songs={profileUser?.posts} />
                  </Box>
                ) : null}
                {currentUser?._id !== profileUser?._id && (
                  <Button
                    className={
                      following ? styles.followingButton : styles.followButton
                    }
                    onClick={handleFollow}
                    variant="contained"
                  >
                    {following ? "Following" : "Follow"}
                  </Button>
                )}
              </Box>
              {currentUser?._id !== profileUser?._id ? (
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
            {profileUser?.posts?.length > 0 ? (
              <Box>
                <Box className={styles.popuAndLiked}>
                  <Box className={styles.liked}>
                    <LikedSongs user={profileUser} />
                  </Box>
                </Box>
                <Box className={styles.allPosts}>
                  <AllPosts posts={profileUser?.posts} />
                </Box>
              </Box>
            ) : (
              <Box>
                <Box className={styles.popuAndLiked}>
                  {currentUser._id === profileUser._id ? (
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
                    <LikedSongs user={profileUser} />
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
