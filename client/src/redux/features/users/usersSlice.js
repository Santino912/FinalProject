import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  usersList: [],
  usersListAll: [],
  userNotifications: [],
  isLoading: true,
  userGraphsData: {},
  user: {},
  currentUser: {},
  userToProfile: {},
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.usersList.push(action.payload);
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
    setGenres: (state, action) => {
      return {
        ...state,
        currentUser: { ...state.currentUser, genres: action.payload },
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
    getDownToRegular: (state, action) => {
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
} = userSlice.actions;

export default userSlice.reducer;
