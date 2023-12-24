import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { FIREBASE_AUTH } from "../../firebaseConfig";

const ProfilePageHeader = () => {
  const dispatch = useDispatch();
  function logoutHandler() {
    dispatch(authActions.logout());
    FIREBASE_AUTH.signOut();
  }
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.text}>Profile</Text>
        <Ionicons
          name={"log-out"}
          color="white"
          size={40}
          onPress={logoutHandler}
        />
      </View>
      <View style={styles.userCard}>
        <Image
          style={styles.iconImage}
          resizeMode="cover"
          source={require("../../assets/imgs/logo2.png")}
        />
        <Text>Abdelrahman Elsiefy</Text>
      </View>
    </View>
  );
};

export default ProfilePageHeader;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.primary800,
    alignItems: "center",
  },
  container: {
    height: 300,
    width: "100%",
    backgroundColor: Colors.gray500,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 50,
    position: "absolute",
    zIndex: 0,
    top: -70,
  },
  text: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  userCard: {
    backgroundColor: "white",
    position: "absolute",
    top: 120,
    height: 150,
    width: "80%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    zIndex: 1,
  },

  iconImage: {
    width: "30%",
    height: "65%",
    borderRadius: 3000,
    marginBottom: 4,
  },
});
