import React, { useCallback, useEffect, useState } from "react";
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
import { pickImage, uploadImage } from "../../storage-services";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-data-slice";
import { useNavigation } from "@react-navigation/native";
import { updateUserName } from "../../util/firebase-services";

const MyBottomSheet = ({ closeBottomSheetHandler, sheetRef }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userName = useSelector((state) => state.user.userData.userName);
  const profilePicture = useSelector(
    (state) => state.user.userData.profilePicture
  );
  const noProfilePicture = profilePicture?.length === 0;

  const [image, setImage] = useState(profilePicture);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({});
  useEffect(() => {
    setUserInput({
      value: userName,
      isValid: true,
    });
  }, [userName]);

  // Bottom Sheet logic ------------------------------------------------------------------------------------------
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

  // Validation----------------------------------------------------------------------------------
  function userInputHandler(enteredValue) {
    setUserInput({ value: enteredValue, isValid: true });
  }
  async function submitHandler() {
    try {
      const nameIsValid = userInput.value.length !== 0;
      setUserInput((currentValues) => ({
        ...currentValues,
        isValid: nameIsValid,
      }));

      if (!nameIsValid) return;
      setIsLoading(true);
      dispatch(userActions.updateUserName(userInput.value));
      updateUserName(userInput.value);
      await uploadImage(image);
      dispatch(userActions.updateprofilePicture(image));
      setIsLoading(false);
      navigation.navigate("profile");
      closeBottomSheetHandler();
    } catch (error) {
      closeBottomSheetHandler();
    }
  }
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
          {noProfilePicture && !image && (
            <Image
              style={styles.iconImage}
              resizeMode="cover"
              source={require("../../assets/imgs/logo2.png")}
            />
          )}

          <Image
            style={styles.iconImage}
            resizeMode="cover"
            source={{ uri: image ? image : profilePicture }}
          />

          <View style={{ flexDirection: "row", columnGap: 10 }}>
            <MyButton
              text="Camera"
              style={styles.cameraButton}
              textStyle={{ fontWeight: "normal", fontSize: 16 }}
              onPress={async () => {
                const url = await pickImage(false);
                setImage(url);
              }}
            />
            <MyButton
              text="Gallery"
              style={styles.gallaryButton}
              textStyle={{ fontWeight: "normal", fontSize: 16 }}
              onPress={async () => {
                const url = await pickImage(true);
                setImage(url);
              }}
            />
          </View>

          <View style={{ width: "70%" }}>
            <Input
              label="userName"
              textInputConfig={{
                value: userInput.value,
                onChangeText: userInputHandler,
              }}
            />
          </View>

          {isLoading ? (
            <Text style={styles.loadingText}>Saving...</Text>
          ) : (
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
                onPress={() => submitHandler()}
              />
            </View>
          )}
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
  loadingText: { color: Colors.green, fontWeight: "bold", fontSize: 22 },
});
