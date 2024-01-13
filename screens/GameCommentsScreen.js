import React, { useLayoutEffect } from "react";
import {
  Alert,
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
import { FIREBASE_DB, STORAGE } from "../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { useSelector } from "react-redux";
import AddCommentModal from "../components/movieDetails/AddCommentModal";

const GameCommentsScreen = ({ navigation, route }) => {
  const poster = route.params.moviePoster;
  const isAuth = useSelector((state) => state.auth.isAuth);

  //comment details Modal Logic ------------------------------------------------------------------------------------------------------------------
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentData, setCommentData] = useState();
  function closeModalHandler() {
    setIsModalVisible(false);
  }
  //Add comment Modal Logic ------------------------------------------------------------------------------------------------------------------
  const [addCommentModalVisible, setAddCommentModalVisible] = useState(false);
  const [movieData, setMovieData] = useState();
  function closeAddCommentModalHandler() {
    setAddCommentModalVisible(false);
  }
  const [movieComments, setMovieComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useLayoutEffect(() => {
    // Header right logic ----------------------------------------------
    navigation.setOptions({
      headerRight: ({ tintColor }) => {
        //  Modal logic is below
        return (
          <Ionicons
            name="add-circle"
            color={tintColor}
            size={40}
            onPress={() => {
              if (isAuth) {
                setAddCommentModalVisible(true);
                setMovieData({
                  poster: route.params.moviePoster,
                  title: route.params.movieName,
                });
              } else {
                Alert.alert("Opps", "Tou must sign in first");
              }
            }}
          />
        );
      },
    });
    // fetching comments on this movie --------------------------------------------------------
    setIsLoading(true);
    onSnapshot(
      query(collection(FIREBASE_DB, "comments"), where("poster", "==", poster)),
      (snapshot) => {
        const tempArray = [];
        snapshot.docs.map(async (document) => {
          const userId = document.data().userId;
          // Getting username -----------------------------
          const userRefDoc = doc(FIREBASE_DB, "users", userId);
          const userSnapDoc = await getDoc(userRefDoc);
          // Getting profile Picture ----------------------
          const userImgRef = ref(STORAGE, `profileImages/${userId}`);
          getDownloadURL(userImgRef).then((response) => {
            tempArray.push({
              commentId: document.id,
              userName: userSnapDoc.data().userName,
              desc: document.data().desc,
              rating: document.data().rating,
              profilePicture: response,
            });
            setMovieComments(tempArray);
          });
        });
        setIsLoading(false);
      }
    );
  }, []);
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
                  <Image
                    source={{ uri: item.profilePicture }}
                    style={styles.profileImg}
                  />
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
        <AddCommentModal
          isVisible={addCommentModalVisible}
          onClose={closeAddCommentModalHandler}
          movieData={addCommentModalVisible ? movieData : ""}
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
