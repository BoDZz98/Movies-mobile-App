import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthContentCard from "../components/UI/AuthContentCard";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { userActions } from "../store/user-data-slice";
import { StyleSheet, Text } from "react-native";
import { getUserReviews, login } from "../util/my-backend-services";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  async function loginHandler(email, password) {
    try {
      const res = await login(email, password);
      const data = await res.json();

      // If credintials are valid
      if (res.ok) {
        await AsyncStorage.setItem("userId", data.user._id); //should remove it when logout
        // const { profilePicture } = await getUserData(data.user);
        const userReviews = await getUserReviews(email);
        dispatch(authActions.login());
        dispatch(
          userActions.setUser({
            userDoc: data.user,
            profilePicture: "profilePicture",
            userComments: userReviews,
          })
        );

        navigation.navigate("home");
      } // If credintials are not valid
      else {
        console.log(data.message);
        setError(true);
      }
    } catch (error) {
      // setError(true);
      console.log("error in login page : ", error);
    }
  }
  return (
    <AuthContentCard>
      {error && <Text style={styles.error}>Invalid Credentials</Text>}
      <AuthForm onPress={loginHandler} />
    </AuthContentCard>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  error: {
    color: "red",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    // marginTop: 40,
    position: "absolute",
    top: 30,
  },
});
