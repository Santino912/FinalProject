/* eslint-disable */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { getUserUpdatePremium } from "../../redux/features/users/usersGetSlice";
import style from "./index.module.css";
import axios from "axios";

const Success = () => {
  const { userFirebase } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const premium = localStorage.getItem("premium");
  console.log(premium);

  const fetchUser = async () => {
    if (premium) {
      const user = await axios.get(`/users/idGoogle/${userFirebase.uid}`);
      await dispatch(getUserUpdatePremium(user.data._id));
      localStorage.removeItem("premium");
    } else {
      return navigate("/home");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.backgroundContainer}>
        <h1>Thanks for your order, you are user Premium!</h1>
        <h2>Go home to enjoy the new features!</h2>
      </div>
      <div className={style.divHome}>
        <Link to={"/home"}>Home</Link>
      </div>
    </div>
  );
};

export default Success;
