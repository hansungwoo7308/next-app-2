import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
  address: "",
  mobile: "",
  total: 0,
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});
export const { setOrderTotal } = orderSlice.actions;
