import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
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
      // justifyContent: "center",
      backgroundColor: colors[colorScheme].background,
    },
    progressIndicator: {
      position: "relative",
      width: "100%",
    },
    properties: {
      position: "absolute",
      top: 0,
      width: "100%",
      marginTop: Dimensions.get("screen").height * 0.25,
    },
    text: {
      color: colors[colorScheme].fonts.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressIndicator}>
        <ProgressIndicator />
      </View>
      <View style={styles.properties}>
        <Properties />
      </View>
    </SafeAreaView>
  );
};
