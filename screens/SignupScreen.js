import React from "react";
import { StyleSheet, Text } from "react-native";
import AuthForm from "../components/AuthForm";
import AuthContentCard from "../components/UI/AuthContentCard";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { userActions } from "../store/user-data-slice";
import { getUserData, getUserListsLength } from "../util/firebase-services";
import { getUserReviews, signUp } from "../util/my-backend-services";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // const auth = FIREBASE_AUTH;

  async function signupHandler(email, password, name) {
    try {
      const response = await signUp(email, password, name);
      // If the user signed in successfully
      if (response.ok) {
        const data = await response.json();
        console.log(data.user);

        // dispatch(authActions.login());
        // const { profilePicture } = await getUserData(user);

        // const userListsLength = await getUserListsLength();
        dispatch(
          userActions.setUser({
            userDoc: data.user,
            userComments: comments,
            // userListsLength,
            profilePicture,
          })
        );

        // navigation.navigate("home");
      }
    } catch (error) {
      console.log("error in signup page : ", error);
    }
  }
  return (
    <AuthContentCard>
      {/* {error && <Text style={styles.error}>Invalid Credentials</Text>} */}
      <AuthForm
        signingUp={true}
        onPress={signupHandler}
        style={styles.formCont}
      />
    </AuthContentCard>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  formCont: {
    height: "60%",
  },
  error: {
    color: "red",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    // marginTop: 40,
    position: "absolute",
    // top: 10,
    zIndex: 1,
  },
});
