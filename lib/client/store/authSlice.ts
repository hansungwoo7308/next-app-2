import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: { username: null, accessToken: null },
  // initialState: { username: null, accessToken: null, refreshToken: null },
  reducers: {
    setCredentials: (state, action) => {
      const { username, accessToken } = action.payload;
      // const { username, accessToken, refreshToken } = action.payload;
      state.username = username;
      state.accessToken = accessToken;
      // state.refreshToken = refreshToken;
    },
    logOut: (state, action) => {
      state.username = null;
      state.accessToken = null;
      // state.refreshToken = null;
    },
  },
});
// actions
export const { setCredentials, logOut }: any = authSlice.actions;
// reducer
export default authSlice.reducer;
// selectors
export const selectCurrentUser = (state: any) => state.auth.username;
export const selectAcessToken = (state: any) => state.auth.accessToken;
export const selectRefreshToken = (state: any) => state.auth.refreshToken;
