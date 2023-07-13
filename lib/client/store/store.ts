import { combineReducers, configureStore } from "@reduxjs/toolkit";
// (with Frontend)
// import { counterSlice } from "./counterSlice";
import { authSlice } from "./authSlice";
import { notifySlice } from "./notifySlice";
import { postsSlice } from "./postsSlice";
import { posts2Slice } from "./posts2Slice";
import { usersSlice } from "./usersSlice";
import { cartSlice } from "./cartSlice";
import { orderSlice } from "./orderSlice";
import { ordersSlice } from "./ordersSlice";
import { modalSlice } from "./modalSlice";
// (with Backend)
// import { apiSlice as usersApi } from "lib/utility/usersApiSlice";
import { authApiSlice } from "lib/utils/authApiSlice";
import { usersApiSlice } from "lib/utils/usersApiSlice";
import { todosApiSlice } from "lib/utils/todosApiSlice";
// const combineReducer = combineReducers({ counter: counterSlice });
const store: any = configureStore({
  reducer: {
    // with frontend
    // counter: counterSlice.reducer,
    // users: usersReducer,
    auth: authSlice.reducer, // authentication
    notify: notifySlice.reducer,
    modal: modalSlice.reducer,
    users: usersSlice.reducer, // for Admin
    cart: cartSlice.reducer, // commerce
    order: orderSlice.reducer, // commerce
    orders: ordersSlice.reducer, // commerce

    posts: postsSlice.reducer,
    posts2: posts2Slice.reducer,

    // with backend
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [todosApiSlice.reducerPath]: todosApiSlice.reducer, // for using rtk query
    // [usersApi.reducerPath]: usersApi.reducer, // for using rtk query
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
