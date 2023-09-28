import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ThreeButtons from "../components/movieDetails/ThreeButtons";
import ActorsList from "../components/movieDetails/ActorsList";
import MovieImgs from "../components/movieDetails/MovieImgs";
const DATA = [
  {
    id: "m1",
    name: "Openhiemmer",
    category: "fantasy",
    rating: 9,
    photo: require("../assets/imgs/open.jpg"),
  },
  {
    id: "m2",
    name: "world war z",
    category: "zombies",
    rating: 7,
    photo: require("../assets/imgs/war.jpg"),
  },
  {
    id: "m3",
    name: "Avatar",
    category: "fiction",
    rating: 8.5,
    photo: require("../assets/imgs/avatar.jpeg"),
  },
];

const MovieDetailsScreen = () => {
  return (
    <>
      <Image
        style={styles.image}
        source={require("../assets/imgs/avatar2.jpg")}
        resizeMode="cover"
      />
      <LinearGradient
        style={styles.container}
        colors={[Colors.primary800, Colors.gray500]}
      >
        <ScrollView>
          <Text style={styles.title}>Large Titleeeeeeeeeeeeeee</Text>
          <View style={styles.detailsCont}>
            <Text style={styles.detailsText}>
              8.9
              <Ionicons name="star" color={Colors.accent500} size={15} />
            </Text>
            <Text style={styles.detailsText}>2h 36 min</Text>
            <Text style={styles.detailsText}>2023</Text>
          </View>
          <View style={styles.detailsCont}>
            <View style={styles.categoryCont}>
              <Text style={styles.text}>category</Text>
            </View>
            <View style={styles.categoryCont}>
              <Text style={styles.text}>category</Text>
            </View>
          </View>

          <ThreeButtons />

          <ActorsList />

          <Text style={styles.summary}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis en
          </Text>

          <MovieImgs movieData={DATA} />
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  image: {
    // flex: 0.2,
    height: "30%",
    width: "100%",
    resizeMode: "center",
  },
  container: {
    flex: 1,
    // height:'100%',
    padding: 18,
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  detailsCont: {
    flexDirection: "row",
    marginVertical: 8,
  },
  detailsText: {
    color: "#cccc",
    fontSize: 15,
    marginHorizontal: 8,
  },
  

  summary: { color: "#cccc", marginVertical: 20 },
});
