import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreList: [],
  postListAll: [],
  isLoading: true,
};

export const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    getGenreStart: (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    },
    getGenreSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        genreList: action.payload,
      };
    },
    getGenreError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },
  },
});

export const { getGenreStart, getGenreSuccess, getGenreError } =
  genreSlice.actions;

export default genreSlice.reducer;
