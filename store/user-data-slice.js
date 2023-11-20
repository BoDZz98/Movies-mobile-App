import { createSlice } from "@reduxjs/toolkit";

const initUserState = {
  userId: "",
  username: "",
  favMovies: [],
  wishlistMovies: [],
};

const userSlice = createSlice({
  name: "userData",
  initialState: initUserState,
  reducers: {
    setUser(state, action) {
      const userData = action.payload;
      console.log(userData);
    },
    addMovie(state, action) {
    },
    removeMovie(state, action) {
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
