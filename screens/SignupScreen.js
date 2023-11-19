import React from "react";
import { StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import AuthContentCard from "../components/UI/AuthContentCard";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

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
      console.log("auth", auth.currentUser.uid);
      const docRef = await setDoc(
        doc(FIREBASE_DB, "users", auth.currentUser.uid),
        {
          email: email,
          userName: name,
          favMovies: [],
          wishlistMovies: [],
        }
      );
      dispatch(authActions.login());
      navigation.navigate("all");
    } catch (error) {
      console.log(error);
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
