// React native imports
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Appearance } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Local imports
import colors from "../config/colors";
import { getData, storeData } from "../config/asyncStorage";
import defaultValues from "../config/defaultValues";

// Redux
import store from "../config/redux/store";

export default Root = () => {
  const navigation = useNavigation();
  const colorScheme = Appearance.getColorScheme();
  const reset = async () => {
    await storeData("currentGame", defaultValues, true);
    await store.dispatch({
      type: "reset",
    });
  };

  useEffect(() => {
    const asyncFunction = async () => {
      const currentGame = await getData("currentGame", true);
      if (currentGame !== null) {
        await store.dispatch({
          type: "loadStorage",
          payload: {
            currentGame,
          },
        });
      } else {
        await storeData("currentGame", defaultValues, true);
      }
      //await reset();
      navigation.navigate("home");
    };
    asyncFunction();
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors[colorScheme].background,
    },
    text: {
      color: colors[colorScheme].fonts.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Root</Text>
    </View>
  );
};
