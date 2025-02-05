import React, { useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import s from "./Input.module.css";
import Loading from "../../loading/Loading";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../firebase";

const Input = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const { destination, chatId } = useSelector((state) => state.chat);
  const [imgLoading, setImgLoading] = useState(false);
  const [messageData, setMessageData] = useState({
    message: "",
    img: "",
  });
  const uploadFile = (file) => {
    setImgLoading(true);
    const fileRef = ref(storage, `chat/${file.name + Math.random()}`);
    return uploadBytes(fileRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        setImgLoading(false);
        return url;
      })
      .catch((err) => console.log(err));
  };

  const handleChange = async (e) => {
    e.target.name === "message" &&
      setMessageData({ ...messageData, message: e.target.value });
    e.target.name === "img" &&
      setMessageData({
        ...messageData,
        img: await uploadFile(e.target.files[0]),
      });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const content = messageData.message;
    const image = messageData.img;
    setMessageData({ img: "", message: "" });
    if (image) {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: content,
          senderId: currentUser.idGoogle,
          date: Timestamp.now(),
          img: image,
        }),
      });
    } else {
      content &&
        (await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: content,
            senderId: currentUser.idGoogle,
            date: Timestamp.now(),
          }),
        }));
    }

    content &&
      (await updateDoc(doc(db, "userConversations", currentUser.idGoogle), {
        [chatId + ".lastMessage"]: {
          text: content,
        },
        [chatId + ".date"]: serverTimestamp(),
      }));

    content &&
      (await updateDoc(doc(db, "userConversations", destination.idGoogle), {
        [chatId + ".lastMessage"]: {
          text: content,
        },
        [chatId + ".date"]: serverTimestamp(),
      }));
  };
  return (
    <div className={s.input}>
      <form className={s.input} onSubmit={handleSend}>
        {!imgLoading ? (
          <div key={Math.random()}>
            <input
              name="img"
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={handleChange}
              accept="image/png, image/jpeg, image/jpg"
            />
            <label className={s.imgInput} htmlFor="file">
              <svg
                width="25"
                height="25"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.16669 0.25H8.2H11.8H11.8333C13.0652 0.249995 14.0357 0.249991 14.8167 0.3138C15.6134 0.378898 16.2788 0.51413 16.8835 0.822216C17.8713 1.32555 18.6744 2.1287 19.1778 3.11655C19.4859 3.7212 19.6211 4.38657 19.6862 5.18333C19.75 5.96431 19.75 6.93477 19.75 8.16667V8.2V11.8V11.8333C19.75 13.0652 19.75 14.0357 19.6862 14.8167C19.6495 15.2659 19.5905 15.6734 19.4908 16.0518L19.5525 16.1311L19.4446 16.2151C19.3743 16.4476 19.2869 16.6693 19.1778 16.8835C18.6744 17.8713 17.8713 18.6744 16.8835 19.1778C16.2788 19.4859 15.6134 19.6211 14.8167 19.6862C14.0357 19.75 13.0652 19.75 11.8333 19.75H11.8H8.2H8.16667C6.93477 19.75 5.96432 19.75 5.18333 19.6862C4.38657 19.6211 3.7212 19.4859 3.11655 19.1778C2.1287 18.6744 1.32555 17.8713 0.822216 16.8835C0.51413 16.2788 0.378898 15.6134 0.3138 14.8167C0.249991 14.0357 0.249995 13.0652 0.25 11.8333V11.8V8.2V8.16669C0.249995 6.93478 0.249991 5.96432 0.3138 5.18333C0.378898 4.38657 0.51413 3.7212 0.822216 3.11655C1.32555 2.1287 2.1287 1.32555 3.11655 0.822216C3.7212 0.51413 4.38657 0.378898 5.18333 0.3138C5.96432 0.249991 6.93478 0.249995 8.16669 0.25ZM18.25 11.8C18.25 12.908 18.2496 13.7405 18.211 14.4078L17.8901 13.9956L17.8701 13.9698C17.4995 13.4937 17.1921 13.0989 16.9161 12.8008C16.63 12.4919 16.3269 12.2291 15.9445 12.0682C15.3631 11.8236 14.7153 11.7863 14.1096 11.9625C13.7112 12.0784 13.3798 12.3047 13.0601 12.5789C12.7949 12.8062 12.4984 13.102 12.1517 13.4541L10.2932 11.2184L10.2727 11.1938C9.90122 10.7469 9.59253 10.3756 9.31653 10.0954C9.02987 9.80443 8.72848 9.55838 8.35352 9.40928C7.78174 9.18193 7.15024 9.1529 6.56002 9.32685C6.17296 9.44092 5.85027 9.65829 5.53813 9.92173C5.23759 10.1754 4.89613 10.5169 4.48524 10.9278L4.4626 10.9504L1.76112 13.6519C1.75019 13.1319 1.75 12.5249 1.75 11.8V8.2C1.75 6.92751 1.75058 6.01824 1.80882 5.30548C1.86634 4.60148 1.97634 4.15549 2.15873 3.79754C2.51825 3.09193 3.09193 2.51825 3.79754 2.15873C4.15549 1.97634 4.60148 1.86634 5.30548 1.80882C6.01824 1.75058 6.92751 1.75 8.2 1.75H11.8C13.0725 1.75 13.9818 1.75058 14.6945 1.80882C15.3985 1.86634 15.8445 1.97634 16.2025 2.15873C16.9081 2.51825 17.4817 3.09193 17.8413 3.79754C18.0237 4.15549 18.1337 4.60148 18.1912 5.30548C18.2494 6.01824 18.25 6.92751 18.25 8.2V11.8ZM2.15873 16.2025C2.06946 16.0273 1.99753 15.831 1.94061 15.5937L2.03029 15.504L5.52326 12.0111C5.96257 11.5718 6.25934 11.2759 6.50561 11.068C6.74579 10.8653 6.88249 10.7956 6.98406 10.7657C7.25234 10.6866 7.53939 10.6998 7.79928 10.8031C7.89768 10.8423 8.02741 10.9242 8.24798 11.1481C8.47414 11.3777 8.74252 11.6995 9.13968 12.1773L11.5285 15.0509L11.5284 15.0509L11.5365 15.0603L14.252 18.2192C13.6118 18.2496 12.8234 18.25 11.8 18.25H8.2C6.92751 18.25 6.01824 18.2494 5.30548 18.1912C4.60148 18.1337 4.15549 18.0237 3.79754 17.8413C3.09193 17.4817 2.51825 16.9081 2.15873 16.2025ZM16.2025 17.8413C16.1345 17.8759 16.0634 17.9079 15.9879 17.9375L15.6214 17.5111L13.1234 14.6053C13.5219 14.2 13.8014 13.9191 14.0364 13.7176C14.2847 13.5048 14.4254 13.4328 14.5287 13.4028C14.804 13.3227 15.0985 13.3396 15.3628 13.4508C15.462 13.4926 15.5935 13.5802 15.8155 13.8199C16.0426 14.0652 16.3107 14.4086 16.7065 14.917L17.787 16.3051C17.4253 16.9637 16.8736 17.4993 16.2025 17.8413ZM12.75 7C12.75 6.30964 13.3096 5.75 14 5.75C14.6904 5.75 15.25 6.30964 15.25 7C15.25 7.69036 14.6904 8.25 14 8.25C13.3096 8.25 12.75 7.69036 12.75 7ZM14 4.25C12.4812 4.25 11.25 5.48122 11.25 7C11.25 8.51878 12.4812 9.75 14 9.75C15.5188 9.75 16.75 8.51878 16.75 7C16.75 5.48122 15.5188 4.25 14 4.25Z"
                  fill="white"
                />
              </svg>
            </label>
          </div>
        ) : (
          <div className={s.loading}>
            <Loading width="25px" height="25px" />
          </div>
        )}

        <div className={s.toSend}>
          <input
            className={s.inputText}
            name="message"
            autoComplete="off"
            placeholder="Type something..."
            onChange={handleChange}
            value={messageData.message}
          />
          {messageData.img ? (
            <img
              className={s.imagePreview}
              src={messageData.img}
              alt="not found"
            />
          ) : (
            ""
          )}
        </div>
        <div className={s.sendBtn}>
          <button className={s.inputSubmit} type="submit">
            <svg
              width="15"
              height="15"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 0.999999L9 9L0.999999 17"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
