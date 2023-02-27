import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likesVideoCurrentUser: [],
  likesSongCurrentUser: [],
};

export const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    updateLikesSlice: (state) => {
      return {
        ...state,
      };
    },
    getVideoLikesSlice: (state, action) => {
      return {
        ...state,
        likesVideoCurrentUser: action.payload,
      };
    },
    getSongLikesSlice: (state, action) => {
      return {
        ...state,
        likesSongCurrentUser: action.payload,
      };
    },
  },
});

export const { updateLikesSlice, getVideoLikesSlice, getSongLikesSlice } =
  likeSlice.actions;

export default likeSlice.reducer;
