import { Box } from "@mui/material";
import React, { useState } from "react";
import style from "./adminPosts.module.css";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsReported } from "../../../redux/features/post/postGetSlice";
import { Arrow } from "../../componentsIcons";
import { useNavigate } from "react-router-dom";
import ReportUsers from "../reportUsers/ReportUsers";

const AdminPosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsReported());
  }, [dispatch]);

  const postsReportedArr = useSelector((state) => state.posts.reportedPosts);
  const [maxSteps, setMaxSteps] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    let sig = activeStep + 1;
    setActiveStep(sig);
  };

  const handleBack = () => {
    let sig = activeStep - 1;
    setActiveStep(sig);
  };

  useEffect(() => {
    setMaxSteps(
      Math.floor(postsReportedArr?.length / 6) < 1
        ? 1
        : Math.floor(postsReportedArr?.length / 6)
    );
  }, [postsReportedArr]);

  return (
    <Box className={style.adminPostsContainer}>
      <Button onClick={() => navigate("/admin")} className={style.arrow}>
        <Arrow />
      </Button>
      <Box className={style.divMobileStepper}>
        {postsReportedArr?.length && (
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1 }}
            className={style.carousel}
            nextButton={
              <Button
                sx={{ color: "black", fontWeight: "600" }}
                size="small"
                onClick={handleNext}
                disabled={
                  !postsReportedArr?.slice(
                    (activeStep + 1) * 6,
                    (activeStep + 2) * 6
                  )?.length
                }
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                sx={{ color: "black", fontWeight: "600" }}
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        )}
      </Box>

      <Box className={style.containerGetReport}>
        {typeof postsReportedArr === "string" ? (
          <Box className={style.textContainer}>
            <h1>{postsReportedArr}</h1>
          </Box>
        ) : (
          <Box className={style.postsDiv}>
            {postsReportedArr
              ?.slice(
                activeStep * 6,
                (activeStep + 1) * 6 === 0 ? 6 : (activeStep + 1) * 6
              )
              ?.map((data, i) => (
                <ReportUsers key={`ReportUsers ${i}`} data={data} />
              ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminPosts;
