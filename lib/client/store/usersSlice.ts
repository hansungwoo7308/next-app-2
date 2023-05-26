import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const USERS_URL = "https://jsonplaceholder.typicode.com/users?_limit=10";
const initialState: any = [];
// thunk
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});
// slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
// selectors
export const selectAllUsers = (state: any) => state.users;
export const selectUserById = (state: any, userId: any) =>
  state.users.find((user: any) => user.id === userId);
// reducer
export default usersSlice.reducer;