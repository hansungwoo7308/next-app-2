import { createSlice } from "@reduxjs/toolkit";
type notify = {
  loading: boolean;
  visible: boolean;
  message: string;
  timeoutId?: any;
  count?: any;
  // messages: string[];
};
const initialState: notify = {
  message: "",
  loading: false,
  visible: false,
  timeoutId: null,
  count: 0,
  // messages: [],
  // success: false,
  // error: false,
  // response: null,
  // message: undefined,
};
export const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setNotify: (state, action) => {
      const { message, visible } = action.payload;
      state.message = message;
      state.visible = visible;
      state.count++;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setVisible: (state, action) => {
      state.visible = action.payload;
    },
    setTimeoutId: (state, action) => {
      state.timeoutId = action.payload;
    },
  },
});
export const { setNotify, setLoading, setVisible, setTimeoutId } = notifySlice.actions;
