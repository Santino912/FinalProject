import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import style from "../../ShortStyle.module.css";

const UserShort = ({ user }) => {
  return (
    <Box className={style.FindedContainerShort}>
      <Avatar
        className={style.avatar}
        src={user?.avatar}
        alt={`${user.name} avatar`}
      />
      <Box>
        <Typography variant={"h6"} component={"h6"}>
          {user?.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserShort;
