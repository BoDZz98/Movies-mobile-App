import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { FIREBASE_DB, STORAGE } from "../../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { Colors } from "../../constants/styles";
import DefaultProfileImage from "../DefaultProfileImage";

const CommentUserData = ({ userId }) => {
  const [userData, setUserData] = useState({ userName: "", userPicture: "" });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const userRefDoc = doc(FIREBASE_DB, "users", userId);
      const userSnapDoc = await getDoc(userRefDoc);
      try {
        // Getting username -----------------------------

        // Getting profile Picture ----------------------
        const userImgRef = ref(STORAGE, `profileImages/${userId}`);
        const userPicture = await getDownloadURL(userImgRef);
        setUserData({
          userName: userSnapDoc.data().userName,
          userPicture,
        });
        setIsLoading(false);
      } catch (error) {
        setUserData({
          userName: userSnapDoc.data().userName,
        });
        console.log("error in CommentUserData : ", error);
      }
    }
    getData();
  }, []);

  return (
    <View style={styles.root}>
      {isLoading ? (
        <DefaultProfileImage />
      ) : (
        <Image
          source={{ uri: userData?.userPicture }}
          style={styles.profileImg}
        />
      )}
      <Text style={styles.userName}>{userData.userName}</Text>
    </View>
  );
};

export default CommentUserData;
const styles = StyleSheet.create({
  root: { alignItems: "center", width: "100%" },
  profileImg: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.1,
    borderRadius: 100,
  },
  userName: {
    width: "100%",
    textAlign: "center",
    // color: "white",
    borderBottomWidth: 1,
    marginVertical: 6,
    fontSize: 16,
  },
});
