import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieDetails } from "../util/api-services";

const initUserState = {
  userData: {
    userId: "",
    username: "",
    favMovies: [],
    wishlistMovies: [],
    userComments: [],
  },
};
const userSlice = createSlice({
  name: "userData",
  initialState: initUserState,
  reducers: {
    setUser(state, action) {
      const userData = action.payload.userDoc;
      const userComments = action.payload.userComments;
      // userData is an object itself , so we used the spread operator ... to spread/move the userData
      // object properties into state.userData object , then we added the userComments
      state.userData = { ...userData, userComments };
      // console.log(state.userData.userComments);
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
    addOrRemoveComment(state, action) {
      const { commentId, commentData, movieDetails } = action.payload;
      state.userData.userComments.push({
        commentId,
        ...commentData,
        ...movieDetails,
      });

      // console.log("in user-data-slice :", state.userData.userComments);
    },
    updateComment(state, action) {
      const { commentId } = action.payload;
      const commentData = action.payload.comment;
      const exisitingItem = state.userData.userComments.find(
        (comment) => comment.commentId === commentId
      );
      exisitingItem.desc = commentData.desc;
      exisitingItem.rating = commentData.rating;
    },
    deleteComment(state, action) {
      const commentId = action.payload;
      state.userData.userComments.filter(
        (comment) => comment.commentId !== commentId
      );
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
