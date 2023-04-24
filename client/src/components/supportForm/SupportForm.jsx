import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import style from "./supportForm.module.css";
import styleTooltip from "../tooltip/tooltip.module.css";
import logo from "../../images/logo.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { Arrow } from "../componentsIcons";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function validate(input) {
  let errors = {};
  if (!input.detail) {
    errors.detail = "detail is required";
  }

  if (!input.area) {
    errors.area = "area is required";
  }

  return errors;
}

export default function SupportForm() {
  const user = useSelector((state) => state.users.currentUser);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    detail: "",
    area: "",
  });

  const handleClick = (e) => {
    if (input.detail) {
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <Grid
      container
      direction="column"
      className={style.supportForm}
      p={`1%`}
      alignItems="center"
    >
      <Grid item container pl={`2%`} className={style.back}>
        <Link to="/home">
          <Arrow />
        </Link>
      </Grid>
      <Grid item container className={style.supportLogo}>
        <img src={logo} alt="" width={"854"} height={"276"} />
      </Grid>
      <Grid item p={`4%`}>
        <Typography variant="h4" className={style.text}>
          Did an error occur or do you want to leave us a suggestion?
        </Typography>
        <Typography variant="h4" className={style.text}>
          Help us improve Social Sound.
        </Typography>
      </Grid>
      <Grid item className={style.form}>
        <form
          action="https://formsubmit.co/socialsound.web@gmail.com"
          method="POST"
        >
          <Grid container direction="column" spacing={2} alignItems="center">
            {errors.area ? (
              <div
                className={styleTooltip.tooltip}
                style={{ marginRight: "80%" }}
              >
                <span className={styleTooltip.tooltiptext}>{errors.area}</span>
              </div>
            ) : (
              ""
            )}
            <Grid item container>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Area
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Area"
                  value={input["area"]}
                  onChange={handleInputChange}
                  className={style.select}
                  name="area"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Login">Login</MenuItem>
                  <MenuItem value="Sign up">Sign up</MenuItem>
                  <MenuItem value="Users">Users</MenuItem>
                  <MenuItem value="Audio/video upload">
                    Audio/video upload
                  </MenuItem>
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Posts">Posts</MenuItem>
                  <MenuItem value="Explore">Explore</MenuItem>
                  <MenuItem value="Filters">Filters</MenuItem>
                  <MenuItem value="Chat">Chat</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item className={style.input}>
              <TextField
                id="standard-multiline-static"
                label="Details"
                variant="standard"
                multiline
                rows={6}
                className={style.input}
                name="detail"
                value={input["detail"]}
                onChange={handleInputChange}
              />
            </Grid>
            {errors.detail ? (
              <div
                className={styleTooltip.tooltip}
                style={{ marginRight: "80%" }}
              >
                <span className={styleTooltip.tooltiptextBottom}>
                  {errors.detail}
                </span>
              </div>
            ) : (
              ""
            )}
            <div item style={{ display: "none" }}>
              <input name="name" value={user && user.name} />
              <input name="plan" value={user && user.plan} />
              <input name="email" value={user && user.email} />
              <input name="username" value={user && user.username} />
              <input
                type="hidden"
                name="_subject"
                value="Support Social Sound"
              />
              <input
                type="hidden"
                name="_next"
                value="https://www.socialsound.art/support"
              />
              <input
                type="hidden"
                name="_autoresponse"
                value="Your message was sent successfully!"
              />
              {/* <input type="hidden" name="_captcha" value="false"></input> */}
            </div>
            <Grid item>
              {input.detail && input.area ? (
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleClick}
                  className={style.send}
                >
                  Send
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled
                  style={{
                    color: "black",
                    textTransform: "none",
                    backgroundColor: "grey",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  Send
                </Button>
              )}
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Your message was sent successfully!
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
