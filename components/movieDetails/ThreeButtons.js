import React, { useRef, useState } from "react";
import { Alert, Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import MyButton from "../UI/MyButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import AddMovieModal from "./AddMovieModal";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import { useSelector } from "react-redux";

const ThreeButtons = ({ movieData, onClickTrailer }) => {
  const navigation = useNavigation();
  const isAuth = useSelector((state) => state.auth.isAuth);

  // Modal logic here ----------------------------------------------------------------------------------------------------------
  const [modalVisible, setModalVisible] = useState(false);
  function CloseModalHandler() {
    setModalVisible(false);
  }
  // Trailer button ----------------------------------------------------------------------------------------------------------
  const [isClicked, setIsClicked] = useState(false);
  function trailerButtonHandnler() {
    setIsClicked((currentValue) => !currentValue);
    onClickTrailer();
  }

  return (
    <View style={styles.buttonsCont}>
      <MyButton
        text={isClicked ? "Close Trailer" : "Watch Trailer"}
        style={styles.trailerButton}
        onPress={trailerButtonHandnler}
      >
        <Ionicons
          name="play"
          color="white"
          size={15}
          style={{ marginHorizontal: 4 }}
        />
      </MyButton>
      <MyButton
        style={styles.buttonCont}
        onPress={() => {
          !isAuth && Alert.alert("Opps", "Tou must sign in first");
          setModalVisible(true);
        }}
      >
        <Ionicons name="push-outline" color="white" size={25} />
      </MyButton>
      {isAuth && (
        <AddMovieModal
          isVisible={modalVisible}
          onClose={CloseModalHandler}
          data={movieData}
        />
      )}
      <MyButton
        style={styles.buttonCont}
        onPress={() => {
          navigation.navigate("gameComments", {
            moviePoster: movieData.poster,
            movieName: movieData.title,
          });
        }}
      >
        <Ionicons name="chatbox-ellipses-outline" color="white" size={25} />
      </MyButton>
    </View>
  );
};

export default ThreeButtons;

const styles = StyleSheet.create({
  buttonsCont: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  trailerButton: {
    backgroundColor: Colors.green,
    width: "50%",
  },
  buttonCont: {
    width: "18%",
    borderWidth: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.8, // Adjust the width as needed
    height: Dimensions.get("window").height * 0.4, // Adjust the height as needed
    backgroundColor: "white",
    borderRadius: 50,
    padding: 16,
  },
});
