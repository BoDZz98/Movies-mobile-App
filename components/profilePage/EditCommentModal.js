import React, { useState } from "react";
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

const EditCommentModal = ({ isVisible, onClose, commentDetails }) => {
  const [start, setStars] = useState();

  return (
    <ModalCard isVisible={isVisible} onClose={onClose}>
      <Text style={styles.title}>Edit Comment </Text>
      <View style={styles.outerCont}>
        <Image
          source={commentDetails.photo}
          style={styles.movieImg}
          resizeMode="contain"
        />
        <View style={styles.innerCont}>
          <Text style={styles.movieName}>{commentDetails.name}</Text>
          <Stars
            default={1}
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

      <ScrollView style={styles.descCont}>
        <Text style={styles.descText}>wow</Text>
      </ScrollView>
      <View style={styles.buttonsCont}>
        <MyButton
          //   onPress={submitHanlder}
          text="Delete"
          style={styles.deleteButton}
          textStyle={styles.buttonText}
        />
        <MyButton
          //   onPress={submitHanlder}
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
  },
  innerCont: {
    marginLeft: 6,
    justifyContent: "center",
  },
  movieImg: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.13,
    borderRadius: 12,
    marginVertical: 6,
  },
  movieName: {
    // color: "white",
    marginVertical: 4,
    fontSize: 20,
  },
  descCont: {
    backgroundColor: "white",
    width: "100%",
    marginTop: 8,
    borderRadius: 20,
    padding: 8,
  },
  buttonsCont: {
    flexDirection: "row",
    width: "100%",
    height: "20%",
    marginTop: 10,
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
