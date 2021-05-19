// Imports from react native
import React, { useState, useEffect } from "react";
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
import properties from "../config/properties";
import { getData } from "../config/asyncStorage";

// Assets

export default MyProperties = () => {
  // Constants
  let colorScheme = useColorScheme();
  const [selectedTab, setSelectedTab] = useState("assets");
  const [ownedProperties, setOwnedProperties] = useState([]);
  const [assets, setAssets] = useState([]);
  const [comodities, setComodities] = useState([]);
  const [firstLoad, setFirtsLoad] = useState(true);

  // Functions
  const propertyWName = (name) => {
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].name === name) {
        return properties[i];
      }
    }
    return null;
  };

  const setStates = (ownedProperties) => {
    setOwnedProperties(ownedProperties);
    let assets;
    let comodities;
    assets = [];
    comodities = [];
    for (let i = 0; i < ownedProperties.length; i++) {
      if (ownedProperties[i].isAnAsset) {
        assets.push(ownedProperties[i]);
      } else {
        comodities.push(ownedProperties[i]);
      }
    }
    setAssets(assets);
    setComodities(comodities);
  };

  let newState;

  // On load
  if (firstLoad) {
    setFirtsLoad(false);
    getData("currentGame", true).then((currentGame) => {
      setStates(currentGame.ownedProperties);
    });
    store.subscribe(() => {
      newState = store.getState().currentGame.ownedProperties;
      if (ownedProperties.length !== newState.length) {
        setStates(newState);
      }
    });
  }

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
              {selectedTab === "assets"
                ? assets.map((property) => (
                    <View
                      key={ownedProperties.indexOf(property)}
                      style={styles.mappedProperty}
                    >
                      <TouchableOpacity>
                        <View style={styles.assetContainer}>
                          <Image
                            source={propertyWName(property.name).img}
                            style={styles.assetsIcon}
                          />
                          <Text style={styles.assetName}>{property.name}</Text>
                        </View>
                      </TouchableOpacity>
                      {assets.indexOf(property) === assets.length - 1 ? (
                        <></>
                      ) : (
                        <View style={styles.assetsSeparator} />
                      )}
                    </View>
                  ))
                : comodities.map((property) => (
                    <View
                      key={ownedProperties.indexOf(property)}
                      style={styles.mappedProperty}
                    >
                      <TouchableOpacity>
                        <View style={styles.assetContainer}>
                          <Image
                            source={propertyWName(property.name).img}
                            style={styles.assetsIcon}
                          />
                          <Text style={styles.assetName}>{property.name}</Text>
                        </View>
                      </TouchableOpacity>
                      {comodities.indexOf(property) ===
                      comodities.length - 1 ? (
                        <></>
                      ) : (
                        <View style={styles.assetsSeparator} />
                      )}
                    </View>
                  ))}
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
      width: 60,
      textAlign: "center",
      alignSelf: "center",
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
    mappedProperty: {
      alignItems: "center",
      flexDirection: "row",
      height: "100%",
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
