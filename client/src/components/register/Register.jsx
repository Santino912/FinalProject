import React, { useEffect } from "react";
import style from "./register.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { Box, Button, Grid, TextField } from "@mui/material";
import {
  Arrow,
  EmailIcon,
  GoogleIcon,
  PadLock,
  UserIcon,
} from "../componentsIcons/index";
import logo from "../../images/logoicon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentUserFunct,
  getUser,
} from "../../redux/features/users/usersGetSlice";
import { userExistGoogle } from "../utils";
import LoadingProtectRoute from "../../context/LoadingProtectRoute";
import Conditions from "../conditions/Conditions";

const Register = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersListAll);
  const [idGoogle, setIdGoogle] = useState("");
  const [loading, setLoading] = useState(true);
  const [showConditions, setShowConditions] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loginWithGoogle, userFirebase } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
    setLoading(false);
  }, [dispatch, userFirebase]);

  useEffect(() => {
    if (userFirebase !== null) return navigate("/home");

    clearCurrentUserFunct();
  }, [idGoogle]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let flag = false;

    users?.map((item) => {
      if (item.username === user.username) {
        setErrors({ ...errors, username: "This username isn't available" });
        flag = true;
      }
    });

    if (user.password !== user.confirmPassword) {
      setErrors({
        ...errors,
        password: "The passwords doesn't match",
        confirmPassword: "The passwords doesn't match",
      });
      flag = true;
    }

    if (flag) return;

    try {
      let googleUser;
      const res = await signup(user.email, user.password);

      googleUser = {
        name: res.user.email.split("@")[0],
        username: user.username,
        password: user.password,
        email: user.email,
        idGoogle: res.user.uid,
      };

      await userExistGoogle(googleUser);
    } catch (err) {
      return console.log(err);
    }
    navigate("/login");
  };

  const handleSignInGoogle = async () => {
    try {
      let googleUser;
      const res = await loginWithGoogle();
      googleUser = {
        name: res.user.email.split("@")[0],
        username: res.user.email.split("@")[0],
        password: res.user.email,
        email: res.user.email,
        idGoogle: res.user.uid,
      };
      await userExistGoogle(googleUser);
    } catch (err) {
      return console.log(err);
    }
    navigate("/home");
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleFocusUsername = (e) => setErrors({ ...errors, username: "" });

  const handleFocusPass = (e) =>
    setErrors({ ...errors, password: "", confirmPassword: "" });

  return (
    <Box>
      {loading && <LoadingProtectRoute />}
      <button onClick={() => navigate("/")} className={style.arrowResposive}>
        <Arrow />
      </button>
      <Box className={style.containerRegisterDiv}>
        <Box className={style.divBackground}>
          <Box className={style.divTitle}>
            <button onClick={() => navigate("/")} className={style.arrow}>
              <Arrow />
            </button>
            <h1
              style={{
                fontSize: "5em",
                padding: "5px 0 5px 10%",
                position: "relative",
                zIndex: "5",
                margin: "5px",
              }}
            >
              Welcome,
              <br />
              the best is <br />
              yet to come.
            </h1>
          </Box>
          <Box className={style.divBackgroundColor} />
          <Box className={style.backgroundImage} />
          <img className={style.logo} src={logo} alt="logo" />
        </Box>
        <Box className={style.registerContainer}>
          <Box className={style.containAll}>
            <Box className={style.containerTitleRegister}>
              <h1 style={{ fontSize: "40px" }}>Sign up</h1>
              <h4 style={{ margin: "5px 0", height: "20px" }}>
                if you already have an account
              </h4>
              <h4 style={{ margin: "5px 0", height: "20px" }}>
                you can{" "}
                <Link
                  style={{ color: "#00FFD6", textDecoration: "none" }}
                  to="/login"
                >
                  {" "}
                  Login here !
                </Link>
              </h4>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <form onSubmit={(e) => handleSubmit(e)}>
                <Box className={style.orderForm}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}
                  >
                    <UserIcon />
                    <TextField
                      className={style.input}
                      type="text"
                      required={true}
                      autoComplete="off"
                      variant="standard"
                      label="Name"
                      name="name"
                      onChange={(e) => handleChange(e)}
                      value={user.name}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}
                  >
                    <EmailIcon />
                    <TextField
                      className={style.input}
                      type="email"
                      required={true}
                      autoComplete="off"
                      variant="standard"
                      label="Email"
                      name="email"
                      onChange={(e) => handleChange(e)}
                      value={user.email}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}
                  >
                    <UserIcon />
                    <TextField
                      className={style.input}
                      type="text"
                      required={true}
                      autoComplete="off"
                      variant="standard"
                      label="Username"
                      name="username"
                      onChange={(e) => handleChange(e)}
                      onFocus={(e) => handleFocusUsername(e)}
                      value={user.username}
                    />
                    {errors.username ? (
                      <div className={style.tooltip}>
                        <span className={style.tooltiptext}>
                          {errors.username}
                        </span>
                      </div>
                    ) : null}
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}
                  >
                    <PadLock />
                    <TextField
                      className={style.input}
                      type="password"
                      required={true}
                      autoComplete="off"
                      variant="standard"
                      label="Password"
                      name="password"
                      onChange={(e) => handleChange(e)}
                      onFocus={(e) => handleFocusPass(e)}
                      value={user.password}
                    />
                    {errors.password ? (
                      <div className={style.tooltip}>
                        <span className={style.tooltiptext}>
                          {errors.password}
                        </span>
                      </div>
                    ) : null}
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}
                  >
                    <PadLock />
                    <TextField
                      className={style.input}
                      type="password"
                      required={true}
                      autoComplete="off"
                      variant="standard"
                      label="Confirm Password"
                      name="confirmPassword"
                      onChange={(e) => handleChange(e)}
                      onFocus={(e) => handleFocusPass(e)}
                      value={user.confirmPassword}
                    />
                    {errors.confirmPassword ? (
                      <div className={style.tooltip}>
                        <span className={style.tooltiptext}>
                          {errors.confirmPassword}
                        </span>
                      </div>
                    ) : null}
                  </Box>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Button className={style.btnRL} type="submit">
                      Register
                    </Button>
                  </Box>
                </Box>
              </form>
              <Box textAlign={"center"}>
                <h5>
                  By registering and logging in, you accept the{" "}
                  <button
                    style={{ color: "var(--second-page-color)", border: "0" }}
                    onClick={() => setShowConditions(true)}
                  >
                    terms and conditions
                  </button>
                </h5>
              </Box>

              <Grid
                className={style.googleBox}
                alignItems="center"
                justifyContent="center"
                direction="column"
                container
              >
                <h5 style={{ width: "auto", margin: "5px" }}>
                  or continue with
                </h5>
                <Button
                  sx={{ padding: "20px", borderRadius: "50%" }}
                  onClick={() => handleSignInGoogle("/")}
                  className={style.googleButton}
                >
                  <GoogleIcon />
                </Button>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      {showConditions && (
        <Conditions
          styleTo={"Register"}
          showConditions={showConditions}
          setShowConditions={setShowConditions}
        />
      )}
    </Box>
  );
};

export default Register;
