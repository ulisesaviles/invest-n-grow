import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native-appearance";
import colors from "../config/colors";
import { ProgressIndicator, Properties } from "../components";

export default Home = () => {
  let colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors[colorScheme].background,
    },
    text: {
      color: colors[colorScheme].fonts.primary,
    },
  });

  return (
    <View style={styles.container}>
      <ProgressIndicator />
      <Properties />
      <Text style={styles.text}>Invest n grow</Text>
    </View>
  );
};
