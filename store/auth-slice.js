import { createSlice } from "@reduxjs/toolkit";

const initAuthState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initAuthState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
    },
    logout(state, action) {
      state.isAuth = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
