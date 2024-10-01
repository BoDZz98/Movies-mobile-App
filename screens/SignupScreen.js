import React from "react";
import { StyleSheet, Text } from "react-native";
import AuthForm from "../components/AuthForm";
import AuthContentCard from "../components/UI/AuthContentCard";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-data-slice";
import { signUp } from "../util/my-backend-services";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // const auth = FIREBASE_AUTH;

  async function signupHandler(email, password, name) {
    try {
      const response = await signUp(email, password, name);
      // If the user signed in successfully
      if (response.ok) {
        const data = await response.json();
        dispatch(authActions.login());
        dispatch(
          userActions.setUser({
            userDoc: data.user,
            profilePicture: defProfilePicture,
            userComments: [],
          })
        );

        navigation.navigate("home");
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

const defProfilePicture =
  "https://firebasestorage.googleapis.com/v0/b/movies-imdp.appspot.com/o/defaultPP.png?alt=media&token=b2846ee3-12ba-47c6-864b-1e015dfbe41a";
