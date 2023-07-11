import { createSlice } from "@reduxjs/toolkit";
type Modal = {
  name?: string;
  data?: [];
  id?: string;
  message?: string;
  visible?: boolean;
};
// const initialState: Modal[] = [];
const initialState: Modal = {};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { message } = action.payload;
      state.visible = true;
      state.message = message;
      //   state.data?.push()
    },
    // addModal: (state, action) => {
    //   state.push(action.payload);
    // },
    closeModal: (state) => {
      //   const modal: any = state.find((v: any) => v.name === action.payload.name);
      //   modal.visible = false;
      //   return [];
      state.visible = false;
    },
  },
});
export const { openModal, closeModal } = modalSlice.actions;
