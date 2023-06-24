import { createSlice } from "@reduxjs/toolkit";
const initialState: any = [];
// {
//   cart: [],
//   address: "",
//   mobile: "",
//   total: 0,
// };
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },
  },
});
export const { addOrder } = orderSlice.actions;
