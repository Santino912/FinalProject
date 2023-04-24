import axios from "axios";

export const createUserNotification = async (value) => {
  await axios.post("/notifications/create", value);
};
