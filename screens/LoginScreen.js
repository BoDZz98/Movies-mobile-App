import React from "react";
import AuthForm from "../components/AuthForm";
import AuthContentCard from "../components/UI/AuthContentCard";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { userActions } from "../store/user-data-slice";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

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
        // getting the data in the user doc-------------------------------------------------------------------------------
        const userRefDoc = doc(FIREBASE_DB, "users", user?.uid);
        const userSnapDoc = await getDoc(userRefDoc);

        // getting comments of this particular user--------------------------------------------------------------
        const comments = [];
        const userComments = query(
          collection(FIREBASE_DB, "comments"),
          where("userId", "==", user.uid)
        );
        const userCommentsSnapshot = await getDocs(userComments);
        userCommentsSnapshot.forEach((doc) => {
          // Each doc is a comment
          comments.push({ commentId: doc.id, ...doc.data() });
        });
        // set data of the user-------------------------------------------------------------------
        dispatch(
          userActions.setUser({
            userDoc: userSnapDoc.data(),
            userComments: comments,
          })
        );
      });
      navigation.navigate("all");
    } catch (error) {
      console.log("error in login page");
      console.log(error);
    }
  }
  return (
    <AuthContentCard>
      <AuthForm onPress={loginHandler} />
    </AuthContentCard>
  );
};

export default LoginScreen;
