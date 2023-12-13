import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyButton from "../UI/MyButton";
import { Colors } from "../../constants/styles";
import ModalCard from "../UI/ModalCard";
import { addMovie, checkMovie } from "../../util/firebase-services";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-data-slice";

const AddMovieModal = ({ isVisible, onClose, data }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  // !! is used to convert a value into a boolean
  const isFav = !!userData.favMovies.find((movie) => movie.id === data.id);
  const isWishlist = !!userData.wishlistMovies.find(
    (movie) => movie.id === data.id
  );
  // console.log("in add movie modal", data);

  function addMovieTo(list) {
    if (list === "fav") {
      addMovie(data, isFav, "favMovies");
      dispatch(userActions.addOrRemoveFavMovie(data));
    } else {
      addMovie(data, isWishlist, "wishlistMovies");
      dispatch(userActions.addOrRemoveWishlistMovie(data));
    }
  }
  return (
    <ModalCard isVisible={isVisible} onClose={onClose}>
      <Text style={styles.title}>ADD MOVIE</Text>
      <View style={styles.buttonsCont}>
        <MyButton
          style={[styles.buttonCont, isFav && styles.pressedButton]}
          onPress={addMovieTo.bind(null, "fav")}
        >
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            color="white"
            size={20}
          />
        </MyButton>
        <MyButton
          style={[styles.buttonCont, isWishlist && styles.pressedButton]}
          onPress={addMovieTo.bind(null, "wishlist")}
        >
          <Ionicons
            name={isWishlist ? "book" : "book-outline"}
            color="white"
            size={20}
          />
        </MyButton>
      </View>
      <Text style={styles.subTitle}>Your Lists :</Text>
      <ScrollView
        style={styles.scrollViewCont}
        indicatorStyle="black"
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.listCont}>
          <View style={styles.textCont}>
            <Text style={styles.listName}>List Name</Text>
            <Text style={styles.number}>Movies : 3</Text>
          </View>
          <Ionicons name="add-circle-outline" color="black" size={30} />
        </Pressable>
        <Pressable style={styles.listCont}>
          <View style={styles.textCont}>
            <Text style={styles.listName}>List Name</Text>
            <Text style={styles.number}>Movies : 3</Text>
          </View>
          <Ionicons name="add-circle-outline" color="black" size={30} />
        </Pressable>
        <Pressable style={styles.listCont}>
          <View style={styles.textCont}>
            <Text style={styles.listName}>List Name</Text>
            <Text style={styles.number}>Movies : 3</Text>
          </View>
          <Ionicons name="add-circle-outline" color="black" size={30} />
        </Pressable>
      </ScrollView>
    </ModalCard>
  );
};

export default AddMovieModal;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    width: "100%",
  },
  buttonsCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 12,
  },
  buttonCont: {
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 1,
  },
  pressedButton: { backgroundColor: "#111111" },
  subTitle: { textAlign: "left", width: "100%" },
  scrollViewCont: { marginTop: 3, width: "100%" },
  listCont: {
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
  },
  textCont: { flexDirection: "column" },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  number: { fontSize: 12 },
});
