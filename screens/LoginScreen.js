import React from "react";
import AuthForm from "../components/AuthForm";
import AuthContentCard from "../components/UI/AuthContentCard";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { userActions } from "../store/user-data-slice";
import { getUserData, getUserListsLength } from "../util/firebase-services";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  async function loginHandler(email, password) {
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
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
      console.log("error in login page : ", error);
    }
  }
  return (
    <AuthContentCard>
      <AuthForm onPress={loginHandler} />
    </AuthContentCard>
  );
};

export default LoginScreen;
