import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Stars from "react-native-stars";
import { Colors } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import CommentDetailsModal from "../components/movieDetails/CommentDetailsModal";

const baseImageURL = "http://image.tmdb.org/t/p/original";
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
  {
    id: "m4",
    name: "Avatar 2",
    category: "fiction",
    rating: 8.5,
    photo: require("../assets/imgs/avatar.jpeg"),
  },
  {
    id: "m5",
    name: "world war z",
    category: "zombies",
    rating: 7,
    photo: require("../assets/imgs/war.jpg"),
  },
  {
    id: "m6",
    name: "Avatar",
    category: "fiction",
    rating: 8.5,
    photo: require("../assets/imgs/avatar.jpeg"),
  },
];

const CommentsScreen = ({ route }) => {
  const poster = route.params.moviePoster;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentData, setCommentData] = useState();

  function closeModalHandler() {
    setIsModalVisible(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.poster}
        source={{ uri: baseImageURL + poster }}
        resizeMode="stretch"
      />
      <LinearGradient
        style={styles.root}
        colors={[Colors.primary800, Colors.gray500]}
      >
        <CommentDetailsModal
          isVisible={isModalVisible}
          onClose={closeModalHandler}
          commentDetails={isModalVisible ? commentData : ""}
        />
        <FlatList
          data={DATA}
          key={(item) => item.id}
          numColumns={2}
          style={styles.flatListCont}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  setIsModalVisible(true);
                  setCommentData(item);
                }}
              >
                <View style={styles.commentCont}>
                  <Image source={item.photo} style={styles.profileImg} />
                  <Text style={styles.userName}>{item.name}</Text>
                  <Stars
                    display={2.5}
                    spacing={6}
                    count={5}
                    fullStar={<Ionicons name="star" color="yellow" size={20} />}
                    emptyStar={
                      <Ionicons name="star-outline" color="yellow" size={20} />
                    }
                  />
                  <Ionicons
                    name="reorder-two-outline"
                    size={25}
                    style={{ marginTop: 12 }}
                  />
                </View>
              </Pressable>
            );
          }}
        />
      </LinearGradient>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  poster: {
    height: "50%",
    width: "100%",
  },
  flatListCont: {
    paddingHorizontal: 12,
  },
  commentCont: {
    width: Dimensions.get("window").width * 0.425,
    height: Dimensions.get("window").height * 0.23,
    backgroundColor: "#ccc",
    borderRadius: 16,
    padding: 8,
    margin: 8,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileImg: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.1,
    borderRadius: 100,
  },
  userName: {
    width: "100%",
    textAlign: "center",
    // color: "white",
    borderBottomWidth: 1,
    marginVertical: 4,
    fontSize: 16,
  },
});
