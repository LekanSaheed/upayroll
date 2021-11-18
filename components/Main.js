import { usePayContext } from "../payrollContext/context";
import classes from "./Main.module.css";

const Main = ({ children }) => {
  const { isToggled } = usePayContext();
  return (
    <div
      className={`${isToggled ? classes.expandMain : classes.shrinkMain} ${
        classes.main
      }`}
    >
      {children}
    </div>
  );
};

export default Main;
