import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Slices and Reducers (with Frontend)
// import { counterSlice } from "./counterSlice";
import postsReducer from "./postsSlice";
import { posts2Slice } from "./posts2Slice";
import usersReducer from "./usersSlice";
import authReducer from "./authSlice";
// Api Slices and Reducers (with Backend)
// import { apiSlice as usersApi } from "lib/utility/usersApiSlice";
import { todosApiSlice } from "lib/utils/todosApiSlice";
import { authApiSlice } from "lib/utils/authApiSlice";
import { usersApiSlice } from "lib/utils/usersApiSlice";
// const combineReducer = combineReducers({ counter: counterSlice });
const store: any = configureStore({
  reducer: {
    // with frontend
    // counter: counterSlice.reducer,
    // users: usersReducer,
    posts: postsReducer,
    posts2: posts2Slice.reducer,
    auth: authReducer,
    users: usersReducer,

    // with backend
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    // [usersApi.reducerPath]: usersApi.reducer, // for using rtk query
    [todosApiSlice.reducerPath]: todosApiSlice.reducer, // for using rtk query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(usersApiSlice.middleware)
      .concat(todosApiSlice.middleware),
  // getDefaultMiddleware().concat([
  //   authApiSlice.middleware,
  //   usersApiSlice.middleware,
  // ]),
  // getDefaultMiddleware().concat(todosApi.middleware), // for using rtk query
  // getDefaultMiddleware().concat(usersApi.middleware), // for using rtk query
  devTools: true,
});

export default store;
