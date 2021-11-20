import "../styles/globals.css";
import { AppContext } from "../payrollContext/context";
import { defaultState } from "../payrollContext/defaultState";
import { reducer } from "../payrollContext/reducer";
import { useReducer } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const toggleNav = () => {
    dispatch({ type: "TOGGLE_NAV" });
  };

  return (
    <AppContext.Provider value={{ ...state, dispatch, toggleNav }}>
      <ToastContainer hideProgressBar={true} autoClose={3000} />{" "}
      <Component {...pageProps} />{" "}
    </AppContext.Provider>
  );
}

export default MyApp;
