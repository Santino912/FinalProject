import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postList: [],
  postListAll: [],
  postsFiltered: [],
  postsOrdered: [],
  postsByUserPleasures: [],
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
        postsFiltered: [action.payload, ...state.postsFiltered],
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
        error: null,
      };
    },
    getPostSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        postListAll: action.payload,
      };
    },
    getPostsByUserPleasures: (state, action) => {
      return {
        ...state,
        postsByUserPleasures: action.payload,
      };
    },
    getPostError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    },
    getAllPostByGenre: (state, action) => {
      return {
        ...state,
        postList: action.payload,
        postsFiltered: action.payload,
      };
    },
    getAllPostByTime: (state, action) => {
      return {
        ...state,
        postList: action.payload,
        postsFiltered: action.payload.posts,
        postsOrdered: action.payload.allPosts,
      };
    },
    getAllPostByPopularity: (state, action) => {
      return {
        ...state,
        postsFiltered: action.payload.posts,
        postsOrdered: action.payload.allPosts,
      };
    },
    getAllPostByRelevance: (state, action) => {
      return {
        ...state,
        postList: action.payload,
        postsFiltered: action.payload.posts,
        postsOrdered: action.payload.allPosts,
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
  getPostError,
  getPostSuccess,
  getAllPostByGenre,
  getAllPostByTime,
  getCurrentPostById,
  clearCurrentPost,
  getAllPostByPopularity,
  getAllPostByRelevance,
  getPostsByUserPleasures,
} = postSlice.actions;

export default postSlice.reducer;
