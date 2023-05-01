import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postList: [],
  postListAll: [],
  postsExplore: [],
  post: {},
  isLoading: true,
  error: false,
  reportedPosts: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: (state, action) => {
      return {
        ...state,
        postList: [action.payload, ...state.postList],
      };
    },
    deletePosts: (state) => {
      return {
        ...state,
      };
    },
    updatePosts: (state) => {
      return {
        ...state,
      };
    },
    getPostStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    getAllPosts: (state, action) => {
      return {
        ...state,
        isLoading: false,
        postsExplore: action.payload,
      };
    },
    getPostsToHome: (state, action) => {
      return {
        ...state,
        postListAll: action.payload,
      };
    },
    getPostsAndUsers: (state, action) => {
      return {
        ...state,
        postListAll: action.payload,
      };
    },
    getCurrentPostById: (state, action) => {
      return {
        ...state,
        post: action.payload,
      };
    },
    clearCurrentPost: (state, action) => {
      return {
        ...state,
        post: {},
      };
    },
    getPostsReported: (state, action) => {
      return {
        ...state,
        reportedPosts: action.payload,
      };
    },
  },
});

export const {
  getPostsReported,
  addPosts,
  deletePosts,
  updatePosts,
  getPostStart,
  getAllPosts,
  getCurrentPostById,
  clearCurrentPost,
  getPostsToHome,
} = postSlice.actions;

export default postSlice.reducer;
