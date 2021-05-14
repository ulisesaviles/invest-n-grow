// Imports from react native
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
} from "react-native";
import { useColorScheme } from "react-native-appearance";

// Redux
import store from "../config/redux/store";

// imports from expo
import { LinearGradient } from "expo-linear-gradient";

// Local imports
import colors from "../config/colors";
import { Properties, Event, ProgressIndicators } from "../components";

// Assets
import Bill from "../assets/img/bill-icon.png";
import Bitcoin from "../assets/img/bitcoin-icon.png";
import Briefcase from "../assets/img/briefcase-icon.png";
import Popups from "../components/Popups";

export default Home = () => {
  // Constants
  let colorScheme = useColorScheme();
  const [firstload, setFirtsLoad] = useState(true);
  const [selectedTab, setSelectedTab] = useState("assets");

  const animatedValues = {
    lifeQuality: useRef(new Animated.Value(0)).current,
    herritage: useRef(new Animated.Value(0)).current,
    debt: useRef(new Animated.Value(0)).current,
  };

  // Functions
  const handlePopup = (open, name) => {
    store.dispatch({
      type: "handlePopup",
      payload: {
        popupStates: {
          store: name == "store" && open,
          events: name == "events" && open,
        },
      },
    });
  };

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
      <View style={styles.container}>
        <Popups />
        <SafeAreaView
          style={{ width: "100%", height: "100%", position: "absolute" }}
        >
          <ProgressIndicators />
          <View style={styles.properties}>
            <Properties />
            <View style={styles.btnsContainer}>
              <TouchableOpacity
                style={styles.sucesosBtn}
                onPress={() => handlePopup(true, "events")}
              >
                <LinearGradient
                  colors={[
                    colors[colorScheme].gradients.orange.start,
                    colors[colorScheme].gradients.orange.end,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.btnGradient}
                >
                  <Text style={styles.btnTxt}>Events</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.storeBtn}
                onPress={() => handlePopup(true, "store")}
              >
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
        </SafeAreaView>
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
    blurBackground: {
      position: "absolute",
      width: "100%",
      height: "110%",
      backgroundColor: "rgb(0,0,0)",
      zIndex: 100,
    },
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
    closePUBtnContainer: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
      height: 40,
      width: 40,
      position: "absolute",
      top: 20,
      right: 20,
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      backgroundColor: colors[colorScheme].background,
      justifyContent: "center",
    },

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
    properties: {
      position: "absolute",
      width: "100%",
      marginTop: Dimensions.get("screen").height * 0.25,
      flexDirection: "column",
    },
    storeBtn: {
      position: "absolute",
      right: Dimensions.get("screen").width * 0.025,
      top: 50,
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
      top: 50,
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
