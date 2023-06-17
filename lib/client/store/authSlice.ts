import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: null,
  status: false,
  username: null,
  accessToken: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { mode, username, accessToken } = action.payload;
      state.mode = mode;
      state.status = true;
      state.username = username;
      state.accessToken = accessToken;
    },
    logOut: (state, action) => {
      state.mode = null;
      state.status = false;
      state.username = null;
      state.accessToken = null;
    },
  },
});
export const { setCredentials, logOut }: any = authSlice.actions;
export const selectAuth = (state: any) => state.auth;
