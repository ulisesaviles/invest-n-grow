import defaultValues from "../defaultValues";

const initialState = {
  popupStates: {
    store: false,
    events: false,
  },
  currentGame: defaultValues,
};

export default Reducer = (state = initialState, action) => {
  if (action.type === "handlePopup") {
    return {
      ...state,
      popupStates: action.payload.popupStates,
    };
  } else if (action.type === "loadStorage") {
    return {
      ...state,
      currentGame: action.payload.currentGame,
    };
  } else if (action.type === "buyProperty") {
    return {
      ...state,
      currentGame: {
        ...state.currentGame,
        ownedProperties: action.payload.updatedProperties,
        debt: state.currentGame.debt + action.payload.debt,
      },
    };
  } else if (action.type === "newEvent") {
    return {
      ...state,
      currentGame: {
        ...state.currentGame,
        ownedProperties: action.payload.updatedProperties,
        multipliers: {
          realEstate:
            state.currentGame.multipliers.realEstate *
            action.payload.newEvent.multiplier.realEstate,
          crypto:
            state.currentGame.multipliers.crypto *
            action.payload.newEvent.multiplier.crypto,
          cash: state.currentGame.multipliers.cash,
          cars:
            state.currentGame.multipliers.cars *
            action.payload.newEvent.multiplier.cars,
          stocks:
            state.currentGame.multipliers.stocks *
            action.payload.newEvent.multiplier.stocks,
        },
        passedEvents: [].concat(
          action.payload.newEvent,
          ...state.currentGame.passedEvents
        ),
      },
    };
  } else if (action.type === "reset") {
    return initialState;
  }
  return state;
};
