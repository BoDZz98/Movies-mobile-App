// this is used in app.js , bec useSelector hook is not working in app.js
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-data-slice";
import { addMovie } from "../util/firebase-services";

const FavButton = ({ movieId }) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.userData);
  // !! is used to convert a value into a boolean
  const isFav = !!userData.favMovies.find((item) => item === movieId);

  async function addToFav() {
    addMovie(movieId, isFav, "favMovies");
    dispatch(userActions.addOrRemoveFavMovie(movieId));
  }
  return (
    <Ionicons
      name={isFav ? "heart" : "heart-circle"}
      color="white"
      size={40}
      onPress={addToFav}
    />
  );
};

export default FavButton;
