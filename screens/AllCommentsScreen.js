import React, { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Stars from "react-native-stars";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import CommentDetailsModal from "../components/movieDetails/CommentDetailsModal";
import DropDownPicker from "react-native-dropdown-picker";
import EditCommentModal from "../components/profilePage/EditCommentModal";
import { useSelector } from "react-redux";
import { baseImageURL } from "../util/firebase-services";

const AllCommentsScreen = () => {
  const USER_COMMENTS = useSelector(
    (state) => state.user.userData.userComments
  );

  // console.log(USER_COMMENTS);
  useEffect(() => {}, [USER_COMMENTS]);

  // Modal logic-------------------------------------------------
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentData, setCommentData] = useState();
  function closeModalHandler() {
    setIsModalVisible(false);
  }
  //-------------------------------------------------

  return (
    <View style={styles.root}>
      <EditCommentModal
        isVisible={isModalVisible}
        onClose={closeModalHandler}
        commentData={isModalVisible ? commentData : ""}
      />

      <FlatList
        data={USER_COMMENTS}
        keyExtractor={(comment) => comment.commentId}
        numColumns={2}
        style={styles.flatListCont}
        renderItem={({ item }) => {
          const movie = item;
          return (
            <Pressable
              onPress={() => {
                setIsModalVisible(true);
                setCommentData(movie);
              }}
            >
              <View style={styles.commentCont}>
                <Image
                  source={{ uri: baseImageURL + movie.poster }}
                  style={styles.profileImg}
                />
                <Text style={styles.movieName}>{movie.title}</Text>
                <Stars
                  default={movie.rating}
                  display={movie.rating}
                  spacing={6}
                  count={5}
                  fullStar={<Ionicons name="star" color="yellow" size={20} />}
                  emptyStar={
                    <Ionicons name="star-outline" color="yellow" size={20} />
                  }
                />
                <Ionicons
                  name="reorder-two-outline"
                  size={30}
                  style={{ marginTop: 6 }}
                />
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default AllCommentsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary800,
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

  movieName: {
    width: "100%",
    maxHeight: Dimensions.get("window").height * 0.03,
    textAlign: "center",
    borderBottomWidth: 1,
    marginVertical: 6,
    fontSize: 16,
  },
});
