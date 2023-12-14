import React, { useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import MyButton from "../UI/MyButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import AddMovieModal from "./AddMovieModal";
import { useNavigation } from "@react-navigation/native";

const ThreeButtons = ({ movieData }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  function CloseModalHandler() {
    setModalVisible(false);
  }
  return (
    <View style={styles.buttonsCont}>
      <MyButton text="Watch Trailer" style={styles.trailerButton}>
        <Ionicons
          name="play"
          color="white"
          size={15}
          style={{ marginHorizontal: 4 }}
        />
      </MyButton>
      <MyButton style={styles.buttonCont} onPress={() => setModalVisible(true)}>
        <Ionicons name="open" color="white" size={20} />
      </MyButton>
      <AddMovieModal
        isVisible={modalVisible}
        onClose={CloseModalHandler}
        data={movieData}
      />
      <MyButton
        style={styles.buttonCont}
        onPress={() => {
          navigation.navigate("gameComments", {
            moviePoster: movieData.poster,
            movieName: movieData.title,
          });
        }}
      >
        <Ionicons name="share-social" color="white" size={20} />
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
