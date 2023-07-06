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
    reloadCart: (state, action) => {
      const cart = action.payload;
      return cart;
      // const cart: any = action.payload;
      // cart.map((product: any) => {
      //   state.push(product);
      // });
    },
    clearCart: (state, action) => [],
    increaseQuantity: (state, action) => {
      const { _id } = action.payload;
      state.find((v: any) => v._id === _id).quantity++;
      // const foundItem = state.find((v: any) => v._id === _id);
      // foundItem.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const { _id } = action.payload;
      state.find((v: any) => v._id === _id).quantity--;
      // const foundItem = state.find((v: any) => v._id === _id);
      // foundItem.quantity -= 1;
    },
    deleteItem: (state, action) => {
      const { _id } = action.payload;
      const newState = state.filter((v: any) => v._id !== _id);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
  },
});
export const {
  addToCart,
  reloadCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
}: any = cartSlice.actions;
export const selectCart = (state: any) => state.cart;
