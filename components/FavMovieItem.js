import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import CategoryCont from "./UI/CategoryCont";

function renderCategoryList(category) {
  return <CategoryCont categoryName={category.item} />;
}

const FavMovieItem = ({ movie }) => {
  return (
    <View style={styles.root}>
      <View style={styles.imageCont}>
        <Image style={styles.image} resizeMode="stretch" source={movie.photo} />
      </View>

      <View style={styles.textCont}>
        <View style={styles.titleAndRatingCont}>
          <Text style={styles.title}>{movie.name}</Text>
          <Text style={styles.rating}>
            {movie.rating}
            <Ionicons name="star" color={Colors.accent500} size={15} />
          </Text>
        </View>
        <View style={styles.detailsCont}>
          {/* <FlatList
            data={movie.category}
            key={(categoryItem) => categoryItem}
            renderItem={renderCategoryList}
          /> */}
          {movie.category.map((category) => (
            <CategoryCont key={category} categoryName={category} />
          ))}
        </View>
        <Text style={styles.text}>{movie.name}</Text>
        <Text style={styles.text}>{movie.name}</Text>
      </View>
    </View>
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
    // backgroundColor: "blue",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  titleAndRatingCont: {
    // backgroundColor: "red",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsCont: {
    flexDirection: "row",
    marginVertical: 8,
  },
  rating: {
    color: "#cccc",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 4,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: "white",
  },
});
