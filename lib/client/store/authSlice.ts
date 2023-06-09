import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: { username: null, accessToken: null },
  reducers: {
    setCredentials: (state, action) => {
      // console.log("action : ", action);
      const { username, accessToken } = action.payload;
      state.username = username;
      state.accessToken = accessToken;
    },
    logOut: (state, action) => {
      state.username = null;
      state.accessToken = null;
    },
  },
});
// actions
export const { setCredentials, logOut }: any = authSlice.actions;
// selectors
export const selectCurrentUser = (state: any) => state.auth.username;
export const selectAcessToken = (state: any) => state.auth.accessToken;
