import { createSlice } from "@reduxjs/toolkit";
export const notifySlice = createSlice({
  name: "notify",
  initialState: { message: "message test" },
  reducers: {
    setMessage: (state, action) => {
      const { message } = action.payload;
      state.message = message;
    },
  },
});
export const selectMessage = (state: any) => state.notify.message;
