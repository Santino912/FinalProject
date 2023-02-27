import axios from "axios";
import {
  addPosts,
  deletePosts,
  getPostError,
  getPostStart,
  getPostSuccess,
  updatePosts,
  getAllPostByGenre,
  getAllPostByTime,
  getCurrentPostById,
  clearCurrentPost,
  getPostsReported,
  getAllPostByPopularity,
  getAllPostByRelevance,
} from "./postSlice";

//obtener los users
export const getPost = () => {
  return async (dispatch) => {
    dispatch(getPostStart());
    try {
      const { data } = await axios.get("/posts");
      dispatch(getPostSuccess(data));
    } catch (error) {
      dispatch(getPostError(error));
    }
  };
};

//crear post
export const createPost = (body) => {
  return async (dispatch) => {
    const { data } = await axios.post("/posts", body);
    dispatch(addPosts(data));
    dispatch(getPost());
  };
};

//actualizar user
export const updatePost = (_id, body) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/posts/${_id}`, body);
      if (response) {
        dispatch(updatePosts());
        dispatch(getPost());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//eliminar user
export const deletePost = (_id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/posts/${_id}`);
      dispatch(deletePosts());
      dispatch(getPost());
    } catch (error) {
      console.log(error);
    }
  };
};

//get post by genre
export const getPostByGenre = (object) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/posts/genres?genres=${object.genres}`);
      dispatch(getAllPostByGenre(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//obtener post reportados
export const postsReported = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/reports`);
      dispatch(getPostsReported(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//get post by time, pop
export const getPostByTime = (order) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/posts/order/`, order);
      dispatch(getAllPostByTime(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostByPopularity = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/posts/order/popular`, body);
      dispatch(getAllPostByPopularity(data));
    } catch (error) {
      console.log(error);
    }
  };
};
//relevance
export const getPostByRelevance = (order) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/posts/genres/with-all?genres=${Object.values(order)}`
      );
      dispatch(getAllPostByRelevance(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostById = (_id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/posts/${_id}`);
      dispatch(getCurrentPostById(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearPost = () => {
  return (dispatch) => {
    dispatch(clearCurrentPost());
  };
};
