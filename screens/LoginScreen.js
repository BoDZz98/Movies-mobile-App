import React from "react";
import AuthForm from "../components/AuthForm";
import AuthContentCard from "../components/UI/AuthContentCard";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = FIREBASE_AUTH;

  async function loginHandler(email, password) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch(authActions.login());
      navigation.navigate("all");
    } catch (error) {
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
