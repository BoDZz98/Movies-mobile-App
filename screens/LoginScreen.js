import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import AuthContentCard from "../components/UI/AuthContentCard";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { userActions } from "../store/user-data-slice";
import { getUserData, getUserListsLength } from "../util/firebase-services";
import { StyleSheet, Text } from "react-native";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  async function loginHandler(email, password) {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      dispatch(authActions.login());

      onAuthStateChanged(FIREBASE_AUTH, async (user) => {
        const { userData, comments, profilePicture } = await getUserData(user);
        const userListsLength = await getUserListsLength();
        // set data of the user in react redux-------------------------------------------------------------------
        dispatch(
          userActions.setUser({
            userDoc: userData,
            userComments: comments,
            userListsLength,
            profilePicture,
          })
        );
      });
      navigation.navigate("home");
    } catch (error) {
      setError(true);
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
