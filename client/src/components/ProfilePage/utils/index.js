import axios from "axios";

export const followRequest = async (value) => {
  console.log(value);
  await axios.post(`/follow/create`, value);
};
