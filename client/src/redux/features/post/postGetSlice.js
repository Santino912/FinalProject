import axios from "axios";
import {
  addPosts,
  deletePosts,
  getPostStart,
  getAllPosts,
  updatePosts,
  getCurrentPostById,
  clearCurrentPost,
  getPostsReported,
  getPostsToHome,
} from "./postSlice";
import { usersToExplore, clearUsers } from "../users/usersSlice";

//obtener los users
export const getPost = (value, setLoaded) => {
  return async (dispatch) => {
    dispatch(getPostStart());
    const type = !value?.type ? "?type=all" : `?type=${value?.type}`;
    const genres =
      value?.genres <= 0
        ? ""
        : `&genres=${value?.genres
            ?.join(",")
            .replace(/\s/g, "_")
            .replace(/\//g, "-")}`;
    const order = !value?.order ? "" : `&order=${value?.order}`;
    const name = !value?.name ? "" : `&name=${value?.name}`;

    const { data } = await axios.get(
      `/posts/filtered${type}${genres}${order}${name}`
    );
    if (name.length > 0) {
      dispatch(getAllPosts(data?.allPosts));
      dispatch(usersToExplore(data?.allUsers));
    } else {
      dispatch(clearUsers());
      dispatch(getAllPosts(data));
    }
    setLoaded(false);
  };
};

export const getPostHome = (setLoaded) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/posts/home/all`);
    dispatch(getPostsToHome(data));
    setLoaded(false);
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
