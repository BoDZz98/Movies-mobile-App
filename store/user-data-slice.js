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
      // console.log(state.userData);
    },
    addOrRemoveFavMovie(state, action) {
      const movieId = action.payload;
      const movieFound = state.userData.favMovies.find(
        (item) => item === movieId
      );
      if (movieFound) {
        state.userData.favMovies = state.userData.favMovies.filter(
          (item) => item !== movieId
        );
      } else {
        state.userData.favMovies.push(movieId);
      }
      // console.log("fav movies :", state.userData.favMovies);
    },
    addOrRemoveWishlistMovie(state, action) {
      const movieId = action.payload;
      const movieFound = state.userData.wishlistMovies.find(
        (item) => item === movieId
      );
      if (movieFound) {
        state.userData.wishlistMovies = state.userData.wishlistMovies.filter(
          (item) => item !== movieId
        );
      } else {
        state.userData.wishlistMovies.push(movieId);
      }
      // console.log("wishlist Movies  :", state.userData.wishlistMovies);
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
