import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ModalCard = ({ isVisible, onClose, children }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>{children}</View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalCard;
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
});
