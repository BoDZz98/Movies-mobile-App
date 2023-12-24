import React from "react";
import ModalCard from "../UI/ModalCard";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "../Input";
import MyButton from "../UI/MyButton";

const UserListsModal = ({ isVisible, onClose }) => {
  return (
    <ModalCard isVisible={isVisible} onClose={onClose}>
      <Text style={styles.title}>Your Lists </Text>

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
          <Ionicons name="arrow-forward" color="black" size={30} />
        </Pressable>
        <Pressable style={styles.listCont}>
          <View style={styles.textCont}>
            <Text style={styles.listName}>List Name</Text>
            <Text style={styles.number}>Movies : 3</Text>
          </View>
          <Ionicons name="arrow-forward" color="black" size={30} />
        </Pressable>

        <View style={{ flexDirection: "row" }}>
          <TextInput style={styles.inputStyle} placeholder="Enter List Name" />
          <TouchableOpacity
            style={{ padding: 10 }}
            // onPress={handleButtonClick}
          >
            <Text style={{ color: "black" }}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ModalCard>
  );
};

export default UserListsModal;
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    width: "100%",
  },

  subTitle: { textAlign: "left", width: "100%" },
  scrollViewCont: { marginTop: 5, width: "100%" },
  listCont: {
    marginVertical: 5,
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

  inputStyle: {
    flex: 1,
    padding: 5,
    borderBottomWidth: 1,
  },
});
