import "../styles/globals.css";
import { AppContext } from "../payrollContext/context";
import { defaultState } from "../payrollContext/defaultState";
import { reducer } from "../payrollContext/reducer";
import { useReducer } from "react";
function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const toggleNav = () => {
    dispatch({ type: "TOGGLE_NAV" });
  };
  return (
    <AppContext.Provider value={{ ...state, dispatch, toggleNav }}>
      {" "}
      <Component {...pageProps} />{" "}
    </AppContext.Provider>
  );
}

export default MyApp;
