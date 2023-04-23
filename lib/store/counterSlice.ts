import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

// slice
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.count += 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
      // state.count += Number(action.payload);
    },
  },
});
// console.log("counterSlice : ", counterSlice);

// actions
export const { increment, reset, incrementByAmount } = counterSlice.actions;
// console.log("counterSlice.actions : ", counterSlice.actions);
