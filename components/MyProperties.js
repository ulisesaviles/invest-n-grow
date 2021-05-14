// Imports from react native
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useColorScheme } from "react-native-appearance";

// Redux
import store from "../config/redux/store";

// Local imports
import colors from "../config/colors";

// Assets
import Bill from "../assets/img/bill-icon.png";
import Bitcoin from "../assets/img/bitcoin-icon.png";
import Briefcase from "../assets/img/briefcase-icon.png";

export default MyProperties = () => {
  // Constants
  let colorScheme = useColorScheme();
  const [selectedTab, setSelectedTab] = useState("assets");

  // Functions

  // Animations on load

  // Render
  const render = () => {
    return (
      <View style={styles.thirdSectionContainer}>
        <View style={styles.windowsContainer}>
          <TouchableOpacity
            style={[
              {
                backgroundColor:
                  selectedTab == "assets"
                    ? colors[colorScheme].containers
                    : colors[colorScheme].containersUnselected,
              },
              styles.windowContainer,
            ]}
            onPress={() => {
              setSelectedTab("assets");
            }}
          >
            <Text style={[styles.windowText, styles.text]}>Assets</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                backgroundColor:
                  selectedTab == "commodities"
                    ? colors[colorScheme].containers
                    : colors[colorScheme].containersUnselected,
              },
              styles.windowContainer,
            ]}
            onPress={() => {
              setSelectedTab("commodities");
            }}
          >
            <Text style={[styles.windowText, styles.text]}>Comodities</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.assetsContentContainer}>
          <ScrollView horizontal={true}>
            <View style={styles.assetsItemsContainer}>
              <TouchableOpacity>
                <View style={styles.assetContainer}>
                  <Image source={Briefcase} style={styles.assetsIcon} />
                  <Text style={styles.assetName}>Salary</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.assetsSeparator} />
              <TouchableOpacity>
                <View style={styles.assetContainer}>
                  <Image source={Bill} style={styles.assetsIcon} />
                  <Text style={styles.assetName}>Savings</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.assetsSeparator} />
              <TouchableOpacity>
                <View style={styles.assetContainer}>
                  <Image source={Bitcoin} style={styles.assetsIcon} />
                  <Text style={styles.assetName}>Crypto</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  // Styles
  const styles = StyleSheet.create({
    assetContainer: {
      margin: 0,
      alignItems: "center",
    },
    assetName: {
      color: colors[colorScheme].fonts.primary,
      fontWeight: "500",
    },
    assetsContentContainer: {
      width: "95%",
      borderRadius: 20,
      backgroundColor: colors[colorScheme].containers,
      height: Dimensions.get("screen").height * 0.16 - 20,
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
      paddingVertical: 5,
      paddingHorizontal: 20,
    },
    assetsIcon: {
      height: 50,
      width: 50,
      margin: 0,
    },
    assetsItemsContainer: {
      alignItems: "center",
      flexDirection: "row",
    },
    assetsSeparator: {
      height: "60%",
      width: 2,
      backgroundColor: colors[colorScheme].separator,
      alignSelf: "center",
      marginHorizontal: 20,
    },
    text: {
      color: colors[colorScheme].fonts.primary,
    },
    thirdSectionContainer: {
      position: "absolute",
      bottom: 25,
      width: "100%",
      alignItems: "center",
      height: "18%",
    },
    windowContainer: {
      width: "40%",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: "center",
    },
    windowsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
    },
    windowText: {
      fontWeight: "600",
      fontSize: 16,
      marginVertical: 2,
    },
  });

  return render();
};
