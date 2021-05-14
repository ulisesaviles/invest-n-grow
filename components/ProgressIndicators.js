// Imports from react native
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import { useColorScheme } from "react-native-appearance";

// Redux
import store from "../config/redux/store";

// imports from expo
import { LinearGradient } from "expo-linear-gradient";

// Local imports
import colors from "../config/colors";

export default ProgressIndicator = () => {
  // Constants
  let colorScheme = useColorScheme();
  const [firstload, setFirtsLoad] = useState(true);

  const animatedValues = {
    lifeQuality: useRef(new Animated.Value(0)).current,
    herritage: useRef(new Animated.Value(0)).current,
    debt: useRef(new Animated.Value(0)).current,
  };

  // Functions
  const updateIndicators = (indicator, value) => {
    Animated.timing(animatedValues[indicator], {
      toValue: (Dimensions.get("screen").width * 0.95 - 40) * (value / 100),
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  // Animations on load
  if (firstload) {
    setFirtsLoad(false);
    setTimeout(() => {
      updateIndicators("lifeQuality", 80);
      updateIndicators("herritage", 50);
      updateIndicators("debt", 70);
    }, 300);
  }

  // Render
  const render = () => {
    return (
      <View style={styles.progressIndicator}>
        <View style={styles.progressContainer}>
          <View style={styles.progressGroup}>
            <View style={styles.progressTextContainer}>
              <Text style={[styles.progressText, { fontWeight: "700" }]}>
                Life Quality
              </Text>
              <Text style={styles.progressText}>100pts</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <Animated.View
                style={{
                  width: animatedValues.lifeQuality,
                }}
              >
                <LinearGradient
                  colors={[
                    colors[colorScheme].gradients.blue.start,
                    colors[colorScheme].gradients.blue.end,
                  ]}
                  style={[styles.progressBar, { width: "100%" }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              </Animated.View>
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
              <Animated.View
                style={{
                  width: animatedValues.herritage,
                }}
              >
                <LinearGradient
                  colors={[
                    colors[colorScheme].gradients.green.start,
                    colors[colorScheme].gradients.green.end,
                  ]}
                  style={[styles.progressBar, { width: "100%" }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              </Animated.View>
            </View>
          </View>
          <View style={styles.progressGroup}>
            <View style={styles.progressTextContainer}>
              <Text style={[styles.progressText, { fontWeight: "700" }]}>
                Debt
              </Text>
              <Text style={styles.progressText}>$10M</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <Animated.View
                style={{
                  width: animatedValues.debt,
                }}
              >
                <LinearGradient
                  colors={[
                    colors[colorScheme].gradients.red.start,
                    colors[colorScheme].gradients.red.end,
                  ]}
                  style={[styles.progressBar, { width: "100%" }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Styles
  const styles = StyleSheet.create({
    progressIndicator: {
      position: "relative",
      width: "100%",
      alignItems: "center",
    },
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
    text: {
      color: colors[colorScheme].fonts.primary,
    },
  });

  return render();
};
