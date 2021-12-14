import { usePayContext } from "../payrollContext/context";
import classes from "./Main.module.css";
import { motion } from "framer-motion";
const Main = ({ children }) => {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  const { isToggled } = usePayContext();
  return (
    <motion.main
      variants={variants}
      intial="hidden"
      animate="visible  "
      exit="exit"
      transition={{ type: "linear" }}
      className={`${isToggled ? classes.expandMain : classes.shrinkMain} ${
        classes.main
      }`}
    >
      {children}
    </motion.main>
  );
};

export default Main;
