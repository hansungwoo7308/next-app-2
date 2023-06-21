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
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});
export const { setCart, setTotal } = orderSlice.actions;
