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
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

// Local imports
import colors from "../config/colors";

// Assets
import richHouse from "../assets/img/richHouse.png";
import poorHouse from "../assets/img/poorHouse.png";

export default Popups = () => {
  // Constants
  let colorScheme = useColorScheme();
  const [storeIsActive, setStoreIsActive] = useState(false);
  const [eventsIsActive, setEventsIsActive] = useState(false);
  const [storeActiveItem, setStoreActiveItem] = useState(null);
  const [firstLoad, setFirtsLoad] = useState(true);
  const [updater, update] = useState("");

  const animatedValues = {
    popUpBackground: useRef(new Animated.Value(0)).current,
    popUp: useRef(new Animated.Value(0)).current,
    eventTranslation: useRef(new Animated.Value(0)).current,
    storeTranslation: useRef(new Animated.Value(0)).current,
  };

  const availableProperties = [
    {
      img: richHouse,
      name: "Beach Mansion",
      price: {
        int: 5000000,
        str: "5M",
      },
      type: "realEstate",
      stats: {
        asset: {
          cashFlow: 25000,
          lifeQuality: 0,
        },
        commodity: {
          cashFlow: -2000,
          lifeQuality: 30,
        },
      },
    },
    {
      img: poorHouse,
      name: "Small House",
      price: {
        int: 100000,
        str: "100k",
      },
    },
    {
      img: poorHouse,
      name: "Small House",
      price: {
        int: 100000,
        str: "100k",
      },
    },
    {
      img: richHouse,
      name: "Beach Mansion",
      price: {
        int: 5000000,
        str: "5M",
      },
    },
  ];

  const events = [
    {
      title: "The Coronavirus just hitted the U. S. A.",
      description:
        "Due to the coronavirus, all businness are closed and people do not know what is about to happen to the economy.",
      multiplier: {
        crypto: 5,
        realEstate: 0.7,
        stocks: 0.6,
      },
      next: "Government incentives",
      acumulative: true,
    },
    {
      title:
        "The U. S. A. government just invested 10T on companies to counter the coronavirus crisis.",
      description:
        "Due to the coronavirus, the world's economy is passing throug the worst crisis since 1929. The U. S. A. government gave away incentives to people and invested in the stock market to counter it.",
      multiplier: {
        crypto: 1.2,
        realEstate: 1,
        stocks: 1.5,
      },
      next: null,
      acumulative: true,
    },
  ];

  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Functions
  const eventNavigation = (direction) => {
    if (direction == "left" && currentEventIndex != 0) {
      translateEvent("right", 150);
      setTimeout(() => {
        setCurrentEventIndex(currentEventIndex - 1);
        translateEvent("left", 0);
        translateEvent("center", 150);
      }, 150);
    } else if (direction == "right" && currentEventIndex != events.length - 1) {
      translateEvent("left", 150);
      setTimeout(() => {
        setCurrentEventIndex(currentEventIndex + 1);
        translateEvent("right", 0);
        translateEvent("center", 150);
      }, 150);
    }
  };

  const handlePopup = (open, name) => {
    if (open) {
      showPopUp();
    } else {
      hidePopUp();
    }
  };

  const hidePopUp = () => {
    Animated.timing(animatedValues.popUpBackground, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedValues.popUp, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const showPopUp = () => {
    Animated.timing(animatedValues.popUpBackground, {
      toValue: 0.7,
      duration: 150,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedValues.popUp, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const translateEvent = (direction, duration) => {
    Animated.timing(animatedValues.eventTranslation, {
      toValue:
        direction == "center"
          ? 0
          : direction == "left"
          ? Dimensions.get("screen").width * -1
          : Dimensions.get("screen").width,
      duration: duration,
      useNativeDriver: false,
    }).start();
  };

  const translateStore = (direction, duration = 200) => {
    Animated.timing(animatedValues.storeTranslation, {
      toValue: direction == "left" ? -0.9 * Dimensions.get("screen").width : 0,
      duration: duration,
      useNativeDriver: false,
    }).start();
  };

  if (firstLoad) {
    setFirtsLoad(false);
    let newState;
    store.subscribe(() => {
      newState = store.getState();
      setStoreIsActive(newState.popupStates.store);
      setEventsIsActive(newState.popupStates.events);
      newState.popupStates.store ? handlePopup(true, "store") : null;
      newState.popupStates.events ? handlePopup(true, "events") : null;
      update(JSON.stringify(newState));
    });
  }

  console.log(`Popup active: ${storeIsActive || eventsIsActive}`);

  // Render
  const render = () => {
    return (
      <>
        {storeIsActive || eventsIsActive ? (
          <>
            <Text style={{ opacity: 0 }}>{updater}</Text>
            <Animated.View
              style={[
                styles.blurBackground,
                { opacity: animatedValues.popUpBackground },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  handlePopup(false, storeIsActive ? "store" : "events");
                  setTimeout(() => {
                    storeIsActive ? translateStore("right", 0) : null;
                    store.dispatch({
                      type: "handlePopup",
                      payload: {
                        popupStates: {
                          store: false,
                          events: false,
                        },
                      },
                    });
                  }, 100);
                  console.log("click");
                }}
                style={{ height: "100%", width: "100%" }}
              ></TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={[styles.popUpContainer, { opacity: animatedValues.popUp }]}
            >
              <LinearGradient
                colors={[
                  colors[colorScheme].gradients.red.start,
                  colors[colorScheme].gradients.red.end,
                ]}
                style={styles.closePUBtnContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <TouchableOpacity
                  onPress={() => {
                    handlePopup(false, storeIsActive ? "store" : "events");
                    setTimeout(() => {
                      storeIsActive ? translateStore("right", 0) : null;
                      store.dispatch({
                        type: "handlePopup",
                        payload: {
                          popupStates: {
                            store: false,
                            events: false,
                          },
                        },
                      });
                    }, 100);
                    console.log("click");
                  }}
                  style={{ padding: 10 }}
                >
                  <Ionicons
                    name="ios-close"
                    size={20}
                    color="rgb(255,255,255)"
                  />
                </TouchableOpacity>
              </LinearGradient>
              <Text style={styles.popUpTitle}>
                {storeIsActive ? "Store" : "Events"}
              </Text>
              {storeIsActive ? (
                <Animated.View
                  style={[
                    styles.storeHorizontalContainer,
                    {
                      transform: [
                        { translateX: animatedValues.storeTranslation },
                      ],
                    },
                  ]}
                >
                  <ScrollView style={{ width: "50%" }}>
                    <View style={styles.storeContainer}>
                      {availableProperties.map((property) => (
                        <View
                          style={styles.storePropertyContainer}
                          key={availableProperties.indexOf(property)}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              setStoreActiveItem(property);
                              translateStore("left");
                            }}
                          >
                            <Text style={styles.storePropertyName}>
                              {property.name}
                            </Text>
                            <Image
                              source={property.img}
                              style={styles.storePropertyImg}
                            />
                            <Text style={styles.storePropertyPrice}>
                              {`$ ${property.price.str} dlls`}
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
                            <Text
                              style={[
                                styles.text,
                                styles.storeIndividualItemTitle,
                              ]}
                            >
                              {storeActiveItem.name}
                            </Text>
                            <Image
                              style={styles.storeIndividualItemImg}
                              source={storeActiveItem.img}
                            />
                            <View style={styles.storeStatsContainer}>
                              <Text
                                style={[styles.storeStatsTitle, styles.text]}
                              >
                                Stats
                              </Text>
                              {storeActiveItem.type == "realEstate" ? (
                                <>
                                  <Text
                                    style={[
                                      styles.storeStatsStubtitle,
                                      styles.text,
                                    ]}
                                  >
                                    As a commodity:
                                  </Text>
                                  <View style={styles.storeStatsLine}>
                                    <Text
                                      style={[
                                        styles.storeStatName,
                                        styles.text,
                                      ]}
                                    >
                                      Life Quality:
                                    </Text>
                                    <Text style={[styles.text]}>
                                      {`${
                                        storeActiveItem.stats.commodity
                                          .lifeQuality > 0
                                          ? "+"
                                          : ""
                                      }${
                                        storeActiveItem.stats.commodity
                                          .lifeQuality
                                      }pts`}
                                    </Text>
                                  </View>
                                  <View style={styles.storeStatsLine}>
                                    <Text
                                      style={[
                                        styles.storeStatName,
                                        styles.text,
                                      ]}
                                    >
                                      Cash flow:
                                    </Text>
                                    <Text style={[styles.text]}>
                                      {`${
                                        storeActiveItem.stats.commodity
                                          .cashFlow > 0
                                          ? "+"
                                          : ""
                                      }$${
                                        storeActiveItem.stats.commodity.cashFlow
                                      }`}
                                    </Text>
                                  </View>
                                  <View style={styles.storeStatsSeparator} />
                                  <Text
                                    style={[
                                      styles.storeStatsStubtitle,
                                      styles.text,
                                    ]}
                                  >
                                    As an asset:
                                  </Text>
                                  <View style={styles.storeStatsLine}>
                                    <Text
                                      style={[
                                        styles.storeStatName,
                                        styles.text,
                                      ]}
                                    >
                                      Life Quality:
                                    </Text>
                                    <Text style={[styles.text]}>
                                      {`${
                                        storeActiveItem.stats.asset
                                          .lifeQuality > 0
                                          ? "+"
                                          : ""
                                      }${
                                        storeActiveItem.stats.asset.lifeQuality
                                      }pts`}
                                    </Text>
                                  </View>
                                  <View style={styles.storeStatsLine}>
                                    <Text
                                      style={[
                                        styles.storeStatName,
                                        styles.text,
                                      ]}
                                    >
                                      Cash flow:
                                    </Text>
                                    <Text style={[styles.text]}>
                                      {`${
                                        storeActiveItem.stats.asset.cashFlow > 0
                                          ? "+"
                                          : ""
                                      }$${
                                        storeActiveItem.stats.asset.cashFlow
                                      }`}
                                    </Text>
                                  </View>
                                </>
                              ) : (
                                <></>
                              )}
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
                              <TouchableOpacity>
                                <Text
                                  style={styles.storeBuy}
                                >{`Buy at $${storeActiveItem.price.str}`}</Text>
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
              ) : (
                <></>
              )}
              {eventsIsActive ? (
                <View style={styles.eventsContainer}>
                  <Animated.View
                    style={{
                      transform: [
                        { translateX: animatedValues.eventTranslation },
                      ],
                      width: "100%",
                      flexDirection: "row",
                    }}
                  >
                    <Event event={events[currentEventIndex]} />
                  </Animated.View>
                  <View style={styles.eventsNavContainer}>
                    <TouchableOpacity
                      style={styles.eventsNavArrowContainer}
                      onPress={() => {
                        eventNavigation("left");
                      }}
                    >
                      <Entypo
                        name="chevron-small-left"
                        size={30}
                        color={
                          currentEventIndex == 0
                            ? colors[colorScheme].containers
                            : colors[colorScheme].fonts.primary
                        }
                      />
                    </TouchableOpacity>
                    <Text style={[styles.text, styles.eventsNavFrom]}>
                      {`${currentEventIndex + 1} from ${events.length}`}
                    </Text>
                    <TouchableOpacity
                      style={styles.eventsNavArrowContainer}
                      onPress={() => {
                        eventNavigation("right");
                      }}
                    >
                      <Entypo
                        name="chevron-small-right"
                        size={30}
                        color={
                          currentEventIndex + 1 == events.length
                            ? colors[colorScheme].containers
                            : colors[colorScheme].fonts.primary
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </Animated.View>
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  // Styles
  const styles = StyleSheet.create({
    blurBackground: {
      position: "absolute",
      width: "100%",
      height: "110%",
      backgroundColor: "rgb(0,0,0)",
      zIndex: 100,
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
    eventsContainer: {
      justifyContent: "space-between",
      height: "80%",
    },
    eventsNavContainer: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      marginTop: 20,
    },
    popUpContainer: {
      backgroundColor: colors[colorScheme].containers,
      height: "80%",
      width: "90%",
      alignSelf: "center",
      borderRadius: 20,
      zIndex: 200,
      alignItems: "center",
      overflow: "hidden",
    },
    popUpTitle: {
      fontSize: 30,
      fontWeight: "700",
      color: colors[colorScheme].fonts.primary,
      marginTop: 30,
      marginBottom: 20,
    },
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
