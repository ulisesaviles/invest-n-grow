const initialState = {
  popupStates: {
    store: false,
    events: false,
  },
  currentGame: {
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
    debt: 0,
    passedEvents: [],
  },
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
        ownedProperties: [
          action.payload.newProperty,
          ...state.currentGame.ownedProperties,
        ],
      },
    };
  } else if (action.type === "newEvent") {
    console.log(
      `Store>>>\nNewEvent: ${JSON.stringify(action.payload.newEvent)}`
    );
    return {
      ...state,
      currentGame: {
        ...state.currentGame,
        passedEvents: [].concat(
          action.payload.newEvent,
          ...state.currentGame.passedEvents
        ),
      },
    };
  }
  return state;
};
