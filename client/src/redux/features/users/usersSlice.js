import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  usersList: [],
  usersListAll: [],
  user:{},
  userLikes: [],
  userNotifications: [],
  isLoading: true,
  currentUser: {},
  userGraphsData: {}
}

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
        currentUser: {...state.currentUser, genres: action.payload}
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
    getById:(state, action)=>{
      return {
        ...state,
        user: action.payload
      }
    },
    cleanUser:(state)=>{
      return {
        ...state,
        user: {}
      }
    },
    getByFirebaseId: (state, action)=>{
      return {
        ...state,
        currentUser: action.payload
      }
    },
    getUpdatePremium : (state, action)=> {
      return {
        ...state,
        currentUser: action.payload
      }
    },
    getDownToRegular: (state, action) => {
      return{
        ...state,
        currentUser: action.payload
      }
    },
    getLikes : (state, action)=> {
      return {
        ...state,
        userLikes: action.payload
      }
    },
    getNotifications: (state, action)=> {
      return {
        ...state,
        userNotifications: action.payload
      }
    },
    // createNotification: (state, action)=> {
    //    return{
    //     ...state,
    //     userNotifications: [...state.userNotifications, action.payload]
    //    }  
    // },

    watchedNotification: (state, action) => {
      return {
        ...state,
        userNotifications: action.payload
      }
    },
    disabledNotification: (state, action) => {
      return {
        ...state,
        userNotifications: action.payload
      }
    },
    setFollow: (state, action) => {
      return {
        ...state,
        user: {...state.user, FollowerUsers: action.payload}
      }
    },
    setUnfollow: (state, action) => {
      return {
        ...state,
        user: {...state.user, FollowerUsers: action.payload}
      }
    },
    getUserDataGraphs:  (state, action) => {
      return {
        ...state,
        userGraphsData: action.payload
      }
    },
}})






export const { getUserDataGraphs, addUsers, deleteUsers, updateUsers, getUserStart, getUserError, getUserSuccess, getById, getByFirebaseId, getUpdatePremium, getLikes, setGenres, getNotifications, createNotification, watchedNotification, disabledNotification, cleanUser, getDownToRegular, setFollow, setUnfollow  } = userSlice.actions;



export default userSlice.reducer;

