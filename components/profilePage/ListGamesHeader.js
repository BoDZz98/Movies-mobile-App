import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native-animatable";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteList, editList } from "../../util/firebase-services";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-data-slice";

const ListGamesHeader = ({ listName }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [input, setInput] = useState({ value: listName, isValid: true });
  const [isFocused, setIsFocused] = useState(false);
  const [listExist, setListExist] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
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
    // checking whether the list name is changed or not --------
    if (input.value === listName) {
      setErrorMessage("Same Name");
      return;
    }

    const listNameValid = input.value.length != 0;
    /* setInput((currentValues) => {
      return {
        value: currentValues.value,
        isValid: listNameValid,
      };
    }); */
    if (!listNameValid) {
      setErrorMessage("list must have a name");
      return;
    } else {
      const bool = await editList(listName, input.value);
      if (bool === true) {
        setErrorMessage("List already exist");
      } else {
        /* setInput((currentVal) => {
          return { value: currentVal };
        }); */
        setErrorMessage("Edit successfully");
        inputRef.current.blur();
        setIsFocused(false);
      }
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
      <View style={styles.inputCont}>
        <TextInput
          ref={inputRef}
          style={styles.inputStyle}
          onChangeText={changeInputHandler}
          value={input.value}
          maxLength={15}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Text
          style={{
            color: errorMessage === "Edit successfully" ? "green" : "red",
            fontSize: 12,
          }}
        >
          {errorMessage}
        </Text>
      </View>
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
        <Ionicons
          name="trash"
          color="red"
          size={30}
          onPress={() => {
            deleteList(listName);
            dispatch(userActions.updateUserListsLength("dec"));
            navigation.goBack();
          }}
        />
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
  inputCont: {
    flexDirection: "column",
    width: "50%",
  },
  inputStyle: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    // width: "48%",
  },
  iconsCont: { flexDirection: "row", columnGap: 6 },
});
