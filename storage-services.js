import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { setUserId } from "./util/firebase-services";
import { STORAGE } from "./firebaseConfig";

const options = (ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
});

export async function pickImage(useLibrary) {
  let result;
  if (useLibrary) {
    result = await ImagePicker.launchImageLibraryAsync(options);
  } else {
    await ImagePicker.requestCameraPermissionsAsync();
    result = await ImagePicker.launchCameraAsync(options);
  }
  if (!result.canceled) {
    return result.assets[0].uri;
  }
}

export async function uploadImage(image) {
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

    const imgRef = ref(STORAGE, `profileImages/${setUserId()}`);
    await uploadBytes(imgRef, blob);
  } catch (error) {
    console.log("error in storage services", error);
  }
}
