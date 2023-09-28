import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";
import { useSelector } from "react-redux";

const ProfileScreen = ({ navigation }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log("isAuth", isAuth);
  return (
    <View style={styles.container}>
      <Button title="signup" onPress={() => navigation.navigate("signup")} />
      <Button title="Login" onPress={() => navigation.navigate("login")} />
      {isAuth && (
        <Button title="Fav" onPress={() => navigation.navigate("fav")} />
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
});
