import { createSlice } from "@reduxjs/toolkit";
const initialState: any = [];
export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },
    setOrders: (state, action) => {
      const orders = action.payload;
      const newState: any = [];
      orders.map((order: any) => newState.push(order));
      return newState;
    },
  },
});
export const { addOrder, setOrders } = ordersSlice.actions;
