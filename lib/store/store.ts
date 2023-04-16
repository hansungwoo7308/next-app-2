import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { counterSlice } from "./counterSlice";
import postsReducer from "./postsSlice";
import usersReducer from "./userSlice";

// const combineReducer = combineReducers({ counter: counterSlice });

const store = configureStore({
  reducer: {
    // counter: counterSlice.reducer,
    posts: postsReducer,
    users: usersReducer,
    // counter: counterSlice.reducer,
    // posts: postsSlice.reducer,
  },
});
// console.log("store : ", store);

export default store;
