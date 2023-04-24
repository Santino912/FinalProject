import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import s from "./Messages.module.css";

const Message = ({ message }) => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const { chatId, destination } = useSelector((state) => state.chat);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const messageDate = (seconds) => {
    let date = new Date(seconds * 1000);
    let formattedDate = date.toLocaleTimeString("en-US");
    let end = formattedDate.includes("PM") ? "PM" : "AM";
    let dateArray = formattedDate.split(":");
    return `${dateArray[0]}:${dateArray[1]} ${end}`;
  };

  return (
    <div
      ref={ref}
      className={`${s.message} ${
        message.senderId === currentUser.idGoogle ? s.sender : s.destination
      }`}
    >
      <div className={s.messageInfo}>
        <img
          className={s.profilePic}
          src={
            message.senderId === currentUser.idGoogle
              ? currentUser.avatar
              : destination.avatar
          }
          alt="ProfileImg"
        />
      </div>
      <div className={s.messageContent}>
        {message.text && <p>{message.text}</p>}
        {message.img && (
          <img className={s.messageImage} src={message.img} alt="message img" />
        )}
      </div>
      <span>{messageDate(message.date.seconds)}</span>
    </div>
  );
};

export default Message;
