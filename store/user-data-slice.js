import { createSlice } from "@reduxjs/toolkit";

const initUserState = {
  userData: {
    userId: "",
    username: "",
    favMovies: [],
    wishlistMovies: [],
  },
};
const userSlice = createSlice({
  name: "userData",
  initialState: initUserState,
  reducers: {
    setUser(state, action) {
      const data = action.payload;
      state.userData = data;

      // console.log(state.userData.favMovies);
    },
    addMovie(state, action) {},
    removeMovie(state, action) {},
  },
});

export const userActions = userSlice.actions;
export default userSlice;
