import React from "react";
import Carousel from "react-material-ui-carousel";
import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import style from "./Reviews.module.css";
import axios from "axios";

function Item(item) {
  return (
    <div className={style.review}>
      <div className={style.img}>
        <img src={item.avatar} alt="avatar" width="130px" height="130px" />
      </div>
      <div className={style.name}>
        <h3>{item.name}</h3>
      </div>
      <div className={style.rating}>
        <Rating name="read-only" value={item.rating} readOnly />
      </div>
      <div className={style.description}>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      await axios.get("/reviews").then((response) => {
        setReviews(response.data);
      });
    };
    getReviews();
  }, []);

  const handleChange = (cur, prev) => {
    setIndex(cur);
  };

  return (
    <div style={{ width: "100%", margin: 0, maxWidth: "100vw" }}>
      {reviews.length && (
        <Carousel
          index={index}
          onChange={handleChange}
          interval={6000}
          animation="slide"
          indicators={true}
          stopAutoPlayOnHover
          swipe
          className="my-carousel"
          navButtonsAlwaysVisible="true"
        >
          {reviews?.map((item) => (
            <Item
              key={item._id}
              avatar={item.avatar}
              name={item.name}
              rating={item.rating}
              description={item.description}
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Reviews;
