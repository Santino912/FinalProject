import React, { useEffect, useState } from "react";
import style from "./graphs.module.css";
import { Box } from "@mui/system";
import PieComponent from "../pieGraph/Pie";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataForGraphs,
  getUser,
} from "../../../redux/features/users/usersGetSlice";
import { getPost } from "../../../redux/features/post/postGetSlice";
import { arrayToDataGraphsPosts, arrayToDataGraphsUser } from "../utils";
import AreaComponent from "../areaGraphs/Area";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const AdminGraphs = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);
  const dispatch = useDispatch();
  const userDataGraphs = useSelector((state) => state.users.userGraphsData);
  const postDataGraphs = useSelector((state) =>
    arrayToDataGraphsPosts(state.posts.postListAll)
  );
  useEffect(() => {
    dispatch(getPost());
    dispatch(getUser());
    dispatch(getDataForGraphs());
  }, [dispatch]);

  useEffect(() => {
    setMaxSteps(postDataGraphs?.length);
  }, [postDataGraphs]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Box className={style.backgroundContainer}>
      <Box className={style.containerGraphPie}>
        <PieComponent data={userDataGraphs} />
      </Box>
      <Box className={style.containerGraphArea}>
        {typeof postDataGraphs === "string" && (
          <h1 style={{ color: "white" }}>{postDataGraphs}</h1>
        )}
        {typeof postDataGraphs !== "string" && (
          <AreaComponent dates={postDataGraphs} step={activeStep} />
        )}
      </Box>
      <Box>
        {typeof postDataGraphs !== "string" && (
          <MobileStepper
            sx={{
              backgroundColor: "var(--main-page-color)",
              color: "white",
              minWidth: 200,
              flexGrow: 1,
              width: "100%",
            }}
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                sx={{ color: "var(--second-page-color)" }}
                size="small"
                onClick={handleNext}
                disabled={activeStep >= maxSteps - 1}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                sx={{ color: "var(--second-page-color)" }}
                size="small"
                onClick={handleBack}
                disabled={activeStep <= 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default AdminGraphs;
