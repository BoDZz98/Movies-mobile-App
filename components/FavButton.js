// this is used in app.js , bec useSelector hook is not working in app.js
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-data-slice";
import { addMovie } from "../util/firebase-services";
import { fetchMovieDetails } from "../util/api-services";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ErrorModal from "./movieDetails/ErrorModal";
import { addRemoveMovie } from "../util/my-backend-services";

const FavButton = ({ movieId, movieData }) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.userData);
  const isAuth = useSelector((state) => state.auth.isAuth);
  // !! is used to convert a value into a boolean
  const isFav = !!userData.favMovies.find((movie) => movie.id == movieId);

  const [errorModalVisible, setErrorModalVisible] = useState(false);

  // console.log("movie data is:", movieData);

  async function addToFav() {
    if (!isAuth) {
      setErrorModalVisible(true);
      return;
    }

    const fetchedMovieData = await fetchMovieDetails(movieId);
    // addMovie(fetchedMovieData, isFav, "favMovies");
    const res = await addRemoveMovie(
      fetchedMovieData,
      isFav,
      userData.userId,
      "favMovies"
    );
    // console.log(res.user);
    dispatch(userActions.updateUser(res.user));
    // dispatch(userActions.addOrRemoveFavMovie(fetchedMovieData));
  }

  return (
    <>
      <Ionicons
        name={isFav ? "heart" : "heart-circle"}
        color="white"
        size={40}
        onPress={addToFav}
      />
      <ErrorModal
        isVisible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
      />
    </>
  );
};

export default FavButton;
