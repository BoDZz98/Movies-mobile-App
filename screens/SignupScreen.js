import React from "react";
import { StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import AuthContentCard from "../components/UI/AuthContentCard";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { userActions } from "../store/user-data-slice";
import { getUserData, getUserListsLength } from "../util/firebase-services";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = FIREBASE_AUTH;

  async function signupHandler(email, password, name) {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("auth", auth.currentUser?.uid);
      // set doc in the firbase
      const docRef = await setDoc(
        doc(FIREBASE_DB, "users", auth.currentUser?.uid),
        {
          email: email,
          userName: name,
          favMovies: [],
          wishlistMovies: [],
        }
      );
      dispatch(authActions.login());

      onAuthStateChanged(FIREBASE_AUTH, async (user) => {
        // save the user data in our user data slice using react redux----
        const { userData, comments, profilePicture } = await getUserData(user);
        const userListsLength = await getUserListsLength();
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
      console.log("error in signup page : ", error);
    }
  }
  return (
    <AuthContentCard>
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
});
