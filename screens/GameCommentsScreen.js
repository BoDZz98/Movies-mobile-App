import React, { useEffect } from "react";
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
import { baseImageURL } from "../util/firebase-services";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";

const GameCommentsScreen = ({ route }) => {
  const poster = route.params.moviePoster;

  //Modal Logic ------------------------------------------------------------------------------------------------------------------
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentData, setCommentData] = useState();
  function closeModalHandler() {
    setIsModalVisible(false);
  }

  // fetching comments on this movie ------------------------------------------------------------------------------------------------------
  const [movieComments, setMovieComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    onSnapshot(
      query(collection(FIREBASE_DB, "comments"), where("poster", "==", poster)),
      (snapshot) => {
        const tempArray = [];
        snapshot.docs.map(async (document) => {
          const userRefDoc = doc(FIREBASE_DB, "users", document.data().userId);
          const userSnapDoc = await getDoc(userRefDoc);
          tempArray.push({
            commentId: document.id,
            userName: userSnapDoc.data().userName,
            desc: document.data().desc,
            rating: document.data().rating,
          });
          setMovieComments(tempArray);
        });
      }
    );
    setIsLoading(false);
  }, []);

  /* if (movieComments.length === 0 && !isLoading) {
    return <Text>loading</Text>;
  } */
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imgCont}>
        <Image
          style={styles.poster}
          source={{ uri: baseImageURL + poster }}
          resizeMode="cover"
        />
      </View>

      <LinearGradient
        style={styles.root}
        colors={[Colors.primary800, Colors.gray500]}
      >
        <CommentDetailsModal
          isVisible={isModalVisible}
          onClose={closeModalHandler}
          commentDetails={isModalVisible ? commentData : ""}
        />
        {!isLoading && movieComments.length === 0 && (
          <Text style={styles.msg}>No Comments </Text>
        )}
        {isLoading && <Text style={styles.msg}>Loading... </Text>}
        <FlatList
          data={movieComments}
          keyExtractor={(item) => item.commentId}
          numColumns={2}
          style={styles.flatListCont}
          renderItem={({ item }) => {
            // console.log("item is :", item);
            return (
              <Pressable
                onPress={() => {
                  setIsModalVisible(true);
                  setCommentData(item);
                }}
              >
                <View style={styles.commentCont}>
                  <Image source={item.photo} style={styles.profileImg} />
                  <Text style={styles.userName}>{item.userName}</Text>
                  <Stars
                    display={item.rating}
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

export default GameCommentsScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  imgCont: {
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    backgroundColor: Colors.primary800,
  },
  poster: {
    width: "70%",
    height: "90%",
    resizeMode: "center",
    borderRadius: 20,
  },
  flatListCont: { paddingHorizontal: 12 },
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
  msg: {
    color: "white",
    alignSelf: "center",
    marginTop: "40%",
    fontSize: 30,
    fontWeight: "bold",
  },
});
