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
  getPostsByUserToProfile,
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
        dispatch(setGenres(response?.data?.genres));
        dispatch(getByFirebaseId(response?.data?._id));
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
      if (_id === undefined) return;

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
      if (_id === undefined)
        return console.log(`_id is undefined in getUserById`);
      const { data } = await axios.get(`/users/${_id}`);
      dispatch(getById(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getFollowsByUserId = (_id, setter) => {
  return async (dispatch) => {
    if (_id === undefined) return;

    try {
      const { data } = await axios.get(`/follows/${_id}`);
      dispatch(setFollow(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostsByUser = (_id) => {
  return async (dispatch) => {
    if (_id === undefined) return;

    try {
      const { data } = await axios.get(`/posts/user/${_id}`);
      dispatch(getPostsByUserToProfile(data));
    } catch (err) {
      console.log(err);
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
    if (_id === undefined) return;
    try {
      const { data } = await axios.get(`/users/idGoogle/${_id}`);
      dispatch(getByFirebaseId(data));
      dispatch(getUserNotification(data?._id));
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
    if (_id === undefined) return;
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
        dispatch(setFollow(response.data));
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
        dispatch(setUnfollow(response.data));
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
