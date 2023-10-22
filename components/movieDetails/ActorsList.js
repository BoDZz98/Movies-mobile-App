import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../constants/styles";

const baseImageURL = "http://image.tmdb.org/t/p/original";

function renderActor(itemData) {
  const actor = itemData.item;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/imgs/war.jpg")}
        resizeMode="stretch"
      />
      <View style={styles.namesCont}>
        <Text style={styles.realName}>{actor.original_name}</Text>
        <Text style={styles.movieName}>{actor.character}</Text>
      </View>
    </View>
  );
}
const ActorsList = ({ actors }) => {
  return (
    /* <View style={{ flex:1 ,backgroundColor:'red'}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={actors}
        keyExtractor={(item) => item.id}
        renderItem={renderActor}
      />
    </View> */
    <ScrollView horizontal={true} style={styles.root}>
      {actors.map((actor) => {
        return (
          <View key={actor.id} style={styles.container}>
            <Image
              style={styles.image}
              source={{ uri: baseImageURL + actor.profile_path }}
              resizeMode="stretch"
            />
            <View style={styles.namesCont}>
              <Text style={styles.realName}>{actor.original_name}</Text>
              <Text style={styles.movieName}>{actor.character}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ActorsList;

const styles = StyleSheet.create({
  root: {
  },
  container: {
    marginHorizontal: 8,
    flexDirection: "row",
    gap: 20,
    width: "30%",
    borderRadius: 20,
    backgroundColor: Colors.gray700,
    overflow: "hidden",
  },
  image: {
    width: "35%",
    height: "100%",
  },
  namesCont: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  realName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  movieName: {
    color: "#ccc",
    fontSize: 15,
  },
});
