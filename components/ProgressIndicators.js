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
import { priceToStr } from "../config/formatter";
import { getData } from "../config/asyncStorage";
import properties from "../config/properties";

export default ProgressIndicator = () => {
  // Constants
  let colorScheme = useColorScheme();
  const [firstload, setFirtsLoad] = useState(true);

  const animatedValues = {
    lifeQuality: useRef(new Animated.Value(0)).current,
    herritage: useRef(new Animated.Value(0)).current,
    debt: useRef(new Animated.Value(0)).current,
  };

  const calculateLifeQuality = (properties) => {
    let res = 0;
    for (let i = 0; i < properties.length; i++) {
      res += propertyWName(properties[i].name).stats[
        properties[i].isAnAsset ? "asset" : "commodity"
      ].lifeQuality;
    }
    return res > 0 ? res : 0;
  };

  const calculateHerritage = (properties, multipliers) => {
    let res = 0;
    let tempPoperty;
    for (let i = 0; i < properties.length; i++) {
      tempPoperty = propertyWName(properties[i].name);
      if (
        tempPoperty.type === "cars" ||
        tempPoperty.type === "cash" ||
        tempPoperty.type === "crypto" ||
        tempPoperty.type === "realEstate" ||
        tempPoperty.type === "stocks"
      )
        res +=
          tempPoperty.value *
          multipliers[tempPoperty.type] *
          properties[i].ammount;
    }
    return res;
  };

  const propertyWName = (name) => {
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].name === name) {
        return properties[i];
      }
    }
    return null;
  };

  const limits = {
    lifeQuality: 100,
    herritage: 10000000,
    debt: 10000000,
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
    let currentGame = store.getState().currentGame;
    setTimeout(() => {
      updateIndicators(
        "lifeQuality",
        (calculateLifeQuality(currentGame.ownedProperties) /
          limits.lifeQuality) *
          100
      );
      updateIndicators(
        "herritage",
        (calculateHerritage(
          currentGame.ownedProperties,
          currentGame.multipliers
        ) /
          limits.herritage) *
          100
      );
      updateIndicators("debt", (currentGame.debt / limits.debt) * 100);
    }, 300);

    store.subscribe(() => {
      // if(newState.debt != )
    });
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
              <Text style={styles.progressText}>{`${priceToStr(
                limits.lifeQuality
              )}pts`}</Text>
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
              <Text style={styles.progressText}>{`$${priceToStr(
                limits.herritage
              )}`}</Text>
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
              <Text style={styles.progressText}>{`$${priceToStr(
                limits.debt
              )}`}</Text>
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
