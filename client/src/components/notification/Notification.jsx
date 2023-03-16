/* eslint-disable react-hooks/exhaustive-deps */

import {
  Stack,
  Typography,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  Button,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { DateTime } from "luxon";
import {
  disabledUserNotification,
  getUserByFirebaseId,
  getUserNotification,
  watchedUserNotification,
} from "../../redux/features/users/usersGetSlice";
import SideBar from "../SideBar/SideBar";
import { useAuth } from "../../context/";
import style from "./notification.module.css";

const Notification = () => {
  const dispatch = useDispatch();
  const userNotification = useSelector(
    (state) => state.users.userNotifications
  );
  const userDB = useSelector((state) => state.users.currentUser);
  const { userFirebase } = useAuth();

  useEffect(() => {
    dispatch(getUserByFirebaseId(userFirebase.uid));
    dispatch(getUserNotification(userDB._id));
  }, []);

  const handleWatched = () => {
    if (userNotification) {
      userNotification?.forEach((el) => {
        dispatch(watchedUserNotification(el._id));
      });
    }
  };

  const handleDelete = () => {
    if (userNotification) {
      userNotification?.forEach((el) => {
        dispatch(disabledUserNotification(el._id));
      });
    }
  };
  return (
    <>
      <div className={style.divContainer}>
        <Stack direction="row">
          <div className={style.background}></div>
          <div style={{ minWidth: "266px" }}>
            <SideBar userDB={userDB} />
          </div>
          <div className={style.container}>
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: "600", color: "white", paddingTop: "20px" }}
            >
              Notifications.
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              sx={{ marginTop: "13px" }}
            >
              <div className={style.containerDescription}>
                <>
                  {userNotification?.length > 0 ? (
                    userNotification?.map((user) => {
                      let data = JSON.parse(user?.title);
                      return (
                        <div key={user._id}>
                          <List className={style.list} sx={{ width: "100%" }}>
                            <ListItemButton>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Link to={`/home/explore/${user.fromUser}`}>
                                    <Avatar
                                      sx={{ width: 54, height: 54 }}
                                      alt="avatar.."
                                      src={data?.img}
                                    />
                                  </Link>
                                </ListItemAvatar>
                                <ListItemText
                                  component="div"
                                  primary={
                                    <Stack direction="row">
                                      <Typography
                                        sx={{
                                          display: "inline",
                                          fontSize: 17,
                                          fontWeight: 600,
                                          marginLeft: 2,
                                        }}
                                        component="h4"
                                        variant="body2"
                                        color="#ffffff"
                                      >
                                        <Link
                                          to={`/home/explore/${user.fromUser}`}
                                        >
                                          {" "}
                                          {data?.name}
                                        </Link>
                                        {!user.watched ? (
                                          ""
                                        ) : (
                                          <span className={style.watched}>
                                            watched
                                          </span>
                                        )}
                                      </Typography>
                                    </Stack>
                                  }
                                  secondary={
                                    <>
                                      <Stack>
                                        <Typography
                                          sx={{
                                            display: "inline",
                                            fontSize: 16,
                                            fontWeight: 500,
                                            marginLeft: 2,
                                          }}
                                          component="span"
                                          variant="subtitle1"
                                          color="#757575"
                                        >
                                          {data?.post}{" "}
                                          <Link to={user._id}>
                                            {user?.content && (
                                              <Button
                                                href="#text-buttons"
                                                variant="outlined"
                                                color="success"
                                                sx={{
                                                  marginLeft: 1,
                                                  color: "#c4c4c4",
                                                  fontSize: 12,
                                                  fontWeight: 16,
                                                }}
                                                onClick={() => handleWatched()}
                                              >
                                                Post
                                              </Button>
                                            )}
                                          </Link>
                                        </Typography>
                                      </Stack>

                                      <div>
                                        <div>
                                          <IconButton
                                            aria-label="delete"
                                            size="large"
                                            color="primary"
                                            sx={{
                                              marginLeft: 150,
                                              color: "red",
                                            }}
                                            onClick={() => handleDelete()}
                                          >
                                            <DeleteIcon fontSize="inherit" />
                                          </IconButton>
                                        </div>
                                        <Typography
                                          sx={{
                                            display: "inline",
                                            fontSize: 12,
                                            marginLeft: 146,
                                          }}
                                          component="span"
                                          variant="body2"
                                          color="#757575"
                                        >
                                          {DateTime.fromISO(user.date).toFormat(
                                            "ff"
                                          )}
                                        </Typography>
                                      </div>
                                    </>
                                  }
                                />
                              </ListItem>
                            </ListItemButton>
                          </List>
                        </div>
                      );
                    })
                  ) : (
                    <div className={style.divNotNotification}>
                      <h2>You don't have any notification.</h2>
                    </div>
                  )}
                </>
              </div>
            </Stack>
          </div>
        </Stack>
      </div>
    </>
  );
};

export default Notification;
