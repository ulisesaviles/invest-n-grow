import events from "./events.json";
import store from "./redux/store";

export const getEvent = () => {
  console.log("new event!");
  const eventWName = (name) => {
    console.log(`Looking for event w name: ${name}`);
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
    console.log("Store had no events");
    store.dispatch({
      type: "newEvent",
      payload: {
        newEvent: newValidEvent(),
      },
    });
  } else {
    if (currentState.currentGame.passedEvents[0].next === null) {
      console.log("Store had events without next");
      store.dispatch({
        type: "newEvent",
        payload: {
          newEvent: newValidEvent(),
        },
      });
    } else {
      console.log(
        `Event with next: ${currentState.currentGame.passedEvents[0].next}`
      );
      store.dispatch({
        type: "newEvent",
        payload: {
          newEvent: eventWName(currentState.currentGame.passedEvents[0].next),
        },
      });
    }
  }
};
