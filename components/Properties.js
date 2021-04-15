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

export default Properties = () => {
  let colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      // backgroundColor: colors[colorScheme].containers,
      height: "45%",
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
    text: {
      color: colors[colorScheme].fonts.primary,
      textAlign: "center",
      margin: 0,
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
