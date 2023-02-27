import React, { useEffect } from "react";
import s from "./Chat.module.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  getUserByFirebaseId,
} from "../../redux/features/users/usersGetSlice";
import {
  doc,
  getDoc,
  getDocFromServer,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context";
import Conversations from "./Conversations/Conversations";
import { changeUserChat } from "../../redux/features/chat/chatGetSlice";
import Input from "./Input/Input";
import Messages from "./Messages/Messages";
import { useNavigate } from "react-router-dom";
import { Arrow } from "../componentsIcons";
import Loading from "../loading/Loading";

function Chat() {
  const dispatch = useDispatch();
  const { userFirebase } = useAuth();
  const users = useSelector((state) => state.users.usersListAll);
  const currentUser = useSelector((state) => state.users.currentUser);
  const destination = useSelector((state) => state.chat.destination);
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      await dispatch(getUser());
      const docRef = doc(db, "userConversations", userFirebase?.uid);
      const docSnap = await getDocFromServer(docRef);
      userFirebase?.uid &&
        !docSnap.exists() &&
        (await setDoc(doc(db, "userConversations", userFirebase.uid), {}));
      userFirebase?.uid && dispatch(getUserByFirebaseId(userFirebase?.uid));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const formatResult = (item) => {
    console.log(item);
    return (
      <div className={s.resultWrapper}>
        <img className={s.resultPic} src={item.avatar} alt="not found" />
        <div className={s.resultInfo}>
          <span className={s.resultName}>{item.name}</span>
          <span className={s.resultUsername}>@{item.username}</span>
        </div>
      </div>
    );
  };

  const handleOnSelect = async (user) => {
    const combinedId =
      currentUser.idGoogle > user.idGoogle
        ? currentUser.idGoogle + user.idGoogle
        : user.idGoogle + currentUser.idGoogle;
    dispatch(changeUserChat({ destination: user, chatId: combinedId }));
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userConversations", currentUser.idGoogle), {
          [combinedId + ".userInfo"]: {
            uid: user.idGoogle,
            displayName: user.name,
            photoURL: user.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userConversations", user.idGoogle), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.idGoogle,
            displayName: currentUser.name,
            photoURL: currentUser.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={s.wholeContainer}>
      <div className={s.conversations}>
        <div className={s.convHead}>
          <button className={s.goBack} onClick={() => navigate(-1)}>
            <Arrow />
          </button>
          <h2 className={s.convTitle}>Messages</h2>
          <ReactSearchAutocomplete
            items={users}
            placeholder="Search a user to start a conversation"
            fuseOptions={{ keys: ["name", "username"] }} // Search on both fields
            resultStringKeyName="name" // String to display in the results
            onSelect={handleOnSelect}
            showIcon={false}
            formatResult={formatResult}
            styling={{
              height: "34px",
              border: "none",
              borderRadius: "15px",
              backgroundColor: "#101c36",
              boxShadow: "none",
              hoverBackgroundColor: "#00081ae0",
              color: "white",
              fontSize: "13px",
              fontFamily: "'Inter', sans-serif",
              iconColor: "white",
              lineColor: "aqua",
              placeholderColor: "grey",
              // clearIconMargin: "3px 8px 0 0",
              zIndex: 2,
            }}
          />
        </div>
        {currentUser?.name ? (
          <div className={s.scrollConv}>
            <Conversations />
          </div>
        ) : (
          <div className={s.loading}>
            {" "}
            <Loading width="50px" height="50px" />{" "}
          </div>
        )}
      </div>
      {currentUser?.name && destination?.name ? (
        <div className={s.chatContainer}>
          <div className={s.receiver}>
            <img
              className={s.recPc}
              width="50px"
              src={destination.avatar}
              alt="a"
            />
            <h4>{destination.name}</h4>
          </div>
          <div className={s.messagesContainer}>
            <Messages />
          </div>
          <div className={s.mCont}>
            <Input />
          </div>
        </div>
      ) : (
        <div className={s.chatContainer}>
          <div className={s.receiver}></div>
          <div className={s.messagesContainer}></div>
          <div className={s.mCont}></div>
        </div>
      )}
    </div>
  );
}

export default Chat;
