// Imports from react native
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Alert,
  Appearance,
} from "react-native";

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
  const colorScheme = Appearance.getColorScheme();
  const [firstload, setFirtsLoad] = useState(true);
  const [limits, setLimits] = useState({
    lifeQuality: 100,
    herritage: 10000000,
    debt: 10000000,
  });
  const animatedValues = {
    lifeQuality: useRef(new Animated.Value(0)).current,
    herritage: useRef(new Animated.Value(0)).current,
    debt: useRef(new Animated.Value(0)).current,
  };

  // Functions
  const calculateLifeQuality = (properties) => {
    let res = 0;
    for (let i = 0; i < properties.length; i++) {
      res += propertyWName(properties[i].name).stats[
        properties[i].isAnAsset ? "asset" : "commodity"
      ].lifeQuality;
    }
    return res > 0 ? res : 0;
  };

  const calculateHerritage = (ownedProperties, multipliers, debt) => {
    let res = 0;
    let tempPoperty;
    for (let i = 0; i < ownedProperties.length; i++) {
      tempPoperty = propertyWName(ownedProperties[i].name);
      if (
        tempPoperty.type === "cars" ||
        tempPoperty.type === "cash" ||
        tempPoperty.type === "crypto" ||
        tempPoperty.type === "realEstate" ||
        tempPoperty.type === "stocks"
      ) {
        res +=
          tempPoperty.value *
          multipliers[tempPoperty.type] *
          ownedProperties[i].ammount;
      } else {
        res += tempPoperty.value * ownedProperties[i].ammount;
      }
    }
    return res - debt;
  };

  const propertyWName = (name) => {
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].name === name) {
        return properties[i];
      }
    }
    return null;
  };

  const setIndicators = () => {
    currentGame = store.getState().currentGame;
    percentages = {
      lifeQuality:
        (calculateLifeQuality(currentGame.ownedProperties) /
          limits.lifeQuality) *
        100,
      herritage:
        (calculateHerritage(
          currentGame.ownedProperties,
          currentGame.multipliers,
          currentGame.debt
        ) /
          limits.herritage) *
        100,
      debt: (currentGame.debt / limits.debt) * 100,
    };
    if (percentages.herritage >= 100 || percentages.debt >= 100) {
      setLimits({
        lifeQuality: limits.lifeQuality,
        herritage: limits.herritage * 10,
        debt: limits.debt * 10,
      });
      percentages = {
        ...percentages,
        herritage: percentages.herritage * 0.1,
        debt: percentages.debt * 0.1,
      };
    }
    updateIndicators("lifeQuality", percentages.lifeQuality);
    updateIndicators("herritage", percentages.herritage);
    updateIndicators("debt", percentages.debt);
  };

  const updateIndicators = (indicator, value) => {
    value = value > 100 ? 100 : value;
    Animated.timing(animatedValues[indicator], {
      toValue:
        value > 0
          ? (Dimensions.get("screen").width * 0.95 - 40) * (value / 100)
          : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  // Animations on load
  let percentages;
  let currentGame;

  if (firstload) {
    setFirtsLoad(false);
    setTimeout(async () => {
      setIndicators();
    }, 300);

    store.subscribe(async () => {
      setIndicators();
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
