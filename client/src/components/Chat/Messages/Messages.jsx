import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../firebase";
import Message from "../Message/Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const chatId = useSelector((state) => state.chat.chatId);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  console.log(messages);

  return (
    <div>
      {messages.map((m) => (
        <Message message={m} key={m._id} />
      ))}
    </div>
  );
};

export default Messages;
