/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Badge,
  Rating,
  TextField,
  Typography,
  SvgIcon,
  Dialog,
  Button,
  Menu,
  Modal,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDocFromServer, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import s from "./SideBar.module.css";
import logo from "../../images/logoicon.png";
import Upload from "../Upload/Upload";
import ButtonSupport from "../buttonSupport/ButtonSupport";
import { useAuth } from "../../context";
import { db } from "../../firebase";
import PayButton from "../pay/PayButton";
import { KeyIcon } from "../componentsIcons";
import {
  getUserDownToRegular,
  getUserNotification,
} from "../../redux/features/users/usersGetSlice";
import EditProfile from "../ProfilePage/EditProfile";

const SideBar = () => {
  const user = useSelector((state) => state.users.currentUser);
  const notification = useSelector((state) => state.users.userNotifications);
  const navigate = useNavigate();
  const { logout, userFirebase } = useAuth();
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts.postList);

  useEffect(async () => {
    const docRef = doc(db, "userConversations", userFirebase?.uid);
    const docSnap = await getDocFromServer(docRef);
    userFirebase?.uid &&
      !docSnap.exists() &&
      (await setDoc(doc(db, "userConversations", userFirebase.uid), {}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserNotification(user._id));
  }, [allPosts]);

  const [anchorEl, setAnchorEl] = useState(false);
  const [openBoolean, setOpenBoolean] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showText, setShowText] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [input, setInput] = useState({
    userId: userFirebase?.auth?.currentUser?.uid,
    name: userFirebase?.auth?.currentUser?.displayName,
    avatar: userFirebase?.auth?.currentUser?.photoURL,
    rating: 0,
    description: "",
  });
  const [checkedSideBar, setCheckedSideBar] = useState(false);

  const iconPremium = "https://www.pngmart.com/files/13/Premium-PNG-Photos.png";

  useEffect(() => {
    const getReviews = async () => {
      let allReviews = await axios.get("/reviews");
      if (allReviews?.data?.find((r) => r.userId === input.userId.toString())) {
        setShowButton(false);
      }
    };
    getReviews();
  }, [input.userId]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleButton = (e) => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.rating === 0)
      return alert("Please choose a rating for the review");
    await axios.post("/reviews", input);
    setShowForm(false);
    setShowText(true);
    setShowButton(false);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownRegular = () => {
    dispatch(getUserDownToRegular(user._id));
  };

  const mouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleShowSettings = () => {
    setOpenSettings(!openSettings);
  };

  const handleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
    setOpenBoolean(!openBoolean);
  };

  const handleCloseAll = () => {
    setShowEditProfile(false);
    setOpenBoolean(false);
  };

  const handleCheckedSideBar = (e) => {
    setCheckedSideBar(!checkedSideBar);
  };

  return (
    <Box
      className={
        checkedSideBar && document.documentElement.clientWidth < 900
          ? s.sideBarResponsive
          : s.sideBar
      }
    >
      <ul className={s.routescontainer}>
        <img
          width="70px"
          alt="logo"
          src={logo}
          onClick={() => handleCheckedSideBar()}
        />
        <Box className={s.profileItem}>
          <Link to={`/home/explore/${user._id}`}>
            <img
              className={s.profilePic}
              width="40px"
              alt="profile"
              src={user?.avatar}
            />
          </Link>
          <Box className={s.nameWithPremium}>
            <h4 className={s.nameSideBar}>{user?.name}</h4>
            {user?.plan === "Premium" && (
              <h5 className={s.premiumText}>Premium</h5>
            )}
          </Box>
          <FontAwesomeIcon
            onClick={() => setOpenBoolean(!openBoolean)}
            className={s.dotsMenu}
            icon={faEllipsis}
          />
        </Box>

        <li className={s.routeItem}>
          {" "}
          <Link to="/home">Home</Link>{" "}
        </li>
        <li className={s.routeItem}>
          {" "}
          <Link to="/home/explore">Explore</Link>{" "}
        </li>

        <li className={s.routeItem}>
          <Link to="/messages">Messages</Link>
        </li>

        <li className={s.routeItem}>
          <Link to="/home/notification">
            Notifications
            {notification > 0 && (
              <Badge
                badgeContent={
                  notification?.filter((noti) => noti?.watched === false)
                    ?.length
                }
                color="secondary"
              >
                <MailIcon color="action" sx={{ paddingLeft: 1 }} />
              </Badge>
            )}
          </Link>
        </li>

        {user?.plan !== "Premium" ? (
          <li className={s.buttonPremium}>
            <PayButton />
          </li>
        ) : (
          <Box>
            <Button
              id="demo-positioned-button"
              className={s.cancelPremiumButton}
              aria-controls={openBoolean ? "demo-positioned-menu" : undefined}
              aria-haspopup={true}
              aria-expanded={openBoolean ? true : undefined}
              onClick={() => setOpenModal(true)}
            >
              Cancel Premium
            </Button>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure to cancel the premium plan?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Confirm now and you will lose all premium features!
                </Typography>
                <Button onClick={() => handleDownRegular()}>Confirm!</Button>
              </Box>
            </Modal>
          </Box>
        )}
      </ul>
      <ul className={s.optionsContainer}>
        <h4 className={s.titleItem}>MY COLLECTION</h4>
        <Link to="/home/likedSongs">
          <li className={s.optionItem}>
            {" "}
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.2563 3.23123C12.5979 2.92292 13.1519 2.92292 13.4936 3.23123L14.0354 3.72014C16.6549 6.08384 16.6549 9.91616 14.0354 12.2799L13.4936 12.7688C13.1519 13.0771 12.5979 13.0771 12.2563 12.7688C11.9146 12.4605 11.9146 11.9606 12.2563 11.6523L12.7981 11.1634C14.7342 9.41629 14.7342 6.58371 12.7981 4.83663L12.2563 4.34772C11.9146 4.03941 11.9146 3.53954 12.2563 3.23123Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.74375 12.7688C7.40207 13.0771 6.84811 13.0771 6.50644 12.7688L5.96462 12.2799C3.34513 9.91616 3.34513 6.08384 5.96462 3.72014L6.50644 3.23123C6.84811 2.92292 7.40207 2.92292 7.74375 3.23123C8.08542 3.53954 8.08542 4.03941 7.74375 4.34772L7.20193 4.83663C5.26578 6.58371 5.26578 9.41629 7.20192 11.1634L7.74375 11.6523C8.08542 11.9606 8.08542 12.4605 7.74375 12.7688Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.1984 0.264394C15.4901 -0.057389 15.9967 -0.0899961 16.33 0.191564C21.2233 4.32532 21.2233 11.6747 16.33 15.8084C15.9967 16.09 15.4901 16.0574 15.1984 15.7356C14.9068 15.4138 14.9406 14.9247 15.2739 14.6432C19.437 11.1263 19.437 4.87371 15.2739 1.35684C14.9406 1.07528 14.9068 0.586177 15.1984 0.264394Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.80158 15.7356C4.50994 16.0574 4.00333 16.09 3.67003 15.8084C-1.22335 11.6747 -1.22334 4.32532 3.67003 0.191565C4.00333 -0.0899962 4.50994 -0.0573886 4.80158 0.264394C5.09322 0.586177 5.05944 1.07528 4.72614 1.35684C0.563021 4.8737 0.56302 11.1263 4.72614 14.6432C5.05944 14.9247 5.09322 15.4138 4.80158 15.7356Z"
                fill="white"
              />
              <path
                d="M11 8C11 8.55228 10.5523 9 10 9C9.44772 9 9 8.55228 9 8C9 7.44772 9.44772 7 10 7C10.5523 7 11 7.44772 11 8Z"
                fill="white"
              />
            </svg>{" "}
            Liked Songs{" "}
          </li>
        </Link>
        <Link to="/home/likedVideos">
          <li className={s.optionItem}>
            {" "}
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 1.5V14.5H18.5V1.5H1.5ZM1 0C0.447715 0 0 0.447715 0 1V15C0 15.5523 0.447716 16 1 16H19C19.5523 16 20 15.5523 20 15V1C20 0.447715 19.5523 0 19 0H1Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 8L8 4L8 12L14 8ZM11.2958 8L9.5 6.80278L9.5 9.19722L11.2958 8Z"
                fill="white"
              />
            </svg>{" "}
            Liked Music Videos{" "}
          </li>
        </Link>
      </ul>
      <ul className={s.optionsContainer}>
        <h4 className={s.titleItem}>ME</h4>
        <li className={s.optionItem}>
          {" "}
          <Upload />{" "}
        </li>
        <li className={s.optionItem}>
          {" "}
          <ButtonSupport />{" "}
        </li>

        <li
          className={s.optionItem}
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <svg
            width="23"
            height="22"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.99988 19.7499C8.41409 19.7499 8.74988 20.0857 8.74988 20.4999C8.74988 20.9141 8.41409 21.2499 7.99988 21.2499H7.39988H7.36688C6.27473 21.2499 5.40923 21.2499 4.71161 21.1929C3.99822 21.1346 3.3946 21.013 2.84342 20.7322C1.94965 20.2768 1.223 19.5501 0.767597 18.6564C0.48676 18.1052 0.365152 17.5016 0.306866 16.7882C0.249868 16.0906 0.249872 15.2251 0.249878 14.1329V14.1329V14.0999V7.89991V7.86691V7.86688C0.249873 6.77475 0.249869 5.90926 0.306866 5.21164C0.365153 4.49825 0.48676 3.89463 0.767598 3.34345C1.223 2.44968 1.94965 1.72303 2.84342 1.26763C3.3946 0.986789 3.99822 0.865183 4.71161 0.806896C5.40923 0.749899 6.27472 0.749903 7.36686 0.749908H7.39988H7.99988C8.41409 0.749908 8.74988 1.0857 8.74988 1.49991C8.74988 1.91412 8.41409 2.24991 7.99988 2.24991H7.39988C6.2674 2.24991 5.46314 2.25049 4.83376 2.30191C4.21313 2.35262 3.82888 2.449 3.52441 2.60414C2.91288 2.91573 2.4157 3.41291 2.10411 4.02444C1.94897 4.32891 1.85259 4.71316 1.80188 5.33379C1.75046 5.96317 1.74988 6.76743 1.74988 7.89991L1.74988 14.0999C1.74988 15.2324 1.75046 16.0366 1.80188 16.666C1.85259 17.2867 1.94897 17.6709 2.10411 17.9754C2.4157 18.5869 2.91288 19.0841 3.52441 19.3957C3.82888 19.5508 4.21313 19.6472 4.83376 19.6979C5.46314 19.7493 6.2674 19.7499 7.39988 19.7499H7.99988ZM14.5303 17.5303C14.8232 17.2374 14.8232 16.7626 14.5303 16.4697L9.81059 11.75H21.9999C22.4141 11.75 22.7499 11.4142 22.7499 11C22.7499 10.5858 22.4141 10.25 21.9999 10.25H9.81059L14.5303 5.53034C14.8232 5.23744 14.8232 4.76257 14.5303 4.46968C14.2374 4.17678 13.7625 4.17678 13.4696 4.46968L7.47027 10.469L7.46901 10.4703L6.93927 11L7.4696 11.5303L13.4696 17.5303C13.7625 17.8232 14.2374 17.8232 14.5303 17.5303Z"
              fill="white"
            />
          </svg>
          Logout
        </li>
        {user?.role === "Admin" && (
          <li className={s.optionItem} onClick={() => navigate("/admin")}>
            <KeyIcon /> Admin
          </li>
        )}
      </ul>
      {
        <Dialog onClose={handleClose} open={open}>
          <Box className={s.form}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <p className={s.ratingText}>Choose the rating:</p>
              <Rating
                name="rating"
                value={input.rating}
                onChange={(e) => handleChange(e)}
              />
              <p className={s.descriptionText}>Write your review below:</p>
              <TextField
                className={s.reviewText}
                type="multiline"
                multiline
                required={true}
                autoComplete="off"
                variant="standard"
                style={{ width: 350 }}
                label="Description"
                name="description"
                rows={4}
                onChange={(e) => handleChange(e)}
                value={input.description}
              />
              <Box>
                <button className={s.btn}>Submit</button>
              </Box>
            </form>
          </Box>
        </Dialog>
      }
      {showEditProfile && (
        <EditProfile
          close={handleCloseAll}
          setOpenSettings={handleShowSettings}
        />
      )}
      {openBoolean && (
        <Box
          className={s.backgroundEditProfile}
          onClick={() => setOpenBoolean(!openBoolean)}
        >
          <Box className={s.editProfileBox} onClick={() => handleEditProfile()}>
            <h4 style={{ color: "black", fontWeight: 500 }}>Edit profile</h4>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SideBar;
