import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./reportUsers.module.css";

const ReportUsers = ({
  data: {
    title,
    content,
    post,
    userId,
    user: { name, email, avatar },
  },
}) => {
  const navigate = useNavigate();
  return (
    <Box className={style.containerAll}>
      <Box className={style.reporterDiv}>
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            color: "var(--second-page-color)",
          }}
          to={`/home/explore/${userId}`}
        >
          <Avatar src={avatar} alt={`Perfil image ${name}`} />
          <h6>{email}</h6>
        </Link>

        <h1>Reason: {title}</h1>
        <Box className={style.detailContainer}>
          <h3>Detail: {content}</h3>
        </Box>
        <Button onClick={() => navigate(`/home/post/${post._id}`)}>Post</Button>
      </Box>
    </Box>
  );
};

export default ReportUsers;
