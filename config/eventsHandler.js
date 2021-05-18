import events from "./events.json";
import store from "./redux/store";
import properties from "./properties";

export const newEvent = () => {
  const eventWName = (name) => {
    for (let i = 0; i < events.length; i++) {
      if (events[i].name === name) {
        return events[i];
      }
    }
    return null;
  };

  const getCashFlow = () => {
    let currentState = store.getState();
    let res = 0;
    for (let i = 0; i < currentState.currentGame.ownedProperties.length; i++) {
      if (
        propertyWName(currentState.currentGame.ownedProperties[i].name).type ===
          "cars" ||
        propertyWName(currentState.currentGame.ownedProperties[i].name).type ===
          "cash" ||
        propertyWName(currentState.currentGame.ownedProperties[i].name).type ===
          "crypto" ||
        propertyWName(currentState.currentGame.ownedProperties[i].name).type ===
          "realEstate" ||
        propertyWName(currentState.currentGame.ownedProperties[i].name).type ===
          "stocks"
      ) {
        res +=
          propertyWName(currentState.currentGame.ownedProperties[i].name).stats[
            currentState.currentGame.ownedProperties[i].isAnAsset
              ? "asset"
              : "commodity"
          ].cashFlow *
          currentState.currentGame.multipliers[
            propertyWName(currentState.currentGame.ownedProperties[i].name).type
          ];
      } else {
        res += propertyWName(currentState.currentGame.ownedProperties[i].name)
          .stats[
          currentState.currentGame.ownedProperties[i].isAnAsset
            ? "asset"
            : "commodity"
        ].cashFlow;
      }
    }
    console.log(res);
    return res + ownedPropertyWName("Cash").ammount;
  };

  const newValidEvent = () => {
    let randomIndex;
    while (true) {
      randomIndex = randomIndexInRange();
      if (!events[randomIndex].onlyOnSequence) {
        return events[randomIndex];
      }
    }
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

  const propertyWName = (name) => {
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].name === name) {
        return properties[i];
      }
    }
    return null;
  };

  const randomIndexInRange = () => {
    return Math.floor(Math.random() * (events.length - 1));
  };

  const updatedProperties = () => {
    let ownedProperties = store.getState().currentGame.ownedProperties;
    for (let i = 0; i < ownedProperties.length; i++) {
      if (ownedProperties[i].name === "Cash") {
        ownedProperties[i] = {
          name: "Cash",
          isAnAsset: true,
          ammount: getCashFlow(),
        };
      }
    }
    return ownedProperties;
  };

  const currentState = store.getState();
  // console.log(updatedProperties());
  if (currentState.currentGame.passedEvents.length === 0) {
    store.dispatch({
      type: "newEvent",
      payload: {
        newEvent: newValidEvent(),
        updatedProperties: updatedProperties(),
      },
    });
  } else {
    if (currentState.currentGame.passedEvents[0].next === null) {
      store.dispatch({
        type: "newEvent",
        payload: {
          newEvent: newValidEvent(),
          updatedProperties: updatedProperties(),
        },
      });
    } else {
      store.dispatch({
        type: "newEvent",
        payload: {
          newEvent: eventWName(currentState.currentGame.passedEvents[0].next),
          updatedProperties: updatedProperties(),
        },
      });
    }
  }
};
