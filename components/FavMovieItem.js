import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import CategoryCont from "./UI/CategoryCont";
import { baseImageURL } from "../util/firebase-services";
import { useNavigation } from "@react-navigation/native";

const FavMovieItem = ({ movieData }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() => {
        navigation.navigate("movieDetails", { movieId: movieData.id });
      }}
    >
      <View style={styles.imageCont}>
        <Image
          style={styles.image}
          resizeMode="stretch"
          source={{ uri: baseImageURL + movieData.poster }}
        />
      </View>

      <View style={styles.textCont}>
        <View style={styles.titleAndRatingCont}>
          <Text style={styles.title}>{movieData.title}</Text>
          <Text style={styles.rating}>
            {movieData.rating}
            <Ionicons name="star" color={Colors.accent500} size={15} />
          </Text>
        </View>
        <View style={{ marginVertical: 8 }}>
          <FlatList
            data={movieData.genres}
            horizontal={true}
            key={(categoryItem) => categoryItem}
            renderItem={({ item }) => (
              // I made this condition bec I use this component in 2 diff location with diff data given
              <CategoryCont categoryName={item.name ? item.name : item} />
            )}
          />
        </View>
        {movieData.runtime && (
          <Text style={styles.text}>
            Duration : <Text style={styles.innerText}>{movieData.runtime}</Text>
          </Text>
        )}
        <Text style={styles.text}>
          Release Date :
          <Text style={styles.innerText}>{movieData.release_date}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FavMovieItem;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.gray500,
    marginVertical: 20,
    padding: 12,
    flexDirection: "row",
    borderRadius: 10,
  },
  imageCont: {
    width: "35%",
    height: "120%",
    borderRadius: 10,
  },
  image: {
    bottom: 30,
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  textCont: {
    width: "55%",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  titleAndRatingCont: {
    // backgroundColor: "red",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rating: {
    color: "#cccc",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 4,
    paddingHorizontal: 4,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    maxWidth: "95%",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  innerText: {
    color: "grey",
    fontWeight: "normal",
    fontSize: 13,
  },
});
