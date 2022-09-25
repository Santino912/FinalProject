import { configureStore } from '@reduxjs/toolkit'
import usersReducer  from './features/users/usersSlice'
import postsReducer from './features/post/postSlice'
import genresReducer from './features/genres/genreSlice'
import chatReducer from './features/chat/chatSlice'
//If I have several files, data, they will all be grouped into one to be able to access from anywhere
const store = configureStore({
  reducer:{
    users: usersReducer,
    posts: postsReducer,
    genres: genresReducer,
    chat: chatReducer
  }
});

export default store