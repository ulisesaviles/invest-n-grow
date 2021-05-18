import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native-appearance";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { getData, storeData } from "../config/asyncStorage";
import store from "../config/redux/store";
import defaultValues from "../config/defaultValues";

export default Root = () => {
  const navigation = useNavigation();
  let colorScheme = useColorScheme();
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
