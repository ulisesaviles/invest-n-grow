import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { useColorScheme } from "react-native-appearance";

// Redux
import store from "../config/redux/store";

// Local imports
import colors from "../config/colors";
import properties from "../config/properties";
import cash from "../assets/img/bill-icon.png";
import { priceToStr } from "../config/formatter";

// Expo imports
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default Properties = () => {
  // Constants
  let colorScheme = useColorScheme();
  const [propertyIndex, setPropertyindex] = useState(0);
  const [hideProperty, setHideProperty] = useState(false);
  const [firstLoad, setFirtsLoad] = useState(true);
  const [multiplier, setMultiplier] = useState(1);
  const [property, setProperty] = useState({
    name: "Cash",
    img: cash,
    value: 1,
    type: "cash",
    stats: {
      asset: {
        cashFlow: 0.01,
        lifeQuality: 0,
      },
      commodity: {
        cashFlow: 0.002,
        lifeQuality: 0,
      },
    },
  });
  const [myProperty, setMyProperty] = useState({
    name: "Cash",
    isAnAsset: true,
    ammount: 5000,
  });
  const animatedValues = {
    propertyPosition: useRef(new Animated.Value(0)).current,
  };

  // Functions
  const handleActionBtn = () => {
    if (property.type === "cash") {
      payDebt();
    } else if (property.type === "salary") {
      quitJob();
    } else {
      sellCurrentProperty();
    }
  };

  const handleTurnBtn = () => {
    let updatedProperties = store.getState().currentGame.ownedProperties;
    updatedProperties[updatedProperties.indexOf(myProperty)] = {
      ...myProperty,
      isAnAsset: !myProperty.isAnAsset,
    };
    store.dispatch({
      type: "updateProperties",
      payload: {
        updatedProperties,
      },
    });
  };

  const ownedPropertyWName = (name) => {
    let properties = store.getState().currentGame.ownedProperties;
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].name === name) {
        return properties[i];
      }
    }
    return null;
  };

  const payDebt = () => {
    let updatedProperties = store.getState().currentGame.ownedProperties;
    let cash = ownedPropertyWName("Cash");
    let debt = store.getState().currentGame.debt;
    if (cash.ammount > debt) {
      cash.ammount = cash.ammount - debt;
      debt = 0;
    } else {
      debt = debt - cash.ammount;
      cash.ammount = 0;
    }
    updatedProperties[updatedProperties.indexOf(ownedPropertyWName("Cash"))] =
      cash;
    store.dispatch({
      type: "payDebt",
      payload: {
        updatedProperties,
        debt,
      },
    });
  };

  const propertyNav = (index) => {
    translateProperty(index > propertyIndex ? "left" : "right", 200);
    setPropertyindex(index);
    // Change the property
    setTimeout(() => {
      setHideProperty(true);
      let myProperties = store.getState().currentGame.ownedProperties;
      setMyProperty(myProperties[index]);
      let tempProperty = propertyWName(myProperties[index].name);
      setProperty(tempProperty);
      setMultiplier(
        tempProperty.type === "realEstate" ||
          tempProperty.type === "crypto" ||
          tempProperty.type === "cash" ||
          tempProperty.type === "cars" ||
          tempProperty.type === "stocks"
          ? store.getState().currentGame.multipliers[tempProperty.type]
          : 1
      );
      translateProperty(index > propertyIndex ? "right" : "left", 0);
      setHideProperty(false);
      translateProperty("center", 200);
    }, 200);
  };

  const propertyWName = (name) => {
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].name === name) {
        return properties[i];
      }
    }
    return null;
  };

  const quitJob = () => {
    let updatedProperties = store.getState().currentGame.ownedProperties;
    updatedProperties.splice(
      updatedProperties.indexOf(ownedPropertyWName("Salary")),
      1
    );
    store.dispatch({
      type: "updatePropertiesNResetNav",
      payload: {
        updatedProperties,
      },
    });
  };

  const sellCurrentProperty = () => {
    let updatedProperties = store.getState().currentGame.ownedProperties;
    updatedProperties[
      updatedProperties.indexOf(ownedPropertyWName("Cash"))
    ].ammount += property.value * multiplier;
    updatedProperties.splice(updatedProperties.indexOf(myProperty), 1);
    store.dispatch({
      type: "updatePropertiesNResetNav",
      payload: {
        updatedProperties,
      },
    });
  };

  const translateProperty = (direction, duration) => {
    Animated.timing(animatedValues.propertyPosition, {
      toValue:
        direction == "center"
          ? 0
          : direction == "left"
          ? -1 * Dimensions.get("screen").width
          : Dimensions.get("screen").width,
      duration: duration,
      useNativeDriver: false,
    }).start();
  };

  if (firstLoad) {
    setFirtsLoad(false);
    let myProperties = store.getState().currentGame.ownedProperties;
    setMyProperty(myProperties[propertyIndex]);
    let tempProperty = propertyWName(myProperties[propertyIndex].name);
    setProperty(tempProperty);
    setMultiplier(
      tempProperty.type === "realEstate" ||
        tempProperty.type === "crypto" ||
        tempProperty.type === "cash" ||
        tempProperty.type === "cars" ||
        tempProperty.type === "stocks"
        ? store.getState().currentGame.multipliers[tempProperty.type]
        : 1
    );
    store.subscribe(() => {
      propertyNav(store.getState().currentPropertyIndex);
    });
  }

  const render = () => {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>Properties</Text>
        <View style={styles.containerHorizontal}>
          <TouchableOpacity
            onPress={() => {
              propertyNav(
                propertyIndex === 0 ? properties.length - 1 : propertyIndex - 1
              );
            }}
          >
            <Entypo
              name="chevron-small-left"
              size={60}
              color={colors[colorScheme].arrow}
            />
          </TouchableOpacity>
          <Animated.View style={styles.containerContent}>
            <ScrollView style={{ width: "100%", height: "100%" }}>
              <Text style={[styles.text, styles.propertyTitle]}>
                {property.name}
              </Text>
              <Image style={styles.img} source={property.img} />
              <View style={styles.separator} />
              <View style={styles.containerSection2}>
                <View style={styles.textContainer}>
                  {property.type !== "salary" ? (
                    <View style={styles.textRow}>
                      <Text style={[styles.text, styles.subtitle]}>
                        {property.type === "cash" ? "Ammount:" : "You paid:"}
                      </Text>
                      <Text style={[styles.text, styles.content]}>{`${
                        property.type === "cash" ? "" : "$"
                      }${priceToStr(
                        Math.round(
                          property.type === "cash"
                            ? myProperty.ammount
                            : myProperty.pricePaid
                        )
                      )}`}</Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  <View style={styles.textRow}>
                    <Text style={[styles.text, styles.subtitle]}>
                      Current value:
                    </Text>
                    <Text style={[styles.text, styles.content]}>{`$${priceToStr(
                      Math.round(property.value * multiplier)
                    )}`}</Text>
                  </View>
                  <View style={styles.textRow}>
                    <Text style={[styles.text, styles.subtitle]}>
                      Life quality:
                    </Text>
                    <Text style={[styles.text, styles.content]}>{`${
                      property.stats.commodity === undefined &&
                      !myProperty.isAnAsset
                        ? 0
                        : property.stats[
                            myProperty.isAnAsset ? "asset" : "commodity"
                          ].lifeQuality >= 0
                        ? "+"
                        : "-"
                    }${Math.abs(
                      property.stats.commodity === undefined &&
                        !myProperty.isAnAsset
                        ? 0
                        : property.stats[
                            myProperty.isAnAsset ? "asset" : "commodity"
                          ].lifeQuality
                    )}pts`}</Text>
                  </View>
                  <View style={styles.textRow}>
                    <Text style={[styles.text, styles.subtitle]}>
                      Cash flow:
                    </Text>
                    <Text style={[styles.text, styles.content]}>{`${
                      property.stats.commodity === undefined &&
                      !myProperty.isAnAsset
                        ? 0
                        : property.stats[
                            myProperty.isAnAsset ? "asset" : "commodity"
                          ].cashFlow >= 0
                        ? "+"
                        : "-"
                    }$${priceToStr(
                      Math.abs(
                        Math.round(
                          property.stats.commodity === undefined &&
                            !myProperty.isAnAsset
                            ? 0
                            : property.stats[
                                myProperty.isAnAsset ? "asset" : "commodity"
                              ].cashFlow * multiplier
                        )
                      )
                    )}`}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.sellBtn}
                  onPress={() => {
                    handleActionBtn();
                  }}
                >
                  <LinearGradient
                    colors={[
                      colors[colorScheme].gradients.green.start,
                      colors[colorScheme].gradients.green.end,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.btnGradient}
                  >
                    <Text style={styles.sell}>
                      {property.type === "salary"
                        ? "Quit"
                        : property.type === "cash"
                        ? "Pay debt"
                        : "Sell"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              {property.stats.commodity !== undefined ? (
                <>
                  <View style={styles.separator} />
                  <TouchableOpacity
                    style={styles.turnBtn}
                    onPress={() => {
                      handleTurnBtn();
                    }}
                  >
                    <LinearGradient
                      colors={[
                        colors[colorScheme].gradients.blue.start,
                        colors[colorScheme].gradients.blue.end,
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.btnGradient}
                    >
                      <Text style={styles.sell}>
                        {`Turn into a${
                          myProperty.isAnAsset ? " commodity" : "n asset"
                        }`}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              ) : (
                <></>
              )}
            </ScrollView>
          </Animated.View>
          <TouchableOpacity
            onPress={() => {
              propertyNav(
                propertyIndex === properties.length - 1 ? 0 : propertyIndex + 1
              );
            }}
          >
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

  const styles = StyleSheet.create({
    btnGradient: {
      borderRadius: 10,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
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
      opacity: hideProperty ? 0 : 1,
      transform: [{ translateX: animatedValues.propertyPosition }],
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
      width: "35%",
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
    turnBtn: {
      shadowColor: colors[colorScheme].boxShadow,
      shadowRadius: 4,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.16,
    },
  });

  return render();
};
