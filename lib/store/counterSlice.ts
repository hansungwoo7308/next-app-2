import { createSlice } from "@reduxjs/toolkit";

// slice
export const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state, action) => state + 1,
  },
});
// console.log("counterSlice : ", counterSlice);

// actions
export const { increment } = counterSlice.actions;
