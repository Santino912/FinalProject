import { Avatar, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import style from "./admin.module.css";

const UsersPerfil = ({ user }) => {
  const [colorUser, setColorUser] = useState("white");
  useEffect(() => {
    if (user.isBanned === "true") return setColorUser("red");
    if (user.role === "Admin") return setColorUser("var(--second-page-color)");
    if (user.plan === "Premium") return setColorUser("yellow");
  }, [user]);

  return (
    <Button sx={{ color: colorUser, padding: "0" }} fullWidth>
      <div className={style.userDiv}>
        <Avatar alt={user.name} src={user.avatar} />
        <h4>{user.name}</h4>
      </div>
    </Button>
  );
};

export default UsersPerfil;
