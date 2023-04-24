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
  getNotifications,
  watchedNotification,
  disabledNotification,
  cleanUserToProfile,
  getUserDataGraphs,
  getPostLikedToProfile,
  cleanCurrentUser,
} from "./usersSlice";

//obtener los users
export const getUser = () => {
  return async (dispatch) => {
    dispatch(getUserStart());
    try {
      const { data } = await axios.get("/users");
      dispatch(getUserSuccess(data));
    } catch (error) {
      dispatch(getUserError(error));
    }
  };
};

//crear users
export const createdUser = (user) => {
  return async (dispatch) => {
    if (user === undefined) return;
    let response = await axios.post("/user", user);
    dispatch(addUsers(response.data));
  };
};

//actualizar user
export const updateUser = (_id, body) => {
  return async (dispatch) => {
    try {
      if (_id === undefined || body === undefined) return;
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

//set user genres
export const setUserGenres = (body) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/set/genres`, body);
      if (response) {
        dispatch(getByFirebaseId(response?.data));
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
      if (_id === undefined) return;

      await axios.delete(`/users/${_id}`);
      dispatch(deleteUsers());
      dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserByIdToProfile = (_id) => {
  return async (dispatch) => {
    try {
      if (_id === undefined)
        return console.log(`_id is undefined in getUserById`);
      const { data } = await axios.get(`/users/${_id}`);
      dispatch(getById(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostLiked = (_id) => {
  return async (dispatch) => {
    if (_id === undefined) return;

    try {
      const { data } = await axios.get(`/posts/user/likes/${_id}`);
      dispatch(getPostLikedToProfile(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const cleanUserState = () => {
  return async (dispatch) => {
    try {
      dispatch(cleanUserToProfile());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserByFirebaseId = (_id) => {
  return async (dispatch) => {
    if (_id === undefined) return;
    try {
      const { data } = await axios.get(`/users/idGoogle/${_id}`);
      dispatch(getByFirebaseId(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserUpdatePremium = (_id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/users/premium/${_id}`);
      dispatch(getUpdatePremium(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserNotification = (_id) => {
  return async (dispatch) => {
    if (_id === undefined) return;
    try {
      const response = await axios.get(`/notifications/${_id}`);
      await dispatch(getNotifications(response.data));
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

export const disabledUserNotification = (_id, idUser) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/notifications/disabled/${_id}/${idUser}`
      );
      dispatch(disabledNotification(data));
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

export const clearCurrentUserFunct = () => {
  return async (dispatch) => {
    dispatch(cleanCurrentUser());
  };
};
