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
  getPostsByUserPleasures,
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
    if (body === undefined) return;
    const { data } = await axios.post("/posts", body);
    dispatch(addPosts(data));
    dispatch(getPost());
  };
};

//actualizar user
export const updatePost = (_id, body) => {
  return async (dispatch) => {
    if (_id === undefined || body === undefined) return;
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

/* export const userProfilePosts= (_id) => {
  return async (dispatch) => {
    try{
const {data} = await axios.get(`/post`)
    }catch(err){

    }
  }
} */

export const getPostsByUserPleasuresFunct = (idGoogle) => {
  return async (dispatch) => {
    if (idGoogle === undefined) return;
    try {
      const { data } = await axios.get(`/posts/user/pleasures/${idGoogle}`);
      dispatch(getPostsByUserPleasures(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//eliminar user
export const deletePost = (_id) => {
  return async (dispatch) => {
    if (_id === undefined) return;
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
    if (object === undefined) return;
    const genres = object.genres
      .join(",")
      .replace(/\s/g, "_")
      .replace(/\//g, "-");
    try {
      const { data } = await axios.get(`/posts/genres/${genres}`);
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
export const getPostByTime = ({ order }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/posts/orderTime/${order}`);
      dispatch(getAllPostByTime(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostByPopularity = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/posts/order/popularity`);
      dispatch(getAllPostByPopularity(data));
    } catch (error) {
      console.log(error);
    }
  };
};
//relevance
export const getPostByRelevance = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/posts/genres/with-all`);
      dispatch(getAllPostByRelevance(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostById = (_id) => {
  return async (dispatch) => {
    try {
      if (_id === undefined) return;
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
