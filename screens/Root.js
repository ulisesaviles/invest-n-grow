import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native-appearance";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

export default Root = () => {
  const navigation = useNavigation();
  let colorScheme = useColorScheme();

  useEffect(() => {
    navigation.navigate("home");
  });

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
      <Text style={styles.text}>Root</Text>
    </View>
  );
};
