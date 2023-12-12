import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import moviesSlice from "./set-movies-slice";
import userSlice from "./user-data-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    movies: moviesSlice.reducer,
    user: userSlice.reducer,
  },
});
