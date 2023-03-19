import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";

// const combineReducer = combineReducers({ counter: counterSlice });

const store = configureStore({ reducer: { counter: counterSlice.reducer } });

//
// export

export default store;
