import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useColorScheme } from "react-native-appearance";

import { LinearGradient } from "expo-linear-gradient";

import colors from "../config/colors";
import { ProgressIndicator, Properties } from "../components";

export default Home = () => {
  let colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    btnsContainer: {
      width: "100%",
      flexDirection: "row",
    },
    btnGradient: {
      borderRadius: 10,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    btnTxt: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.dark.fonts.primary,
    },
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
      alignItems: "center",
    },
    properties: {
      position: "absolute",
      top: 0,
      width: "100%",
      marginTop: Dimensions.get("screen").height * 0.25,
      flexDirection: "column",
    },
    storeBtn: {
      position: "absolute",
      right: Dimensions.get("screen").width * 0.025,
      top: 60,
      width: "30%",
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
    },
    sucesosBtn: {
      position: "absolute",
      left: Dimensions.get("screen").width * 0.025,
      top: 60,
      width: "30%",
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
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
        <View style={styles.btnsContainer}>
          <TouchableOpacity style={styles.sucesosBtn}>
            <LinearGradient
              colors={[
                colors[colorScheme].gradients.orange.start,
                colors[colorScheme].gradients.orange.end,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btnGradient}
            >
              <Text style={styles.btnTxt}>Sucesos</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.storeBtn}>
            <LinearGradient
              colors={[
                colors[colorScheme].gradients.yellow.start,
                colors[colorScheme].gradients.yellow.end,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btnGradient}
            >
              <Text style={styles.btnTxt}>Store</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
