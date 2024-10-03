import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieDetails } from "../util/api-services";

const initUserState = {
  userData: {
    userId: "",
    userName: "",
    email: "",
    defaultProfilePicture:
      "https://firebasestorage.googleapis.com/v0/b/movies-imdp.appspot.com/o/defaultPP.png?alt=media&token=b2846ee3-12ba-47c6-864b-1e015dfbe41a",
    profilePicture: "",
    favMovies: [],
    wishlistMovies: [],
    userComments: [],
    userCollections: [],
  },
};
const userSlice = createSlice({
  name: "userData",
  initialState: initUserState,
  reducers: {
    setUser(state, action) {
      const { userDoc, userComments, profilePicture } = action.payload;
      state.userData = {
        userId: userDoc._id,
        userName: userDoc.name,
        email: userDoc.email,
        favMovies: userDoc.favMovies,
        wishlistMovies: userDoc.wishlistMovies,
        userCollections: userDoc.userCollections,
        userComments,
        profilePicture,
      };
      // console.log("all data is", state.userData);
    },
    updateUser(state, action) {
      const user = action.payload;

      state.userData = {
        ...state.userData,
        userId: user._id,
        userName: user.name,
        favMovies: user.favMovies,
        wishlistMovies: user.wishlistMovies,
        userCollections: user.userCollections,
      };
    },
    updateReviews(state, action) {
      const newReviews = action.payload;
      state.userData = {
        ...state.userData,
        userComments: newReviews,
      };
    },
    updateprofilePicture(state, action) {
      state.userData.profilePicture = action.payload;
    },
    updateUserName(state, action) {
      state.userData.userName = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
