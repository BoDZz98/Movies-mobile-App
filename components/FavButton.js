// this is used in app.js , bec useSelector hook is not working in app.js
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-data-slice";
import { addMovie } from "../util/firebase-services";
import { fetchMovieDetails } from "../util/api-services";
import { Alert } from "react-native";

const FavButton = ({ movieId }) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.userData);
  const isAuth = useSelector((state) => state.auth.isAuth);
  // !! is used to convert a value into a boolean
  const isFav = !!userData.favMovies.find((movie) => movie.id === movieId);

  async function addToFav() {
    if (!isAuth) {
      Alert.alert("Opps", "Tou must sign in first");
      return;
    }

    const fetchedMovieData = await fetchMovieDetails(movieId);
    addMovie(fetchedMovieData, isFav, "favMovies");
    dispatch(userActions.addOrRemoveFavMovie(fetchedMovieData));
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
