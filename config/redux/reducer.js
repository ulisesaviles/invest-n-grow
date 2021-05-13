const initialState = {
  popupStates: {
    store: false,
    events: false,
  },
};

export default Reducer = (state = initialState, action) => {
  if (action.type === "handlePopup") {
    return {
      ...state,
      popupStates: action.payload.popupStates,
    };
  }
  return state;
};
