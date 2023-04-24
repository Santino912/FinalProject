import axios from "axios";

export async function LikeRequestAndNotification(value) {
  await axios.post("/likes", value);
}
