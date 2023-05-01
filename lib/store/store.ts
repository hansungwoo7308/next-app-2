import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Slices and Reducers (with Frontend)
// import { counterSlice } from "./counterSlice";
import postsReducer from "./postsSlice";
import usersReducer from "./usersSlice";
import authReducer from "./authSlice";

// Api Slices and Reducers (with Backend)
// import { apiSlice as usersApi } from "lib/utility/usersApiSlice";
// import { apiSlice as todosApi } from "lib/utility/todosApiSlice";
import { authApiSlice } from "lib/utility/authApiSlice";
import { usersApiSlice } from "lib/utility/usersApiSlice";

// const combineReducer = combineReducers({ counter: counterSlice });

const store: any = configureStore({
  reducer: {
    // with frontend
    // counter: counterSlice.reducer,
    // posts: postsReducer,
    // users: usersReducer,
    auth: authReducer,
    users: usersReducer,

    // with backend
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    // [usersApi.reducerPath]: usersApi.reducer, // for using rtk query
    // [todosApi.reducerPath]: todosApi.reducer, // for using rtk query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(usersApiSlice.middleware),
  // getDefaultMiddleware().concat([
  //   authApiSlice.middleware,
  //   usersApiSlice.middleware,
  // ]),
  // getDefaultMiddleware().concat(todosApi.middleware), // for using rtk query
  // getDefaultMiddleware().concat(usersApi.middleware), // for using rtk query
  devTools: true,
});

export default store;
