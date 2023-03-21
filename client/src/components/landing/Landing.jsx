import { Box, Button, Grid, SvgIcon, Typography } from "@mui/material";
import React from "react";
import logoicon from "../../images/logoicon.png";
import logo from "../../images/logo.png";
import cardMusic from "../../images/cardMusic.png";
import style from "./landing.module.css";
import { Link } from "react-router-dom";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import MusicVideoOutlinedIcon from "@mui/icons-material/MusicVideoOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
//import Reviews from "../reviews/Reviews.jsx";

export default function Landing() {
  return (
    <Grid container direction="column" className={style.landing} spacing={5}>
      <Grid className={style.navbar}>
        <Grid item container alignItems="center" xs={7} md={6} lg={6} xl={8}>
          <Grid
            xs={0}
            sm={3}
            md={2}
            lg={2}
            xl={2}
            item
            className={style.landingLogoIconContainer}
          >
            <img src={logoicon} alt="" className={style.landingLogoicon} />
          </Grid>
          <Grid xs={6} sm={3} md={2} lg={2} xl={2} item>
            <Typography
              sx={{ fontSize: "10px + 5vw" }}
              className={style.textNavBar}
            >
              <a href="#features">Features</a>
            </Typography>
          </Grid>
          <Grid xs={6} sm={3} md={2} lg={2} xl={2} item>
            <Typography
              sx={{ fontSize: "10px + 5vw" }}
              className={style.textNavBar}
            >
              <a href="#premium">Premium</a>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={5}
          md={6}
          lg={6}
          xl={4}
          alignItems="center"
          justifyContent="flex-end"
          spacing={3}
          className={style.buttons}
          pr={"2%"}
        >
          <Grid item xs={6} sm={5} md={4} lg={3} xl={3}>
            <Link to="/login">
              <Button variant="contained" className={style.login}>
                Login
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} sm={5} md={4} lg={3} xl={3}>
            <Link to="/register">
              <Button variant="contained" className={style.signUp}>
                Sign up
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} className={style.getStarted}>
        <Grid item container xs={12} md={7} xl={7} direction="column">
          <Grid item className={style.landingLogo}>
            <img src={logo} alt="" width="854" height="276" />
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="flex-end"
            spacing={2}
          >
            <Grid item className={style.share}>
              <Typography variant="h3" className={style.text}>
                Share your songs, discover new artists.
              </Typography>
            </Grid>
            <Grid item className={style.share}>
              <Link to="/register">
                <Button variant="contained" className={style.signUp}>
                  Get Started
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          md={5}
          xl={5}
          className={style.cardMusic}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item container className={style.card}>
            <Grid
              item
              container
              className={style.card2}
              direction="column"
              alignItems="center"
            >
              <Grid item className={style.imageMusic}>
                <img src={cardMusic} alt="" />
              </Grid>
              <Grid item container direction="column" alignItems="center">
                <Grid item>
                  <Typography className={style.text}>Your Song</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="caption"
                    className={`${style.text} ${style.author}`}
                  >
                    Jonh Doe
                  </Typography>
                </Grid>
                <Grid item className={style.line}>
                  <hr className={style.line1} />
                  <hr className={style.line2} />
                  <SvgIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className={style.icon}
                  >
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                  </SvgIcon>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  className={style.timers}
                >
                  <Grid item>
                    <Typography
                      variant="caption"
                      className={`${style.text} ${style.time}`}
                    >
                      1:21
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="caption"
                      className={`${style.text} ${style.time}`}
                    >
                      -2:36
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={style.mediaPlayer}
                >
                  <SvgIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-190 0 512 512"
                    className={style.otherMediaPlayers}
                  >
                    <path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z" />
                  </SvgIcon>
                  <SvgIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className={style.otherMediaPlayers}
                  >
                    <path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z" />
                  </SvgIcon>
                  <SvgIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className={style.play}
                  >
                    <path d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
                  </SvgIcon>
                  <SvgIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className={style.otherMediaPlayers}
                  >
                    <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z" />
                  </SvgIcon>
                  <SvgIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className={style.otherMediaPlayers}
                  >
                    <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z" />
                  </SvgIcon>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container className={style.features} xs={12} id="features">
        <Grid item ml={`2%`}>
          <Typography variant="h4" className={style.text}>
            Features
          </Typography>
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          {/* <Grid item container direction="column" justifyContent="space-between" xs={2.3} className={style.featuresCard} p={`2%`} m={`2%`} >
                        <Typography variant='h5' className={`${style.text} ${style.featuresText}`}>
                            Mobile Responsive
                        </Typography>
                        <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={style.featuresCircle}>
                            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                        </SvgIcon>
                    </Grid> */}
          <Grid
            item
            container
            direction="column"
            justifyContent="space-between"
            xs={12}
            md={3}
            sm={4.5}
            lg={3.33}
            className={style.featuresCard}
            p={`2%`}
            m={`2%`}
          >
            <Typography
              variant="h5"
              className={`${style.text} ${style.featuresText}`}
            >
              User Friendly
            </Typography>
            <Box className={style.featuresCircle}>
              <HandshakeOutlinedIcon sx={{ fontSize: "50px" }} />
            </Box>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="space-between"
            xs={12}
            md={3}
            sm={4.5}
            lg={3.33}
            className={style.featuresCard}
            p={`2%`}
            m={`2%`}
          >
            <Typography
              variant="h5"
              className={`${style.text} ${style.featuresText}`}
            >
              Chat With Other Users
            </Typography>
            <Box className={style.featuresCircle}>
              <TextsmsOutlinedIcon sx={{ fontSize: "50px" }} />
            </Box>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="space-between"
            xs={12}
            md={3}
            sm={4.5}
            lg={3.33}
            className={style.featuresCard}
            p={`2%`}
            m={`2%`}
          >
            <Typography
              variant="h5"
              className={`${style.text} ${style.featuresText}`}
            >
              Upload Your Songs
            </Typography>
            <Box className={style.featuresCircle}>
              <AudiotrackOutlinedIcon sx={{ fontSize: "50px" }} />
            </Box>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="space-between"
            xs={12}
            md={3}
            sm={4.5}
            lg={3.33}
            className={style.featuresCard}
            p={`2%`}
            m={`2%`}
          >
            <Typography
              variant="h5"
              className={`${style.text} ${style.featuresText}`}
            >
              Upload Your Music Videos
            </Typography>
            <Box className={style.featuresCircle}>
              <MusicVideoOutlinedIcon sx={{ fontSize: "50px" }} />
            </Box>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="space-between"
            xs={12}
            md={3}
            sm={4.5}
            lg={3.33}
            className={style.featuresCard}
            p={`2%`}
            m={`2%`}
          >
            <Typography
              variant="h5"
              className={`${style.text} ${style.featuresText}`}
            >
              Follow and Discover New Artists
            </Typography>
            <Box className={style.featuresCircle}>
              <PersonAddAlt1OutlinedIcon sx={{ fontSize: "50px" }} />
            </Box>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="space-between"
            xs={12}
            md={3}
            sm={4.5}
            lg={3.33}
            className={style.featuresCard}
            p={`2%`}
            m={`2%`}
          >
            <Typography
              variant="h5"
              className={`${style.text} ${style.featuresText}`}
            >
              Like the Songs You Enjoy
            </Typography>
            <Box className={style.featuresCircle}>
              <FavoriteBorderOutlinedIcon sx={{ fontSize: "50px" }} />
            </Box>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="space-between"
            xs={12}
            md={3}
            sm={4.5}
            lg={3.33}
            className={style.featuresCard}
            p={`2%`}
            m={`2%`}
          >
            <Typography
              variant="h5"
              className={`${style.text} ${style.featuresText}`}
            >
              Support Other Artists by Sharing their Songs
            </Typography>
            <Box className={style.featuresCircle}>
              <ShareOutlinedIcon sx={{ fontSize: "50px" }} />
            </Box>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="space-between"
            xs={12}
            md={3}
            sm={4.5}
            lg={3.33}
            className={style.featuresCard}
            p={`2%`}
            m={`2%`}
          >
            <Typography
              variant="h5"
              className={`${style.text} ${style.featuresText}`}
            >
              Mini player
            </Typography>
            <Box className={style.featuresCircle}>
              <OndemandVideoOutlinedIcon sx={{ fontSize: "50px" }} />
            </Box>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="space-between"
            xs={12}
            md={3}
            sm={4.5}
            lg={3.33}
            className={style.featuresCard}
            p={`2%`}
            m={`2%`}
          >
            <Typography
              variant="h5"
              className={`${style.text} ${style.featuresText}`}
              sx={{ overflowWrap: "anywhere" }}
            >
              Notifications
            </Typography>
            <Box className={style.featuresCircle}>
              <MarkEmailUnreadOutlinedIcon sx={{ fontSize: "50px" }} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className={style.features} spacing={1} id="premium">
        <Grid item ml={`2%`}>
          <Typography variant="h4" className={style.text}>
            Premium Features
          </Typography>
        </Grid>
        <Grid item container xs={12} justifyContent="center" gap={"10px"}>
          <Grid
            item
            container
            direction="column"
            justifyContent="space-between"
            xs={12}
            md={3}
            sm={4.5}
            lg={3.33}
            className={style.featuresCard}
            p={`2%`}
            m={`2%`}
          >
            <Typography
              variant="h5"
              className={`${style.text} ${style.featuresText}`}
            >
              Edit profile banner
            </Typography>
            <Box className={style.featuresCircle}>
              <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "50px" }} />
            </Box>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="space-between"
            xs={12}
            md={3}
            sm={4.5}
            lg={3.33}
            className={style.featuresCard}
            p={`2%`}
            m={`2%`}
          >
            <Typography
              variant="h5"
              className={`${style.text} ${style.featuresText}`}
            >
              Greater relevance in the search
            </Typography>
            <Box className={style.featuresCircle}>
              <StarOutlineOutlinedIcon sx={{ fontSize: "50px" }} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <div id="reviews" className={style.reviews}>
        {/* <Reviews /> */}
      </div>
      <Grid
        item
        container
        xs={12}
        className={style.footer}
        direction="column"
        alignItems="center"
        mt={`20%`}
      >
        <Grid item>
          <img src={logo} alt="" className={style.footerLogoicon} />
        </Grid>
        <Grid item container xs={4} justifyContent="center" spacing={4}>
          {/* <Grid item>
            <Typography className={`${style.text} ${style.textFooter}`}>
              Help
            </Typography>
          </Grid> */}
          <Grid item>
            <Typography className={`${style.text} ${style.textFooter}`}>
              About
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={`${style.text} ${style.textFooter}`}>
              Privacy Policy
            </Typography>
          </Grid>
        </Grid>
        <Grid item className={style.footerDivider}>
          <hr className={style.footerDividerLine} />
        </Grid>
        <Grid item>
          <a href="https://github.com/Santino912/FinalProject">
            <SvgIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
              className={style.footerGitHub}
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </SvgIcon>
          </a>
        </Grid>
        <Grid item>
          <Typography className={`${style.text} ${style.textFooter}`}>
            © 2022 Social Sound. All rights reserved
          </Typography>
        </Grid>
      </Grid>
      {/* <Grid item container xs={5} justifyContent="center">
                <TextField id="outlined-basic" label="Outlined" variant="outlined" className={style.input} />
            </Grid> */}
    </Grid>
  );
}
