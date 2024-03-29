import React, { useEffect, useState } from "react";
import ModalCard from "../UI/ModalCard";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Stars from "react-native-stars";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import MyButton from "../UI/MyButton";
import {
  addComment,
  baseImageURL,
  deleteComment,
  updateComment,
} from "../../util/firebase-services";
import Input from "../Input";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-data-slice";
import { useNavigation } from "@react-navigation/native";

const EditCommentModal = ({ isVisible, onClose, commentData }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Validation--------------------------------------------------------------------------------------------------
  const [stars, setStars] = useState(commentData.rating);
  const [input, setInput] = useState({});
  // when i press on diff comments the commentData will change, i want to run this file everytime commentData change,
  // so i used useEffect , without useEffect all the desc would be the same for all comments
  useEffect(() => {
    setStars(commentData.rating);
    setInput({
      value: commentData.desc,
      isValid: true,
    });
  }, [commentData]);
  // --------------------------------------------------------------------------------------------------------------------
  function changeInputHandler(enteredValue) {
    setInput({ value: enteredValue, isValid: true });
  }
  function submitHanlder() {
    const descIsValid = input.value.length !== 0;
    setInput((currentValues) => ({ ...currentValues, isValid: descIsValid }));
    if (descIsValid) {
      const comment = { desc: input.value, rating: stars };
      const commentId = commentData.commentId;
      updateComment(commentId, comment);
      dispatch(userActions.updateComment({ commentId, comment }));
      // navigation.navigate("Overview");
      // close the modal
      onClose();
    }
  } // Delete comment----------------------------------------------------------------------------------------------------
  function deleteHanlder() {
    deleteComment(commentData.commentId);
    dispatch(userActions.deleteComment(commentData.commentId));
    navigation.navigate("Overview");
  }
  return (
    <ModalCard
      isVisible={isVisible}
      onClose={onClose}
      modalStyle={styles.modalStyle}
    >
      <Text style={styles.title}>Edit Comment </Text>
      <View style={styles.outerCont}>
        <Image
          source={{ uri: baseImageURL + commentData.poster }}
          style={styles.movieImg}
          resizeMode="contain"
        />
        <View style={styles.innerCont}>
          <Text style={styles.movieName}>{commentData.title}</Text>
          <Stars
            default={commentData.rating}
            update={(val) => {
              setStars(val);
            }}
            spacing={4}
            count={5}
            fullStar={<Ionicons name="star" color="yellow" size={25} />}
            emptyStar={
              <Ionicons name="star-outline" color="yellow" size={25} />
            }
          />
        </View>
      </View>

      <Input
        textInputConfig={{
          multiline: true,
          value: input.value,
          onChangeText: changeInputHandler,
        }}
        label={!input.isValid ? "pls enter desc" : "Description"}
        labelStyle={[styles.label, !input.isValid && { color: "red" }]}
        customInputStyle={styles.descInput}
        descErrorStyle={!input.isValid && styles.descErrorStyle}
      />

      <View style={styles.buttonsCont}>
        <MyButton
          onPress={deleteHanlder}
          text="Delete"
          style={styles.deleteButton}
          textStyle={styles.buttonText}
        />
        <MyButton
          onPress={submitHanlder}
          text="Save"
          style={styles.saveButton}
          textStyle={styles.buttonText}
        />
      </View>
    </ModalCard>
  );
};

export default EditCommentModal;

const styles = StyleSheet.create({
  modalStyle: { height: Dimensions.get("window").height * 0.5 },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    width: "100%",
  },
  outerCont: {
    flexDirection: "row",
    marginTop: 6,
    width: "100%",
    alignItems: "center",
  },
  innerCont: {
    marginLeft: 10,
    alignItems: "flex-start",
  },
  movieImg: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.13,
    borderRadius: 12,
    marginVertical: 6,
  },
  movieName: {
    // backgroundColor: "white",
    textAlign: "left",
    width: "75%",
    marginVertical: 4,
    fontSize: 20,
  },
  descInput: {
    backgroundColor: "white",
    height: Dimensions.get("window").height * 0.1,
    borderRadius: 20,
    color: "black",
    textAlignVertical: "top",
    // borderWidth:2
  },
  label: {
    color: "black",
    fontSize: 16,
  },
  descErrorStyle: {
    backgroundColor: "pink",
  },
  buttonsCont: {
    flexDirection: "row",
    width: "100%",
    height: "20%",
    // marginTop: 10,
  },
  saveButton: {
    backgroundColor: Colors.blue,
    width: "50%",
    borderRadius: 0,
    borderBottomRightRadius: 50,
    // marginTop: "8%",
  },
  deleteButton: {
    backgroundColor: "red",
    width: "50%",
    borderRadius: 0,
    borderBottomLeftRadius: 50,
    // marginTop: "8%",
  },
  buttonText: {
    fontSize: 20,
    // fontWeight: "bold",
  },
});
