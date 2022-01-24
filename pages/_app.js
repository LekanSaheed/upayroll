import "../styles/globals.css";
import { AppContext } from "../payrollContext/context";
import { defaultState } from "../payrollContext/defaultState";
import { reducer } from "../payrollContext/reducer";
import { useReducer } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../payrollContext/AuthContext";
import PrivateRoute from "../components/PrivateRoute";

function MyApp({ Component, pageProps }) {
  const protectedRoutes = [
    "/payroll",
    "/payroll/add-employee",
    "/payroll/all-employee",
    "/payroll/profile",
    "/payroll/transaction-history",
    "/payroll/pay-run",
    "/payroll/pay-run/add-new",
    "/payroll/topup",
  ];
  const [state, dispatch] = useReducer(reducer, defaultState);
  const toggleNav = () => {
    dispatch({ type: "TOGGLE_NAV" });
  };

  return (
    <AppContext.Provider value={{ ...state, dispatch, toggleNav }}>
      <AuthProvider>
        <PrivateRoute protectedRoutes={protectedRoutes}>
          <ToastContainer hideProgressBar={true} autoClose={3000} />
          <Component {...pageProps} />
        </PrivateRoute>
      </AuthProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
