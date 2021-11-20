export const reducer = (state, action) => {
  if (action.type === "TOGGLE_NAV") {
    return {
      ...state,
      isToggled: !state.isToggled,
    };
  }
  if (action.type === "TOGGLE_MOBILE") {
    return {
      ...state,
      isToggledMobile: !state.isToggledMobile,
    };
  }
  if (action.type === "CLOSE_MOBILE") {
    return {
      ...state,
      isToggledMobile: false,
    };
  }
};
