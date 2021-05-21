// Imports from react native
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
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
import { newEvent } from "../config/eventsHandler";
import { getData, storeData } from "../config/asyncStorage";
import Store from "./Store";

export default Popups = () => {
  // Constants
  let colorScheme = useColorScheme();
  const [storeIsActive, setStoreIsActive] = useState(false);
  const [eventsIsActive, setEventsIsActive] = useState(false);
  const [firstLoad, setFirtsLoad] = useState(true);
  const [currentGameEvents, setCurrentGameEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const animatedValues = {
    popUpBackground: useRef(new Animated.Value(0)).current,
    popUp: useRef(new Animated.Value(0)).current,
    eventTranslation: useRef(new Animated.Value(0)).current,
    storeTranslation: useRef(new Animated.Value(0)).current,
  };

  // Functions
  const eventNavigation = (direction) => {
    if (direction == "left" && currentEventIndex != 0) {
      translateEvent("right", 150);
      setTimeout(() => {
        setCurrentEventIndex(currentEventIndex - 1);
        translateEvent("left", 0);
        translateEvent("center", 150);
      }, 150);
    } else if (
      direction == "right" &&
      currentEventIndex != currentGameEvents.length - 1
    ) {
      translateEvent("left", 150);
      setTimeout(() => {
        setCurrentEventIndex(currentEventIndex + 1);
        translateEvent("right", 0);
        translateEvent("center", 150);
      }, 150);
    }
  };

  const handleNewEvent = async () => {
    newEvent();
    let currentGame = store.getState().currentGame;
    console.log(currentGame.multipliers);
    await storeData("currentGame", currentGame, true);
    translateEvent("right", 150);
    setTimeout(() => {
      setCurrentGameEvents(currentGame.passedEvents);
      setCurrentEventIndex(0);
      translateEvent("left", 0);
      translateEvent("center", 150);
    }, 150);
  };

  const handlePopup = (open) => {
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

  if (firstLoad) {
    setFirtsLoad(false);
    let newState;
    let currentState;
    getData("currentGame", true).then((currentGame) =>
      setCurrentGameEvents(currentGame.passedEvents)
    );
    store.subscribe(() => {
      newState = store.getState();
      if (
        currentState === undefined ||
        currentState.popupStates !== newState.popupStates
      ) {
        currentState = newState;
        setStoreIsActive(newState.popupStates.store);
        setEventsIsActive(newState.popupStates.events);
        newState.popupStates.store ? handlePopup(true) : null;
        newState.popupStates.events ? handlePopup(true) : null;
      }
    });
  }

  // Render
  const render = () => {
    return (
      <>
        {storeIsActive || eventsIsActive ? (
          <View
            style={{
              justifyContent: "center",
              zIndex: 100,
              width: "100%",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Animated.View
              style={[
                styles.blurBackground,
                { opacity: animatedValues.popUpBackground },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  handlePopup(false);
                  setTimeout(() => {
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
                    handlePopup(false);
                    setTimeout(() => {
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
              {storeIsActive ? <Store /> : <></>}
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
                    <Event event={currentGameEvents[currentEventIndex]} />
                  </Animated.View>
                  <View>
                    <LinearGradient
                      colors={[
                        colors[colorScheme].gradients.green.start,
                        colors[colorScheme].gradients.green.end,
                      ]}
                      style={styles.getNewEventBtnContainer}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <TouchableOpacity
                        style={styles.getNewEventBtn}
                        onPress={handleNewEvent}
                      >
                        <Text style={styles.getNewEvent}>Next month</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <Text style={styles.debtWarning}>(Debt grows 5%)</Text>
                    {currentGameEvents.length > 0 ? (
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
                          {`${currentEventIndex + 1} from ${
                            currentGameEvents.length
                          }`}
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
                              currentEventIndex + 1 == currentGameEvents.length
                                ? colors[colorScheme].containers
                                : colors[colorScheme].fonts.primary
                            }
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              ) : (
                <></>
              )}
            </Animated.View>
          </View>
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
    debtWarning: {
      color: colors[colorScheme].fonts.primary,
      alignSelf: "center",
      position: "absolute",
      top: 25,
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
    getNewEvent: {
      color: "rgb(255,255,255)",
      fontWeight: "700",
      fontSize: 18,
      width: "100%",
      height: "100%",
      textAlign: "center",
      alignSelf: "center",
    },
    getNewEventBtn: {
      width: "100%",
      height: 18,
    },
    getNewEventBtnContainer: {
      height: 30,
      width: "50%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      position: "relative",
      bottom: 10,
    },
    popUpContainer: {
      backgroundColor: colors[colorScheme].containers,
      height: "80%",
      width: "90%",
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
    text: {
      color: colors[colorScheme].fonts.primary,
    },
  });

  return render();
};
