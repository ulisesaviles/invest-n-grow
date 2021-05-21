// Imports from react native
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
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
import { Entypo } from "@expo/vector-icons";

// Local imports
import colors from "../config/colors";
import properties from "../config/properties";
import { priceToStr } from "../config/formatter";
import { getData, storeData } from "../config/asyncStorage";

export default Store = () => {
  // Constants
  let colorScheme = useColorScheme();
  const [storeActiveItem, setStoreActiveItem] = useState(null);
  const [firstLoad, setFirtsLoad] = useState(true);
  const [multipliers, setMultipliers] = useState({
    realEstate: 1,
    crypto: 1,
    cash: 1,
    cars: 1,
    stocks: 1,
  });

  const animatedValues = {
    storeTranslation: useRef(new Animated.Value(0)).current,
  };

  // Functions
  const handlePurchase = (property, multiplier) => {
    // Pay for it with cash and debt.
    store.dispatch({
      type: "buyProperty",
      payload: purchaseReducerPayload(property, multiplier),
    });
    storeData("currentGame", store.getState().currentGame, true);
  };

  const ownedPropertyWName = (name, wantsIndex = false) => {
    let properties = store.getState().currentGame.ownedProperties;
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].name === name) {
        return wantsIndex ? i : properties[i];
      }
    }
    return null;
  };

  const translateStore = (direction, duration = 200) => {
    Animated.timing(animatedValues.storeTranslation, {
      toValue: direction == "left" ? -0.9 * Dimensions.get("screen").width : 0,
      duration: duration,
      useNativeDriver: false,
    }).start();
  };

  const purchaseReducerPayload = (propertyToPurchase, multiplier) => {
    let cashProperty = ownedPropertyWName("Cash");
    let properties = store.getState().currentGame.ownedProperties;
    cashProperty.ammount =
      propertyToPurchase.value * multiplier > cashProperty.ammount
        ? 0
        : cashProperty.ammount - propertyToPurchase.value * multiplier;
    properties[ownedPropertyWName("Cash", true)] = cashProperty;
    properties = [
      ...properties,
      {
        ammount: 1,
        isAnAsset: propertyToPurchase.stats.commodity === undefined,
        name: propertyToPurchase.name,
        pricePaid: propertyToPurchase.value * multiplier,
      },
    ];
    return {
      updatedProperties: properties,
      debt:
        properties[ownedPropertyWName("Cash", true)].ammount > 0
          ? 0
          : propertyToPurchase.value * multiplier - cashProperty.ammount,
    };
  };

  if (firstLoad) {
    setFirtsLoad(false);
    let newState;
    setMultipliers(store.getState().currentGame.multipliers);
    store.subscribe(() => {
      try {
        newState = store.getState().currentGame.multipliers;
        setMultipliers(newState);
      } catch (e) {
        console.log(e);
      }
    });
  }

  // Render
  const render = () => {
    return (
      <Animated.View
        style={[
          styles.storeHorizontalContainer,
          {
            transform: [{ translateX: animatedValues.storeTranslation }],
          },
        ]}
      >
        <ScrollView style={{ width: "50%", height: "52%" }}>
          <View style={styles.storeContainer}>
            {properties.map((property) => (
              <View
                style={[
                  styles.storePropertyContainer,
                  {
                    display:
                      property.name !== "Cash" && property.name !== "Salary"
                        ? "flex"
                        : "none",
                  },
                ]}
                key={properties.indexOf(property)}
              >
                <TouchableOpacity
                  onPress={() => {
                    setStoreActiveItem(property);
                    translateStore("left");
                  }}
                >
                  <Text style={styles.storePropertyName}>{property.name}</Text>
                  <Image
                    source={property.img}
                    style={styles.storePropertyImg}
                  />
                  <Text style={styles.storePropertyPrice}>
                    {`$ ${priceToStr(
                      property.type === "realEstate" ||
                        property.type === "crypto" ||
                        property.type === "cash" ||
                        property.type === "cars" ||
                        property.type === "stocks"
                        ? Math.round(
                            property.value * multipliers[property.type]
                          )
                        : property.value
                    )} dlls`}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.storeIndividualContainer}>
          <LinearGradient
            colors={[
              colors[colorScheme].gradients.orange.start,
              colors[colorScheme].gradients.orange.end,
            ]}
            style={styles.storeBackBtn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity
              onPress={() => {
                translateStore("right");
              }}
              style={{ padding: 5 }}
            >
              <View style={styles.storeBackContentContainer}>
                <Entypo
                  name="chevron-left"
                  size={20}
                  color={"rgb(255,255,255)"}
                />
                <Text style={styles.storeBack}>Properties</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
          <Text style={[styles.text, { textAlign: "center" }]}>
            {storeActiveItem != null ? (
              <ScrollView
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <View style={styles.storeIndividualItemContainer}>
                  <Text style={[styles.text, styles.storeIndividualItemTitle]}>
                    {storeActiveItem.name}
                  </Text>
                  <Image
                    style={styles.storeIndividualItemImg}
                    source={storeActiveItem.img}
                  />
                  <View style={styles.storeStatsContainer}>
                    <Text style={[styles.storeStatsTitle, styles.text]}>
                      Stats
                    </Text>
                    {storeActiveItem.type == "realEstate" ||
                    storeActiveItem.type == "cars" ? (
                      <>
                        <Text style={[styles.storeStatsStubtitle, styles.text]}>
                          As a commodity:
                        </Text>
                        <View style={styles.storeStatsLine}>
                          <Text style={[styles.storeStatName, styles.text]}>
                            Life Quality:
                          </Text>
                          <Text style={[styles.text]}>
                            {`${
                              storeActiveItem.stats.commodity.lifeQuality > 0
                                ? "+"
                                : ""
                            }${storeActiveItem.stats.commodity.lifeQuality}pts`}
                          </Text>
                        </View>
                        <View style={styles.storeStatsLine}>
                          <Text style={[styles.storeStatName, styles.text]}>
                            Cash flow:
                          </Text>
                          <Text style={[styles.text]}>
                            {`${
                              storeActiveItem.stats.commodity.cashFlow > 0
                                ? "+"
                                : ""
                            }$${priceToStr(
                              Math.abs(
                                Math.round(
                                  storeActiveItem.stats.commodity.cashFlow *
                                    multipliers[storeActiveItem.type]
                                )
                              )
                            )}`}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <></>
                    )}
                    <Text style={[styles.storeStatsStubtitle, styles.text]}>
                      As an asset:
                    </Text>
                    <View style={styles.storeStatsLine}>
                      <Text style={[styles.storeStatName, styles.text]}>
                        Life Quality:
                      </Text>
                      <Text style={[styles.text]}>
                        {`${
                          storeActiveItem.stats.asset.lifeQuality > 0 ? "+" : ""
                        }${storeActiveItem.stats.asset.lifeQuality}pts`}
                      </Text>
                    </View>
                    <View style={styles.storeStatsLine}>
                      <Text style={[styles.storeStatName, styles.text]}>
                        Cash flow:
                      </Text>
                      <Text style={[styles.text]}>
                        {`${
                          storeActiveItem.stats.asset.cashFlow > 0 ? "+" : ""
                        }$${priceToStr(
                          Math.abs(
                            Math.round(
                              storeActiveItem.stats.asset.cashFlow *
                                multipliers[
                                  storeActiveItem.type != "business"
                                    ? storeActiveItem.type
                                    : "cash"
                                ]
                            )
                          )
                        )}`}
                      </Text>
                    </View>
                  </View>
                  <LinearGradient
                    colors={[
                      colors[colorScheme].gradients.green.start,
                      colors[colorScheme].gradients.green.end,
                    ]}
                    style={styles.storeBuyBtn}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        handlePurchase(
                          storeActiveItem,
                          storeActiveItem.type === "realEstate" ||
                            storeActiveItem.type === "crypto" ||
                            storeActiveItem.type === "cash" ||
                            storeActiveItem.type === "cars" ||
                            storeActiveItem.type === "stocks"
                            ? multipliers[storeActiveItem.type]
                            : 1
                        );
                      }}
                    >
                      <Text style={styles.storeBuy}>{`Buy at $ ${priceToStr(
                        storeActiveItem.type === "realEstate" ||
                          storeActiveItem.type === "crypto" ||
                          storeActiveItem.type === "cash" ||
                          storeActiveItem.type === "cars" ||
                          storeActiveItem.type === "stocks"
                          ? Math.round(
                              storeActiveItem.value *
                                multipliers[storeActiveItem.type]
                            )
                          : storeActiveItem.value
                      )}`}</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </ScrollView>
            ) : (
              "hola"
            )}
          </Text>
        </View>
      </Animated.View>
    );
  };

  // Styles
  const styles = StyleSheet.create({
    storeBack: {
      color: "rgb(255,255,255)",
      fontSize: 18,
      fontWeight: "600",
      marginRight: 5,
    },
    storeBackBtn: {
      borderRadius: 10,
      position: "absolute",
      top: 0,
      left: 10,
      zIndex: 100,
    },
    storeBackContentContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    storeBuy: {
      color: "rgb(255,255,255)",
      fontSize: 20,
      fontWeight: "700",
    },
    storeBuyBtn: {
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
      borderRadius: 10,
      paddingHorizontal: 40,
      paddingVertical: 5,
      marginTop: 20,
    },
    storeContainer: {
      width: "100%",
      overflow: "hidden",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    storeHorizontalContainer: {
      width: "200%",
      flexDirection: "row",
      alignSelf: "flex-start",
    },
    storeIndividualContainer: {
      width: "50%",
      height: "100%",
      alignItems: "center",
    },
    storeIndividualItemContainer: {
      width: "100%",
      alignItems: "center",
      paddingTop: 50,
    },
    storeIndividualItemImg: {
      height: 200,
      width: 250,
    },
    storeIndividualItemTitle: {
      fontWeight: "700",
      fontSize: 30,
      marginBottom: 20,
    },
    storePropertyContainer: {
      backgroundColor: colors[colorScheme].subContainers,
      width: "40%",
      borderRadius: 10,
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
      marginBottom: 20,
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    storePropertyImg: {
      width: 100,
      height: 80,
      alignSelf: "center",
      marginTop: 5,
    },
    storePropertyName: {
      fontWeight: "700",
      fontSize: 18,
      color: colors[colorScheme].fonts.primary,
      textAlign: "center",
    },
    storePropertyPrice: {
      alignSelf: "center",
      marginTop: 10,
      color: colors[colorScheme].fonts.primary,
      fontWeight: "600",
    },
    storeStatsContainer: {
      borderRadius: 10,
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
      alignItems: "center",
      backgroundColor: colors[colorScheme].subContainers,
      padding: 15,
      marginTop: 10,
    },
    storeStatsLine: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    storeStatName: {
      fontWeight: "500",
      marginRight: 5,
    },
    storeStatsStubtitle: {
      fontSize: 17,
      fontWeight: "600",
      marginTop: 5,
    },
    storeStatsTitle: {
      fontSize: 20,
      fontWeight: "700",
    },
    text: {
      color: colors[colorScheme].fonts.primary,
    },
  });

  return render();
};
