import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTrackIndex: 0,
  tracks: [],
  isPlaying: false,
  nowPlaying: {},
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    next: (state) => {
      return {
        ...state,
        currentTrackIndex:
          state.currentTrackIndex < [...state.tracks].length - 1
            ? state.currentTrackIndex + 1
            : 0,
        nowPlaying: [...state.tracks][
          state.currentTrackIndex < [...state.tracks].length - 1
            ? state.currentTrackIndex + 1
            : 0
        ],
      };
    },
    previous: (state) => {
      return {
        ...state,
        currentTrackIndex:
          state.currentTrackIndex === 0
            ? [...state.tracks].length - 1
            : state.currentTrackIndex - 1,
        nowPlaying: [...state.tracks][
          state.currentTrackIndex === 0
            ? [...state.tracks].length - 1
            : state.currentTrackIndex - 1
        ],
      };
    },
    set: (state, action) => {
      return {
        ...state,
        tracks: action.payload,
        currentTrackIndex:
          state.currentTrackIndex !== 0 ? 0 : state.currentTrackIndex,
        nowPlaying: [...state.tracks][
          state.currentTrackIndex !== 0 ? 0 : state.currentTrackIndex
        ],
        isPlaying: true,
      };
    },
    add: (state, action) => {
      return {
        ...state,
        tracks: [...state.tracks].some((t) => t._id === action.payload._id)
          ? [...state.tracks]
          : [...state.tracks, action.payload],
      };
    },
    remove: (state, action) => {
      return {
        ...state,
        tracks: [...state.tracks].length
          ? [...state.tracks].filter((t) => t._id !== action.payload)
          : [],
      };
    },
    toggle: (state) => {
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    },
    change: (state, action) => {
      return {
        ...state,
        currentTrackIndex: action.payload,
        isPlaying: true,
        nowPlaying: [...state.tracks][action.payload],
      };
    },
    setStored: (state, action) => {
      return {
        ...state,
        tracks: action.payload,
      };
    },
  },
});

export const { next, previous, add, remove, set, toggle, change, setStored } =
  playerSlice.actions;

export default playerSlice.reducer;
