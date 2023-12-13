import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieDetails } from "../util/api-services";

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
    },
    addOrRemoveFavMovie(state, action) {
      const movieData = action.payload;
      const addedMovie = {
        id: movieData.id,
        title: movieData.title,
        rating: movieData.vote_average,
        poster: movieData.poster,
        genres: movieData.genres,
        runtime: movieData.runtime,
        release_date: movieData.release_date,
      };
      const movieFound = state.userData.favMovies.find(
        (movie) => movie.id === addedMovie.id
      );
      if (movieFound) {
        state.userData.favMovies = state.userData.favMovies.filter(
          (movie) => movie.id !== addedMovie.id
        );
      } else {
        state.userData.favMovies.push(addedMovie);
      }
      // console.log("fav movies :", state.userData.favMovies);
    },
    addOrRemoveWishlistMovie(state, action) {
      const movieData = action.payload;
      const movieFound = state.userData.wishlistMovies.find(
        (movie) => movie.id === movieData.id
      );
      const addedMovie = {
        id: movieData.id,
        title: movieData.title,
        rating: movieData.vote_average,
        poster: movieData.poster,
        genres: movieData.genres,
        runtime: movieData.runtime,
        release_date: movieData.release_date,
      };
      if (movieFound) {
        state.userData.wishlistMovies = state.userData.wishlistMovies.filter(
          (movie) => movie.id !== movieData.id
        );
      } else {
        state.userData.wishlistMovies.push(addedMovie);
      }
      // console.log("wishlist Movies  :", state.userData.wishlistMovies);
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
