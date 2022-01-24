import { useContext, createContext } from "react";

const AppContext = createContext();
const usePayContext = () => {
  return useContext(AppContext);
};
export { AppContext, usePayContext };
