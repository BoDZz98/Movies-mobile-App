import React from "react";
import ModalCard from "../UI/ModalCard";
import { Dimensions, Image, ScrollView, StyleSheet, Text } from "react-native";
import Stars from "react-native-stars";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

const CommentDetailsModal = ({ isVisible, onClose, commentDetails }) => {
  return (
    <ModalCard isVisible={isVisible} onClose={onClose}>
      <Text style={styles.title}>Comment Details</Text>
      <Image
        source={{ uri: commentDetails.profilePicture }}
        style={styles.profileImg}
      />
      <Text style={styles.userName}>{commentDetails.userName}</Text>
      <Stars
        display={commentDetails.rating}
        spacing={6}
        count={5}
        fullStar={<Ionicons name="star" color="yellow" size={20} />}
        emptyStar={<Ionicons name="star-outline" color="yellow" size={20} />}
      />
      <ScrollView style={styles.descCont}>
        <Text style={styles.descText}>{commentDetails.desc}</Text>
      </ScrollView>
    </ModalCard>
  );
};

export default CommentDetailsModal;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 1,
    width: "100%",
  },
  profileImg: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.1,
    borderRadius: 100,
    marginVertical: 6,
  },
  userName: {
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
  descText: {
    // color: "white",
  },
});
