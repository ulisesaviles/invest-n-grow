import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native-appearance";

import colors from "../config/colors";

import { LinearGradient } from "expo-linear-gradient";

export default Event = (props) => {
  let colorScheme = useColorScheme();
  const currentEvent = props.event;

  const styles = StyleSheet.create({
    eventContainer: {
      width: "90%",
      backgroundColor: colors[colorScheme].subContainers,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
    },
    eventDescription: {
      fontSize: 16,
      textAlign: "justify",
    },
    eventTitle: {
      fontSize: 22,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 10,
    },
    multiplier: {
      fontSize: 16,
    },
    multiplierCategory: {
      fontWeight: "600",
      fontSize: 16,
      marginRight: 10,
    },
    multiplierContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    multipliersContainer: {
      borderRadius: 10,
      padding: 15,
      marginVertical: 20,
      borderRadius: 10,
    },
    multipliersTitle: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 5,
    },
    shadow: {
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
    },
    text: {
      color: colors[colorScheme].fonts.primary,
      textAlign: "center",
      margin: 0,
    },
  });

  return (
    <View style={styles.eventContainer}>
      <Text style={[styles.text, styles.eventTitle]}>{currentEvent.title}</Text>
      <Text style={[styles.text, styles.eventDescription]}>
        {currentEvent.description}
      </Text>
      <View style={styles.shadow}>
        <LinearGradient
          colors={[
            colors[colorScheme].gradients.orange.start,
            colors[colorScheme].gradients.orange.end,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.multipliersContainer}
        >
          <Text
            style={[
              { color: colors.dark.fonts.primary },
              styles.multipliersTitle,
            ]}
          >
            Multipliers
          </Text>
          <View style={styles.multiplierContainer}>
            <Text
              style={[
                { color: colors.dark.fonts.primary },
                styles.multiplierCategory,
              ]}
            >
              Crypto:
            </Text>
            <Text
              style={[{ color: colors.dark.fonts.primary }, styles.multiplier]}
            >
              {`${currentEvent.multiplier.crypto}`}
            </Text>
          </View>
          <View style={styles.multiplierContainer}>
            <Text
              style={[
                { color: colors.dark.fonts.primary },
                styles.multiplierCategory,
              ]}
            >
              Real Estate:
            </Text>
            <Text
              style={[{ color: colors.dark.fonts.primary }, styles.multiplier]}
            >
              {`${currentEvent.multiplier.realEstate}`}
            </Text>
          </View>
          <View style={styles.multiplierContainer}>
            <Text
              style={[
                { color: colors.dark.fonts.primary },
                styles.multiplierCategory,
              ]}
            >
              Stock Market:
            </Text>
            <Text
              style={[{ color: colors.dark.fonts.primary }, styles.multiplier]}
            >
              {`${currentEvent.multiplier.stocks}`}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};