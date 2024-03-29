import { combineReducers, configureStore } from "@reduxjs/toolkit";

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

// import { apiSlice as usersApi } from "lib/utility/usersApiSlice";
import { authApiSlice } from "lib/utils/authApiSlice";
import { usersApiSlice } from "lib/utils/usersApiSlice";
import { todosApiSlice } from "lib/utils/todosApiSlice";
import { loadingSlice } from "lib/client/store/loadingSlice";
// const combineReducer = combineReducers({ counter: counterSlice });

const store: any = configureStore({
  reducer: {
    // counter: counterSlice.reducer,
    // users: usersReducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    orders: ordersSlice.reducer,
    // notify: notifySlice.reducer,
    // loading: loadingSlice.reducer,
    modal: modalSlice.reducer,
    // users: usersSlice.reducer,
    // posts: postsSlice.reducer,
    // posts2: posts2Slice.reducer,

    // [authApiSlice.reducerPath]: authApiSlice.reducer,
    // [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    // [todosApiSlice.reducerPath]: todosApiSlice.reducer, // for using rtk query
    // [usersApi.reducerPath]: usersApi.reducer, // for using rtk query
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware()
  //     .concat(authApiSlice.middleware)
  //     .concat(usersApiSlice.middleware)
  //     .concat(todosApiSlice.middleware),

  // getDefaultMiddleware().concat([
  //   authApiSlice.middleware,
  //   usersApiSlice.middleware,
  // ]),
  // getDefaultMiddleware().concat(todosApi.middleware), // for using rtk query
  // getDefaultMiddleware().concat(usersApi.middleware), // for using rtk query
  devTools: true,
});

export default store;
