import axios from "axios";
import { getUserLikesSlice } from "./likeSlice";

export const getSongsLikesByUserId = (_id, type) => {
  return async (dispatch) => {
    try {
      if (_id === undefined) return;
      const { data } = await axios.get(`/likes/user/${type}/${_id}`);
      dispatch(getUserLikesSlice(data));
    } catch (error) {
      console.log(error);
    }
  };
};
