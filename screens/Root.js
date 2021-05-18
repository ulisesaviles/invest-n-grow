import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native-appearance";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { getData, storeData } from "../config/asyncStorage";
import store from "../config/redux/store";

export default Root = () => {
  const navigation = useNavigation();
  let colorScheme = useColorScheme();

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
        await storeData(
          "currentGame",
          {
            multipliers: {
              realEstate: 1,
              crypto: 1,
              cash: 1,
              cars: 1,
              stocks: 1,
            },
            ownedProperties: [
              {
                name: "Cheap Car",
                isAnAsset: false,
                ammount: 1,
                pricePaid: 5000,
              },
              {
                name: "Cash",
                isAnAsset: true,
                ammount: 5000,
              },
              {
                name: "Small House",
                isAnAsset: false,
                ammount: 1,
                pricePaid: 200000,
              },
              {
                name: "Salary",
                isAnAsset: true,
                ammount: 1,
              },
            ],
            passedEvents: [],
            debt: 0,
          },
          true
        );
      }
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
