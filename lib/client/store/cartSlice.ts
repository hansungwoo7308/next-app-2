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
      const cart: any = action.payload;
      // const newCart: any = [];
      // for (const v of state) {
      //   state.pop(v);
      // }

      cart.map((v: any) => {
        state.push(v);
      });
      // console.log("newCart : ", newCart);
      // state = cart;
      // localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state, action) => {
      return [];
    },
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
  updateCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
}: any = cartSlice.actions;
export const selectCart = (state: any) => state.cart;
