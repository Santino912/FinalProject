import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  usersList: [],
  usersListAll: [],
  userNotifications: [],
  isLoading: true,
  userGraphsData: {},
  currentUser: {},
  userToProfile: {},
  user: {},
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      return {
        ...state,
        usersList: action.payload,
      };
    },
    deleteUsers: (state) => {
      return {
        ...state,
      };
    },
    updateUsers: (state) => {
      return {
        ...state,
      };
    },
    getUserStart: (state) => {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    },
    getUserSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        usersListAll: action.payload,
        usersList: action.payload,
      };
    },
    getUserError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },
    getById: (state, action) => {
      return {
        ...state,
        userToProfile: action.payload,
      };
    },
    cleanUserToProfile: (state) => {
      return {
        ...state,
        userToProfile: {},
      };
    },
    cleanCurrentUser: (state) => {
      return {
        ...state,
        currentUser: {},
      };
    },
    getByFirebaseId: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    getUpdatePremium: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    getNotifications: (state, action) => {
      return {
        ...state,
        userNotifications: action.payload,
      };
    },
    watchedNotification: (state, action) => {
      return {
        ...state,
        userNotifications: action.payload,
      };
    },
    disabledNotification: (state, action) => {
      return {
        ...state,
        userNotifications: action.payload,
      };
    },
    getUserDataGraphs: (state, action) => {
      return {
        ...state,
        userGraphsData: action.payload,
      };
    },
    getPostLikedToProfile: (state, action) => {
      return {
        ...state,
        profilePostsLikes: action.payload,
      };
    },
    usersToExplore: (state, action) => {
      return {
        ...state,
        usersList: action.payload,
      };
    },
    clearUsers: (state) => {
      return {
        ...state,
        usersList: [],
      };
    },
  },
});

export const {
  getUserDataGraphs,
  addUsers,
  deleteUsers,
  updateUsers,
  getUserStart,
  getUserError,
  getUserSuccess,
  getById,
  getByFirebaseId,
  getUpdatePremium,
  setGenres,
  getNotifications,
  watchedNotification,
  disabledNotification,
  cleanUserToProfile,
  cleanCurrentUser,
  getDownToRegular,
  getPostLikedToProfile,
  usersToExplore,
  clearUsers,
} = userSlice.actions;

export default userSlice.reducer;
