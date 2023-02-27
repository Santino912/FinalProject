import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context";
import { db } from "../../../firebase";
import { changeUserChat } from "../../../redux/features/chat/chatGetSlice";
import { getUserByFirebaseId } from "../../../redux/features/users/usersGetSlice";
import s from "./Conversations.module.css";

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const { userFirebase } = useAuth();

  useEffect(() => {
    !currentUser && dispatch(getUserByFirebaseId(userFirebase?.uid));
  }, []);
  useEffect(() => {
    const getConversations = () => {
      const unsub = onSnapshot(
        doc(db, "userConversations", currentUser.idGoogle),
        (doc) => {
          setConversations(
            Object.entries(doc?.data()).sort((a, b) => b[1].date - a[1].date)
          );
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser.name && getConversations();
  }, [currentUser?.idGoogle]);

  const handleSelect = (u) => {
    dispatch(
      changeUserChat({
        destination: {
          name: u.displayName,
          idGoogle: u.uid,
          avatar: u.photoURL,
        },
        chatId:
          currentUser.idGoogle > u.uid
            ? currentUser.idGoogle + u.uid
            : u.uid + currentUser.idGoogle,
      })
    );
  };

  return (
    <div className={s.convContainer}>
      {conversations?.map((chat) => (
        <div
          className={s.userChat}
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img
            className={s.profilePic}
            src={chat[1].userInfo.photoURL}
            alt=""
            width="50px"
          />
          <div className={s.userChatInfo}>
            <span className={s.userChatName}>
              {chat[1].userInfo.displayName}
            </span>
            <p className={s.lastMessage}>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Conversations;
