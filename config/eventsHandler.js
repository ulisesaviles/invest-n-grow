import events from "./events.json";
import store from "./redux/store";

export const getEvent = () => {
  const eventWName = (name) => {
    for (let i = 0; i < events.length; i++) {
      if (events[i].name === name) {
        console.log(events[i]);
        return events[i];
      }
    }
    return null;
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

  const randomIndexInRange = () => {
    return Math.round(Math.random() * events.length - 1);
  };

  const currentState = store.getState();
  if (currentState.currentGame.passedEvents.length === 0) {
    store.dispatch({
      type: "newEvent",
      payload: {
        newEvent: newValidEvent(),
      },
    });
  } else {
    if (currentState.currentGame.passedEvents[0].next === null) {
      store.dispatch({
        type: "newEvent",
        payload: {
          newEvent: newValidEvent(),
        },
      });
    } else {
      store.dispatch({
        type: "newEvent",
        payload: {
          newEvent: eventWName(currentState.currentGame.passedEvents[0].next),
        },
      });
    }
  }
};
