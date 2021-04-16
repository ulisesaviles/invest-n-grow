import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { useColorScheme } from "react-native-appearance";

import colors from "../config/colors";

import { LinearGradient } from "expo-linear-gradient";

export default ProgressIndicator = (props) => {
  let colorScheme = useColorScheme();
  const animatedValues = {
    lifeQuality: useRef(new Animated.Value(0)).current,
    herritage: useRef(new Animated.Value(0)).current,
    debt: useRef(new Animated.Value(0)).current,
  };

  const styles = StyleSheet.create({
    progressBar: {
      width: "100%",
      height: "100%",
      borderRadius: 7,
    },
    progressBarContainer: {
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
    progressContainer: {
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
    progressGroup: {
      marginVertical: 4,
    },
    progressText: {
      color: colors[colorScheme].fonts.primary,
    },
    progressTextContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
  });

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressGroup}>
        <View style={styles.progressTextContainer}>
          <Text style={[styles.progressText, { fontWeight: "700" }]}>
            Life Quality
          </Text>
          <Text style={styles.progressText}>100pts</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <LinearGradient
            colors={[
              colors[colorScheme].gradients.blue.start,
              colors[colorScheme].gradients.blue.end,
            ]}
            style={[styles.progressBar, { width: "80%" }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
      </View>
      <View style={styles.progressGroup}>
        <View style={styles.progressTextContainer}>
          <Text style={[styles.progressText, { fontWeight: "700" }]}>
            Herritage
          </Text>
          <Text style={styles.progressText}>$10M</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <LinearGradient
            colors={[
              colors[colorScheme].gradients.green.start,
              colors[colorScheme].gradients.green.end,
            ]}
            style={[styles.progressBar, { width: "50%" }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
      </View>
      <View style={styles.progressGroup}>
        <View style={styles.progressTextContainer}>
          <Text style={[styles.progressText, { fontWeight: "700" }]}>Debt</Text>
          <Text style={styles.progressText}>$10M</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <LinearGradient
            colors={[
              colors[colorScheme].gradients.red.start,
              colors[colorScheme].gradients.red.end,
            ]}
            style={[styles.progressBar, { width: "70%" }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
      </View>
    </View>
  );
};
