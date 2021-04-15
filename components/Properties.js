import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useColorScheme } from "react-native-appearance";

import colors from "../config/colors";

import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default Properties = () => {
  let colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    btnGradient: {
      borderRadius: 10,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      //height: "45%",
      height: Dimensions.get("screen").height * 0.43,
    },
    containerContent: {
      width: "70%",
      height: "100%",
      borderRadius: 20,
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
      backgroundColor: colors[colorScheme].containers,
      padding: 20,
    },
    containerHorizontal: {
      flexDirection: "row",
      alignItems: "center",
    },
    containerSection2: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
    content: {
      color: colors[colorScheme].fonts.secondary,
      // fontSize: 16,
    },
    img: {
      width: "100%",
      height: (Dimensions.get("screen").width * 0.7 - 40) * 0.8,
      resizeMode: "cover",
    },
    propertyTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 10,
    },
    sell: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.dark.fonts.primary,
    },
    sellBtn: {
      position: "absolute",
      right: 0,
      width: "30%",
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
    },
    separator: {
      width: "100%",
      height: 1,
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
      backgroundColor: colors[colorScheme].separator,
      marginVertical: 10,
    },
    subtitle: {
      fontWeight: "600",
      marginRight: 5,
      // fontSize: 16,
    },
    text: {
      color: colors[colorScheme].fonts.primary,
      textAlign: "center",
      margin: 0,
    },
    textContainer: {
      width: "60%",
    },
    textRow: {
      flexDirection: "row",
      marginBottom: 5,
    },
    title: {
      fontSize: 25,
      fontWeight: "600",
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>Properties</Text>
      <View style={styles.containerHorizontal}>
        <TouchableOpacity>
          <Entypo
            name="chevron-small-left"
            size={60}
            color={colors[colorScheme].arrow}
          />
        </TouchableOpacity>
        <View style={styles.containerContent}>
          <ScrollView style={{ width: "100%", height: "100%" }}>
            <Text style={[styles.text, styles.propertyTitle]}>
              Beach Mansion
            </Text>
            <Image
              style={styles.img}
              source={{
                uri:
                  "https://raw.githubusercontent.com/ulisesaviles/invest-n-grow/master/assets/img/rich%20house.png",
              }}
            />
            <View style={styles.separator} />
            <View style={styles.containerSection2}>
              <View style={styles.textContainer}>
                <View style={styles.textRow}>
                  <Text style={[styles.text, styles.subtitle]}>You paid:</Text>
                  <Text style={[styles.text, styles.content]}>$1.8M</Text>
                </View>
                <View style={styles.textRow}>
                  <Text style={[styles.text, styles.subtitle]}>
                    Current value:
                  </Text>
                  <Text style={[styles.text, styles.content]}>$1.6M</Text>
                </View>
                <View style={styles.textRow}>
                  <Text style={[styles.text, styles.subtitle]}>
                    Life quality:
                  </Text>
                  <Text style={[styles.text, styles.content]}>+20pts</Text>
                </View>
                <View style={styles.textRow}>
                  <Text style={[styles.text, styles.subtitle]}>Cash flow:</Text>
                  <Text style={[styles.text, styles.content]}>-$2k</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.sellBtn}>
                <LinearGradient
                  colors={[
                    colors[colorScheme].gradients.green.start,
                    colors[colorScheme].gradients.green.end,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.btnGradient}
                >
                  <Text style={styles.sell}>Sell</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity>
          <Entypo
            name="chevron-small-right"
            size={60}
            color={colors[colorScheme].arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
