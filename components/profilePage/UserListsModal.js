import React, { useEffect, useState } from "react";
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
import { addList, setUserId } from "../../util/firebase-services";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";

const UserListsModal = ({ isVisible, onClose }) => {
  const [input, setInput] = useState({ value: "", isValid: true });
  const [listExist, setListExist] = useState(false);
  const [userLists, setUserLists] = useState([]);

  // Validation for input -----------------------------------------------------------------------
  function changeInputHandler(enteredValue) {
    setInput({ value: enteredValue, isValid: true });
  }
  async function addListHandler() {
    const listNameValid = input.value.length != 0;
    setInput((currentValues) => ({ ...currentValues, isValid: listNameValid }));
    if (input.isValid) {
      const bool = await addList(input.value);
      setListExist(bool);
      setInput({ value: "", isValid: true });
    }
  }

  // getting the user lists from firebase ---------------------------------------------------------------

  useEffect(() => {
    onSnapshot(
      query(collection(doc(FIREBASE_DB, "users", setUserId()), "lists")),
      (snapshot) => {
        snapshot.docs.map((doc) =>
          setUserLists(
            snapshot.docs.map((doc) => ({
              listName: doc.id,
              ...doc.data(),
            }))
          )
        );
      }
    );
  }, []);

  return (
    <ModalCard isVisible={isVisible} onClose={onClose}>
      <Text style={styles.title}>Your Lists </Text>

      <ScrollView
        style={styles.scrollViewCont}
        indicatorStyle="black"
        showsVerticalScrollIndicator={false}
      >
        {userLists.map((list) => {
          return (
            <Pressable style={styles.listCont} key={list.listName}>
              <View style={styles.textCont}>
                <Text style={styles.listName}>{list.listName}</Text>
                <Text style={styles.number}>Movies :{list.movies.length}</Text>
              </View>
              <Ionicons name="arrow-forward" color="black" size={30} />
            </Pressable>
          );
        })}

        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={changeInputHandler}
            value={input.value}
            placeholder={
              listExist ? "List name already exist" : "Enter List Name"
            }
            placeholderTextColor={!input.isValid && "red"}
          />
          <TouchableOpacity style={{ padding: 10 }} onPress={addListHandler}>
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
