import { createSlice } from "@reduxjs/toolkit";
type notify = {
  // spinner
  loading?: boolean;
  // notifiy
  visible?: boolean;
  status?: "success" | "error" | null;
  message?: string | null;
  //
  timeoutId?: number | null;
  count?: any;
  // messages: string[];
};
const initialState: notify = {
  loading: false,
  visible: false,
  status: null,
  message: "",
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
      const { status, message, visible } = action.payload;
      state.status = status;
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
