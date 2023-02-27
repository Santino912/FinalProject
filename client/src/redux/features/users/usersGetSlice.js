import axios from "axios";

import {
  addUsers,
  deleteUsers,
  getUserError,
  getUserStart,
  getUserSuccess,
  updateUsers,
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
  getUserDataGraphs,
} from "./usersSlice";

//obtener los users
export const getUser = () => {
  return async (dispatch) => {
    dispatch(getUserStart());
    try {
      const response = await axios.get("/users");
      dispatch(getUserSuccess(response.data));
    } catch (error) {
      dispatch(getUserError(error));
    }
  };
};

//crear users
export const createdUser = (user) => {
  return async (dispatch) => {
    let response = await axios.post("/user", user);
    dispatch(addUsers(response.data));
  };
};

//actualizar user
export const updateUser = (_id, body) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/${_id}`, body);
      if (response) {
        dispatch(updateUsers());
        dispatch(getUser());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUserGenres = (body) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/set/genres`, body);
      if (response) {
        dispatch(setGenres(response.data.genres));
        dispatch(getUser());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//eliminar user
export const deleteUser = (_id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/users/${_id}`);
      dispatch(deleteUsers());
      dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserById = (_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users/${_id}`);
      dispatch(getById(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanUserState = () => {
  return async (dispatch) => {
    try {
      dispatch(cleanUser());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserByFirebaseId = (_id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/users/idGoogle/${_id}`);
      dispatch(getByFirebaseId(data));
      dispatch(getUserNotification(data._id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserUpdatePremium = (_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/premium/${_id}`);
      dispatch(getUpdatePremium(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserDownToRegular = (_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/regular/${_id}`);
      dispatch(getDownToRegular(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserLikes = (_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/likes/users/${_id}`);
      dispatch(getLikes(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserNotification = (_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/notifications/${_id}`);
      await dispatch(getNotifications(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createUserNotification = (value) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/notifications/create", value);
      dispatch(createNotification(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const watchedUserNotification = (_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/notifications/watched/${_id}`);
      dispatch(watchedNotification(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const disabledUserNotification = (_id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/notifications/disabled/${_id}`);
      dispatch(disabledNotification(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUserFollow = (body) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/users/follow`, body);
      if (response) {
        dispatch(setFollow(response.data.FollowerUsers));
        dispatch(getUser());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUserUnfollow = (body) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/users/unfollow`, body);
      if (response) {
        dispatch(setUnfollow(response.data.FollowerUsers));
        dispatch(getUser());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDataForGraphs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users/data/graphs`);
      dispatch(getUserDataGraphs(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
