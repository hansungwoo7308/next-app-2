import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  status: false,
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      if (!accessToken) state.status = false;
      else state.status = true;
      state.user = user;
      state.accessToken = accessToken;
    },
    updateUser: (state, action) => {
      const { user } = action.payload;
      const { username, email, role, image } = user;
      if (username) state.user.username = username;
      if (email) state.user.email = email;
      if (role) state.user.role = role;
      if (image) state.user.image = image;
    },
    clearCredentials: (state, action) => ({ status: false, user: null, accessToken: null }),
  },
});

export const { setCredentials, updateUser, clearCredentials }: any = authSlice.actions;

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       const { user, accessToken } = action.payload;
//       if (!accessToken) return toast.error("No accessToken");
//       state.status = true;
//       state.user = user;
//       state.accessToken = accessToken;
//     },
//     logOut: (state, action) => {
//       state.status = false;
//       state.user = null;
//       state.accessToken = null;
//     },
//     updateUser: (state, action) => {
//       const { user } = action.payload;
//       const { username, email, role, image } = user;
//       if (username) state.user.username = username;
//       if (email) state.user.email = email;
//       if (role) state.user.role = role;
//       if (image) state.user.image = image;
//     },
//   },
// });
// export const { setCredentials, logOut, updateUser }: any = authSlice.actions;
