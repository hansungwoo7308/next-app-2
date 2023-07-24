import { createSlice } from "@reduxjs/toolkit";
type Modal = {
  visible?: boolean;
  type?: string;
  message?: string;
  id?: string;
  ids?: string[];
  title?: string;
  // data?: [];
};
// const initialState: Modal[] = [];
const initialState: Modal = {};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, message, id, ids, title } = action.payload;
      state.visible = true;
      state.type = type;
      state.message = message;
      state.id = id;
      state.ids = ids;
      state.title = title;
    },
    closeModal: (state) => {
      //   const modal: any = state.find((v: any) => v.name === action.payload.name);
      //   modal.visible = false;
      //   return [];
      state.visible = false;
      state.type = "";
      state.message = "";
      state.id = "";
      state.ids = [];
      state.title = "";
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
