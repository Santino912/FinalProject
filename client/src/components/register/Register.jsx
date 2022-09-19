import axios from "axios";
import React, { useEffect } from "react";
import style from "./register.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Arrow, EmailIcon, GoogleIcon, PadLock, UserIcon } from "../componentsIcons/index";
import logo from "../../images/logoicon.png";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/features/users/usersGetSlice";

const Register = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.usersListAll)
  const [idgoogle, setIdGoogle] = useState('')
  const [googleUser, setGoogleUser] = useState()
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

  // useEffect(() => {
  //   if (userFirebase !== null) navigate("/home");
  // });

  useEffect(() => {
    dispatch(getUser())
  }, [])

  useEffect(() => {
    if (googleUser && users.filter(u => u.email === googleUser.email).length === 0) {
      axios
        .post("/users", {
          ...googleUser,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (userFirebase !== null) navigate("/home");

  }, [googleUser])

  useEffect(() => {
    if (idgoogle && users.filter(u => u.email === user.email).length === 0) {
      axios
        .post("/users", {
          ...user,
          idgoogle
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (userFirebase !== null) navigate("/home");

  }, [idgoogle])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      for (const key in user) {
        if (!user[key]) {
          setErrors({
            ...errors,
            confirmPassword: "The two passwords have to be the same",
          });
        }
      }
      return;
    }
    setErrors({
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });

    try {
      const res = await signup(user.email, user.password)
      setIdGoogle(res.user.uid)
    } catch (err) {
      return console.log(err);
    }
  };

  const handleSignInGoogle = async () => {
    try {
      const res = await loginWithGoogle();
      setGoogleUser({
        name: res.user.email.split('@')[0],
        username: res.user.email.split('@')[0],
        password: res.user.email,
        email: res.user.email,
        idgoogle: res.user.uid,
        avatar: res.user.photoURL,
      })
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    /* 
        Estado [usuarios]: [usuarios.some(u => RegExp.test(u))]
        */
  };

  return (
    <Box>
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
                      value={user.username}
                    />
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
                      value={user.password}
                    />
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
                      value={user.confirmPassword}
                    />
                  </Box>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Button className={style.btnRL} type="submit">
                      Register
                    </Button>
                  </Box>
                </Box>
              </form>
              <Grid
                className={style.googleBox}
                alignItems="center"
                justifyContent="center"
                direction="column"
                container
              >
                <h5 style={{ width: "auto", margin: "5px" }}>or continue with</h5>
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
    </Box>
  );
};

export default Register;