import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

const CategoryCont = ({ categoryName }) => {
  return (
    <View style={styles.categoryCont}>
      <Text style={styles.text}>{categoryName}</Text>
    </View>
  );
};

export default CategoryCont;
const styles = StyleSheet.create({
  categoryCont: {
    
    backgroundColor: Colors.blue,
    padding: 4,
    marginHorizontal: 4,
    borderRadius: 10,
  },
});
