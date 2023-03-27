import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  usersList: [],
  usersListAll: [],
  userLikes: [],
  userNotifications: [],
  isLoading: true,
  currentUser: {},
  userGraphsData: {},
  user: {},
  userProfilePosts: [],
  userFollows: [],
  profilePostsLikes: [],
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
        user: action.payload,
      };
    },
    cleanUser: (state) => {
      return {
        ...state,
        user: {},
        userProfilePosts: [],
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
    getLikes: (state, action) => {
      return {
        ...state,
        userLikes: action.payload,
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
    setFollow: (state, action) => {
      return {
        ...state,
        userFollows: action.payload,
      };
    },
    setUnfollow: (state, action) => {
      return {
        ...state,
        userFollows: action.payload,
      };
    },
    getUserDataGraphs: (state, action) => {
      return {
        ...state,
        userGraphsData: action.payload,
      };
    },
    getProfilePostsProfile: (state, action) => {
      return {
        ...state,
        userProfilePosts: action.payload,
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
  getLikes,
  setGenres,
  getNotifications,
  createNotification,
  watchedNotification,
  disabledNotification,
  cleanUser,
  getDownToRegular,
  setFollow,
  setUnfollow,
  getProfilePostsProfile,
  getPostLikedToProfile,
} = userSlice.actions;

export default userSlice.reducer;
