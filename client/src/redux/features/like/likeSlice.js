import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likesVideoCurrentUser: [],
};

export const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    clearLikes: (state) => {
      return {
        ...state,
        likesPostsCurrentUser: [],
      };
    },
    getUserLikesSlice: (state, action) => {
      return {
        ...state,
        likesPostsCurrentUser: action.payload,
      };
    },
  },
});

export const { getUserLikesSlice, clearLikes } = likeSlice.actions;

export default likeSlice.reducer;
