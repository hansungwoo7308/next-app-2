import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../utils/fetchData";
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
      const { message, id } = action.payload;
      state.visible = true;
      state.message = message;
      state.id = id;
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
  extraReducers(builder) {
    // builder.addCase(fetchTest.fulfilled, (state, action) => {
    //   // 리턴된 값으로 상태 변경
    //   console.log("extraReducers : ", action.payload);
    //   return action.payload;
    // });
  },
});
export const { openModal, closeModal } = modalSlice.actions;
// export const fetchTest = createAsyncThunk("users/fetchTest", async () => {
//   const response = await getData("users");
//   return response.data;
// });
