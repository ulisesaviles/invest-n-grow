// Imports from react native
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

// Redux
import store from "../config/redux/store";

// imports from expo
import { LinearGradient } from "expo-linear-gradient";

// Local imports
import colors from "../config/colors";
import { Properties, ProgressIndicators, MyProperties } from "../components";

// Assets
import Popups from "../components/Popups";

export default Home = () => {
  // Constants
  let colorScheme = useColorScheme();

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
          <MyProperties />
        </SafeAreaView>
      </View>
    );
  };

  // Styles
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
      backgroundColor: colors[colorScheme].background,
      justifyContent: "center",
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
  });

  return render();
};
