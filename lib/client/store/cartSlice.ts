import { createSlice } from "@reduxjs/toolkit";
// console.log("redux localstorage : ", localStorage?.getItem("cart"));
const initialState: any = [];
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //   const { product, cart }:any = action.payload;
      // 재고가 없는 경우
      //   if(product.inStock===0) return {message:'This product is out of stock.'}
      //   state.cart = action.payload;
      // state.cart = [...state.cart,product]
      //   const data:any = {type:'',data:action.payload}

      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const { addToCart }: any = cartSlice.actions;
export const selectCart = (state: any) => state.cart;
