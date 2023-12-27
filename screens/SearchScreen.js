import React, { useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { searchMovie } from "../util/api-services";
import FavMovieItem from "../components/FavMovieItem";
import { LinearGradient } from "expo-linear-gradient";

const SearchScreen = () => {
  // Managing input focas state ----------------------------------
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  function handleSearchButtonPress() {
    if (inputRef.current) {
      if (isFocused) {
        inputRef.current.blur(); // Unfocus the input
      } else {
        inputRef.current.focus(); // Focus the input
      }
      setIsFocused(!isFocused); // Toggle the focus state
    }
  }
  // Fethcing data from api based on search value ----------------------
  const [searchedMovie, setSearchedMovie] = useState([]);
  async function textChangeHandler(enteredText) {
    setSearchedMovie(await searchMovie(enteredText));
  }
  

  return (
    <View style={styles.root}>
      <View style={styles.searchCont}>
        <TextInput
          style={styles.input}
          ref={inputRef}
          placeholder="Search..."
          placeholderTextColor="white"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={textChangeHandler}
        />
        <Pressable
          style={[
            styles.searchIconCont,
            isFocused && { backgroundColor: "#ccc" },
          ]}
          android_ripple={{ color: "#ccc" }}
          onPress={handleSearchButtonPress}
        >
          <Ionicons name="search" color="white" size={30} />
        </Pressable>
      </View>
      <LinearGradient
        style={{ flex: 1, padding: 18 ,width:'100%' }}
        colors={[Colors.primary800, Colors.gray700]}
      >
        <FlatList
          data={searchedMovie}
          keyExtractor={(movie) => movie.id}
          renderItem={({ item }) => <FavMovieItem movieData={item} />}
        />
      </LinearGradient>
    </View>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary800,
    alignItems: "center",
    paddingTop: "15%",
  },
  searchCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: Colors.gray500,
    color: "white",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 8,
    width: "80%",
  },
  searchIconCont: {
    backgroundColor: Colors.gray500,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: 5.5,
  },
});
