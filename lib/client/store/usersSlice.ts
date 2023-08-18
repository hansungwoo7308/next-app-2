import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const USERS_URL = "https://jsonplaceholder.typicode.com/users?_limit=10";
const initialState: any = [];
// thunk
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  console.log("[users/fetchUsers]");
  const response = await axios.get(USERS_URL);
  // console.log("response : ", response);
  return response.data;
});
// slice
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      const newState = action.payload;
      return newState;
    },
    updateUser: (state, action) => {
      const { _id, role } = action.payload;
      state.find((user: any) => user._id === _id).role = role;
    },
    deleteUser: (state, action) => {
      const { _id } = action.payload;
      const newState = state.filter((v: any) => v._id !== _id);
      return newState;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // 리턴된 값으로 상태 변경
      return action.payload;
    });
  },
});
export const { setUsers, updateUser, deleteUser } = usersSlice.actions;
// selectors
export const selectAllUsers = (state: any) => state.users;
// reducer
