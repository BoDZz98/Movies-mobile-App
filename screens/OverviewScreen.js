import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import UserListsModal from "../components/profilePage/UserListsModal";

const OverviewScreen = ({ navigation }) => {
  // User data -----------------------------------------------------------------------------------------

  const userData = useSelector((state) => state.user.userData);
  const data = [
    {
      name: "My Lists",
      subName: "lists",
      icon: "list",
      pageName: "myLists",
      length: userData.userListsLength,
    },
    {
      name: "Comments",
      subName: "Comments",
      icon: "chatbox-ellipses-outline",
      pageName: "Comments",
      length: userData.userComments.length,
    },
    {
      name: "Favorites",
      subName: "Movies",
      icon: "heart-circle",
      pageName: "fav",
      length: userData.favMovies.length,
    },
    {
      name: "Wishlist",
      subName: "Movies",
      icon: "book-outline",
      pageName: "wishlist",
      length: userData.wishlistMovies.length,
    },
  ];
  // User lists modal logic ---------------------------------------------------------------------------------------
  const [isModalVisible, setIsModalVisible] = useState(false);
  function closeHandler() {
    setIsModalVisible(false);
  }

  return (
    <View style={styles.root}>
      {data.map((item) => {
        return (
          <Pressable
            style={styles.container}
            onPress={() => {
              if (item.name === "My Lists") {
                // Modal Component is below
                setIsModalVisible(true);
              } else {
                navigation.navigate(item.pageName, { list: item.name }); //List param is only for the fav and wishlist tabs
              }
            }}
            android_ripple={{ color: Colors.primary800 }}
            key={item.name}
          >
            <Ionicons name={item.icon} color="white" size={40} />
            <View style={styles.textCont}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.number}>
                {item.subName} : {item.length}
              </Text>
            </View>
            <Ionicons name="arrow-forward-outline" color="white" size={30} />
          </Pressable>
        );
      })}
      <UserListsModal isVisible={isModalVisible} onClose={closeHandler} />
    </View>
  );
};

export default OverviewScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary800,
    flexDirection: "column",
    paddingVertical: 24,
    alignItems: "center",
  },

  container: {
    width: "75%",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 6,
    marginVertical: 8,
    backgroundColor: "#ccc",
  },
  textCont: {
    width: "50%",
    flexDirection: "column",
  },
  title: {
    // color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  number: { fontSize: 14 },
});
