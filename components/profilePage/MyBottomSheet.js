import React, { useCallback, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../constants/styles";
import MyButton from "../UI/MyButton";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../Input";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const MyBottomSheet = ({ closeBottomSheetHandler, userName, sheetRef }) => {
  const [isFocused, setIsFocused] = useState(false);
  // Bottom Sheet logic ------------------------------------------------------------------------------------------
  // const sheetRef = useRef(null);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        opacity={1.2}
      />
    ),
    []
  );

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
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  }
  const inputStyle = styles.defaultInputCont;
  return (
    <BottomSheetModal
    
      ref={sheetRef}
      snapPoints={["50%"]}
      enablePanDownToClose
      backdropComponent={renderBackdrop} // VIP
      handleIndicatorStyle={{}} // style for the upper white part of the bottomSheet
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <LinearGradient colors={["white", Colors.gray500]} style={styles.root}>
          <Image
            style={styles.iconImage}
            resizeMode="cover"
            source={
              image ? { uri: image } : require("../../assets/imgs/logo2.png")
            }
          />

          <View style={{ flexDirection: "row", columnGap: 10 }}>
            <MyButton
              text="Camera"
              style={styles.cameraButton}
              textStyle={{ fontWeight: "normal", fontSize: 16 }}
              onPress={async () => {
                await pickImage(false);
              }}
            />
            <MyButton
              text="Gallery"
              style={styles.gallaryButton}
              textStyle={{ fontWeight: "normal", fontSize: 16 }}
              onPress={async () => {
                await pickImage(true);
              }}
            />
          </View>

          <View style={{ width: "70%" }}>
            <Input
              label="userName"
              textInputConfig={{
                value: userName,
                onFocus: () => setIsFocused(true),
                onBlur: () => setIsFocused(false),
              }}
            />
          </View>

          <View style={{ flexDirection: "row", columnGap: 30 }}>
            <Ionicons
              name={"close-outline"}
              color="red"
              size={50}
              onPress={closeBottomSheetHandler}
            />
            <Ionicons
              name={"checkmark-outline"}
              color={Colors.green}
              size={50}
              onPress={closeBottomSheetHandler}
            />
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </BottomSheetModal>
  );
};

export default MyBottomSheet;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: Colors.gray500,
    alignItems: "center",
  },
  iconImage: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    borderRadius: 3000,
    marginBottom: "3%",
  },

  cameraButton: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 7,
    borderRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  gallaryButton: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 7,
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
