import { createSlice } from "@reduxjs/toolkit";

// slice
export const posts2Slice = createSlice({
  name: "posts2",
  initialState: [],
  reducers: {},
});

// selectors
export const selectAllPosts = (state: any) => state.posts2;
