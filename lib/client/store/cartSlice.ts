import { createSlice } from "@reduxjs/toolkit";
// console.log("redux localstorage : ", localStorage?.getItem("cart"));
const initialState: any = [];
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateCart: (state, action) => {
      // console.log("action.payload : ", action.payload);
      state = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increaseQuantity: (state, action) => {
      const { _id } = action.payload;
      const foundItem = state.find((v: any) => v._id === _id);
      // console.log("foundItem:", foundItem);
      foundItem.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const { _id } = action.payload;
      const foundItem = state.find((v: any) => v._id === _id);
      foundItem.quantity -= 1;
    },
  },
});
export const { addToCart, updateCart, increaseQuantity, decreaseQuantity }: any = cartSlice.actions;
export const selectCart = (state: any) => state.cart;
