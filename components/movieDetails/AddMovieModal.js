import React from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyButton from "../UI/MyButton";
import { Colors } from "../../constants/styles";

const AddMovieModal = ({ isVisible, onClose }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.title}>ADD MOVIE</Text>
            <View style={styles.buttonsCont}>
              <MyButton style={styles.buttonCont}>
                <Ionicons name="heart" color="white" size={20} />
              </MyButton>
              <MyButton style={styles.buttonCont}>
                <Ionicons name="book-outline" color="white" size={20} />
              </MyButton>
            </View>
            <Text style={styles.subTitle}>Your Lists :</Text>
            <ScrollView
              style={styles.scrollViewCont}
              indicatorStyle="black"
              showsVerticalScrollIndicator={false}
            >
              <Pressable style={styles.listCont}>
                <View style={styles.textCont}>
                  <Text style={styles.listName}>List Name</Text>
                  <Text style={styles.number}>Movies : 3</Text>
                </View>
                <Ionicons name="add-circle-outline" color="black" size={30} />
              </Pressable>
              <Pressable style={styles.listCont}>
                <View style={styles.textCont}>
                  <Text style={styles.listName}>List Name</Text>
                  <Text style={styles.number}>Movies : 3</Text>
                </View>
                <Ionicons name="add-circle-outline" color="black" size={30} />
              </Pressable>
              <Pressable style={styles.listCont}>
                <View style={styles.textCont}>
                  <Text style={styles.listName}>List Name</Text>
                  <Text style={styles.number}>Movies : 3</Text>
                </View>
                <Ionicons name="add-circle-outline" color="black" size={30} />
              </Pressable>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddMovieModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.8, // Adjust the width as needed
    height: Dimensions.get("window").height * 0.4, // Adjust the height as needed
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 26,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    width: "100%",
  },
  buttonsCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 12,
  },
  buttonCont: {
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 1,
  },
  subTitle: { textAlign: "left", width: "100%" },
  scrollViewCont: { marginTop: 3, width: "100%" },
  listCont: {
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
  },
  textCont: { flexDirection: "column" },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  number: { fontSize: 12 },
});
