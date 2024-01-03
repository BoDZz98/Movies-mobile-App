import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { FIREBASE_AUTH, STORAGE } from "../../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ref, uploadBytes } from "firebase/storage";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MyButton from "../UI/MyButton";

const ProfilePageHeader = ({ onClickHandler }) => {
  const dispatch = useDispatch();

  //  logout -----------------------------------------------------------------------------------------------------------------------
  function logoutHandler() {
    dispatch(authActions.logout());
    FIREBASE_AUTH.signOut();
  }
  // Camera ---------------------------------------------------------------------------------------------------------------
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState();
  const options = (ImagePicker.ImagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  async function pickImage(useLibrary) {
    let result;
    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function uploadImage() {
    try {
      const { uri } = await FileSystem.getInfoAsync(image);

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          console.log("error", e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const fileName = image.substring(image.lastIndexOf("/") + 1);
      // console.log("in heere", fileName);

      const imgRef = ref(STORAGE, fileName);

      uploadBytes(imgRef, blob).then(() => {
        alert("Imagen subida correctamente");
      });
      setUploading(false);
      setImage(null);
    } catch (error) {}
  }
  // Bottom Sheet ------------------------------------------------------------------------------------------------------------

  return (
    <Pressable style={styles.root} onPress={() => onClickHandler()}>
      <View style={styles.container}>
        <Text style={styles.text}>Profile</Text>
        <Ionicons
          name={"log-out"}
          color="white"
          size={40}
          onPress={logoutHandler}
        />
      </View>
      <View style={styles.userCard}>
        <Image
          style={styles.iconImage}
          resizeMode="cover"
          source={
            image ? { uri: image } : require("../../assets/imgs/logo2.png")
          }
        />
        <View style={styles.buttonsCont}>
          {/* <MyButton
            text="Upload"
            style={styles.button}
            textStyle={{ fontWeight: "normal" ,fontSize:12 }}
            onPress={async () => {
              await pickImage(false), uploadImage();
            }}
          /> */}
        </View>
        <Text>Abdelrahman Elsiefy</Text>
      </View>
    </Pressable>
  );
};

export default ProfilePageHeader;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.primary800,
    alignItems: "center",
  },
  container: {
    height: 300,
    width: "100%",
    backgroundColor: Colors.gray500,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 50,
    position: "absolute",
    zIndex: 0,
    top: -70,
  },
  text: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  userCard: {
    backgroundColor: "white",
    position: "absolute",
    top: 120,
    height: 150,
    width: "80%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    zIndex: 1,
  },

  iconImage: {
    width: "30%",
    height: "65%",
    borderRadius: 3000,
    marginBottom: 4,
  },
  button: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 2,
    borderRadius: 10,
  },
  buttonsCont: {
    flexDirection: "row",
  },
});
