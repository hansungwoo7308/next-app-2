import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Slices and Reducers (with Frontend)
// import { counterSlice } from "./counterSlice";
import postsReducer from "./postsSlice";
import usersReducer from "./usersSlice";
import authReducer from "./authSlice";

// Api Slices and Reducers (with Backend)
// import { apiSlice as usersApi } from "lib/utility/usersApiSlice";
// import { apiSlice as todosApi } from "lib/utility/todosApiSlice";
import { apiSlice } from "lib/utility/authApiSlice";

// const combineReducer = combineReducers({ counter: counterSlice });

const store = configureStore({
  reducer: {
    // with frontend
    // counter: counterSlice.reducer,
    // posts: postsReducer,
    // users: usersReducer,
    auth: authReducer,

    // with backend
    [apiSlice.reducerPath]: apiSlice.reducer,
    // [usersApi.reducerPath]: usersApi.reducer, // for using rtk query
    // [todosApi.reducerPath]: todosApi.reducer, // for using rtk query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // for using rtk query
  // getDefaultMiddleware().concat(todosApi.middleware), // for using rtk query
  // getDefaultMiddleware().concat(usersApi.middleware), // for using rtk query
  devTools: true,
});
// console.log("store : ", store);

export default store;
