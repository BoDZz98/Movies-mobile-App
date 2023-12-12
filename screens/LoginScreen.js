import React from "react";
import AuthForm from "../components/AuthForm";
import AuthContentCard from "../components/UI/AuthContentCard";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { userActions } from "../store/user-data-slice";
import { setUserId } from "../util/firebase-services";
import { doc, getDoc } from "firebase/firestore";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = FIREBASE_AUTH;

  async function loginHandler(email, password) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch(authActions.login());

      onAuthStateChanged(FIREBASE_AUTH, async (user) => {
        const docRef = doc(FIREBASE_DB, "users", user?.uid);
        const docSnap = await getDoc(docRef);
        dispatch(userActions.setUser(docSnap.data()));
        // setUserId();
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
