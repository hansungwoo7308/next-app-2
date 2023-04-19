import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import postsReducer from "./postsSlice";
import usersReducer from "./usersSlice";
import { apiSlice as api } from "lib/utility/apiSlice";

// const combineReducer = combineReducers({ counter: counterSlice });

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
    [api.reducerPath]: api.reducer, // for using rtk query

    // counter: counterSlice.reducer,
    // posts: postsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // for using rtk query
});
// console.log("store : ", store);

export default store;
