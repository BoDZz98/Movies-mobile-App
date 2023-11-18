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
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import CommentDetailsModal from "../components/movieDetails/CommentDetailsModal";
import DropDownPicker from "react-native-dropdown-picker";

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
const AllCommentsScreen = () => {
  // Modal logic-------------------------------------------------
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentData, setCommentData] = useState();
  function closeModalHandler() {
    setIsModalVisible(false);
  }
  //-------------------------------------------------
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  return (
    <View style={styles.root}>
      <CommentDetailsModal
        isVisible={isModalVisible}
        onClose={closeModalHandler}
        commentDetails={isModalVisible ? commentData : ""}
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
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
  userName: {
    width: "100%",
    textAlign: "center",
    // color: "white",
    borderBottomWidth: 1,
    marginVertical: 4,
    fontSize: 16,
  },
});
