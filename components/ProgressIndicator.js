import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native-appearance";

import colors from "../config/colors";

import { LinearGradient } from "expo-linear-gradient";

export default ProgressIndicator = () => {
  let colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    bar: {
      width: "100%",
      height: "100%",
      borderRadius: 7,
    },
    barContainer: {
      height: 13,
      width: "100%",
      borderRadius: 20,
      backgroundColor: colors[colorScheme].barBackground,
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
    },
    container: {
      backgroundColor: colors[colorScheme].containers,
      borderRadius: 20,
      width: "95%",
      paddingHorizontal: 20,
      paddingVertical: 10,
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
    },
    group: {
      marginVertical: 4,
    },
    text: {
      color: colors[colorScheme].fonts.primary,
    },
    textContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { fontWeight: "700" }]}>Life Quality</Text>
          <Text style={styles.text}>100pts</Text>
        </View>
        <View style={styles.barContainer}>
          <LinearGradient
            colors={[
              colors[colorScheme].gradients.blue.start,
              colors[colorScheme].gradients.blue.end,
            ]}
            style={[styles.bar, { width: "80%" }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
      </View>
      <View style={styles.group}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { fontWeight: "700" }]}>Herritage</Text>
          <Text style={styles.text}>$10M</Text>
        </View>
        <View style={styles.barContainer}>
          <LinearGradient
            colors={[
              colors[colorScheme].gradients.green.start,
              colors[colorScheme].gradients.green.end,
            ]}
            style={[styles.bar, { width: "50%" }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
      </View>
      <View style={styles.group}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { fontWeight: "700" }]}>Debt</Text>
          <Text style={styles.text}>$10M</Text>
        </View>
        <View style={styles.barContainer}>
          <LinearGradient
            colors={[
              colors[colorScheme].gradients.red.start,
              colors[colorScheme].gradients.red.end,
            ]}
            style={[styles.bar, { width: "70%" }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
      </View>
    </View>
  );
};
