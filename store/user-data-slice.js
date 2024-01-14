import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieDetails } from "../util/api-services";

const initUserState = {
  userData: {
    userId: "",
    userName: "",
    defaultProfilePicture:
      "https://firebasestorage.googleapis.com/v0/b/movies-imdp.appspot.com/o/defaultPP.png?alt=media&token=b2846ee3-12ba-47c6-864b-1e015dfbe41a",
    profilePicture: "",
    favMovies: [],
    wishlistMovies: [],
    userComments: [],
    userListsLength: 0,
  },
};
const userSlice = createSlice({
  name: "userData",
  initialState: initUserState,
  reducers: {
    setUser(state, action) {
      const { userDoc, userComments, userListsLength, profilePicture } =
        action.payload;
      // userData is an object itself , so we used the spread operator ... to spread/move the userData
      // object properties into state.userData object , then we added the userComments
      state.userData = {
        ...userDoc,
        userComments,
        userListsLength,
        profilePicture,
      };
    },
    updateprofilePicture(state, action) {
      state.userData.profilePicture = action.payload;
    },
    updateUserName(state, action) {
      state.userData.userName = action.payload;
    },
    updateUserListsLength(state, action) {
      action.payload === "inc"
        ? (state.userData.userListsLength += 1)
        : (state.userData.userListsLength -= 1);
    },
    /* updateprofileinfo(state, action) {
      const { identifier, value } = action.payload;
      state.userData == { ...state.userData, [identifier]: value };
    }, */
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
      // console.log(exisitingItem);
    },
    deleteComment(state, action) {
      const commentId = action.payload;
      state.userData.userComments = state.userData.userComments.filter(
        (comment) => comment.commentId !== commentId
      );
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
