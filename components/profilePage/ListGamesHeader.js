import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native-animatable";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { editList } from "../../util/firebase-services";

const ListGamesHeader = ({ listName }) => {
  const navigation = useNavigation();
  const inputRef = useRef(null);

  const [input, setInput] = useState({ value: listName, isValid: true });
  const [isFocused, setIsFocused] = useState(false);
  const [listExist, setListExist] = useState(false);

  function changeInputHandler(enteredValue) {
    setInput({ value: enteredValue, isValid: true });
  }

  function handleEditButton() {
    if (isFocused) {
      inputRef.current.blur(); // Unfocus the input
      setInput({ value: listName, isValid: true });
    } else {
      inputRef.current.focus(); // Focus the input
    }
    setIsFocused(!isFocused); // Toggle the focus state
  }

  async function editListHandler() {
    const listNameValid = input.value.length != 0;
    setInput((currentValues) => {
      return {
        value: currentValues.value,
        isValid: listNameValid,
      };
    });
    if (listNameValid) {
      const bool = await editList(listName, input.value);
      setListExist(bool);
    }
  }
  console.log("list exist :", listExist);
  return (
    <View style={styles.root}>
      <TouchableOpacity>
        <Ionicons
          name="arrow-back"
          onPress={() => navigation.goBack()}
          size={30}
          color="white"
        />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={styles.inputStyle}
        onChangeText={changeInputHandler}
        value={input.value}
        placeholderTextColor={!input.isValid && "red"}
        maxLength={15}
        // editable={isFocused ? true : false}
        placeholder={listExist ? "List name already exist" : "Enter List Name"}
      />
      <View style={styles.iconsCont}>
        {!isFocused && (
          <Ionicons
            name="pencil"
            color="white"
            size={30}
            onPress={handleEditButton}
          />
        )}
        {isFocused && (
          <Ionicons
            name="checkmark-outline"
            color="white"
            size={30}
            onPress={editListHandler}
          />
        )}
        {isFocused && (
          <Ionicons
            name="close-outline"
            color="white"
            size={30}
            onPress={handleEditButton}
          />
        )}
        <Ionicons name="trash" color="red" size={30} />
      </View>
    </View>
  );
};

export default ListGamesHeader;
const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: Colors.primary800,
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputStyle: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    width: "48%",
  },
  iconsCont: { flexDirection: "row", columnGap: 6 },
});
