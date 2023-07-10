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
  reducers: {
    setUsers: (state, action) => {
      const newState = action.payload;
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
export const { setUsers } = usersSlice.actions;
// selectors
export const selectAllUsers = (state: any) => state.users;
// reducer
export default usersSlice.reducer;
