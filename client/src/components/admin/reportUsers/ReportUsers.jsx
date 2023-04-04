import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./reportUsers.module.css";

const ReportUsers = ({ data: { title, content, idUser, idPost, post } }) => {
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
          to={`/home/explore/${idUser}`}
        >
          <Avatar
            src={post?.user?.avatar}
            alt={`Perfil image ${post?.user?.name}`}
          />
          <h6>{post?.user?.email}</h6>
        </Link>

        <h1>Reason: {title}</h1>
        <Box className={style.detailContainer}>
          <h3>Detail: {content}</h3>
        </Box>
        <Button onClick={() => navigate(`/home/post/${idPost}`)}>Post</Button>
      </Box>
    </Box>
  );
};

export default ReportUsers;
