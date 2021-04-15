import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native-appearance";
import colors from "../config/colors";

export default ProgressIndicator = () => {
  let colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors[colorScheme].containers,
    },
    text: {
      color: colors[colorScheme].fonts.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Progress</Text>
    </View>
  );
};
