import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";

const ProfilePageHeader = ({ openBottomSheetHandler, bottomSheetOpened }) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userData.userName);
  const profilePicture = useSelector(
    (state) => state.user.userData.profilePicture
  );
  //  logout -----------------------------------------------------------------------------------------------------------------------
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
      {!bottomSheetOpened && (
        <LinearGradient colors={["gray", "white"]} style={styles.outerUserCard}>
          <Pressable
            style={styles.innerUserCard}
            onPress={() => openBottomSheetHandler()}
          >
            <Image
              style={styles.iconImage}
              resizeMode="cover"
              source={
                profilePicture
                  ? { uri: profilePicture }
                  : require("../../assets/imgs/logo2.png")
              }
            />
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>{userName}</Text>
            <Ionicons
              name={"filter-outline"}
              color="black"
              size={25}
              style={{ position: "absolute", bottom: 4, right: 4 }}
            />
          </Pressable>
        </LinearGradient>
      )}
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
    height: Dimensions.get("window").height * 0.38,
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
  outerUserCard: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.15,
    height: Dimensions.get("window").height * 0.2,
    width: "80%",
    borderRadius: 20,
    // zIndex: 1,
  },
  innerUserCard: {
    // backgroundColor: "red",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  iconImage: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    borderRadius: 3000,
    marginBottom: 4,
  },
});
