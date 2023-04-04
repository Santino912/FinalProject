import React from "react";
import { Box } from "@mui/system";
import style from "./conditions.module.css";
import { Button } from "@mui/material";

const Conditions = ({ showConditions, setShowConditions, styleTo }) => {
  return (
    <Box
      onClick={() => setShowConditions(false)}
      className={
        styleTo === "Login"
          ? style.modalContainerLogin
          : style.modalContainerRegister
      }
    >
      <Box className={style.modal}>
        <h3 className={style.textConditions}>
          The purpose of the application is to upload your own content. We are
          not responsible for the content that is uploaded on our page
        </h3>
        <Button
          className={style.buttonConditions}
          onClick={() => setShowConditions(false)}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default Conditions;
