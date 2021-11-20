import classes from "./Header.module.css";
import Image from "next/image";
import { usePayContext } from "../payrollContext/context";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
const Header = () => {
  const { isToggled, toggleNav, dispatch } = usePayContext();
  return (
    <div className={classes.header}>
      <div className={classes.mobileLogo}>
        <Image src="/favicon.ico" height={30} width={30} objectFit="contain" />
      </div>
      <div className={classes.logo}>
        {" "}
        {isToggled ? (
          <Image
            objectFit="contain"
            height={30}
            width={30}
            src="/favicon.ico"
          />
        ) : (
          <Image
            objectFit="contain"
            height={50}
            width={200}
            src="/WORDMARK.png"
          />
        )}
      </div>
      <div className={classes.lgbBar} onClick={() => toggleNav()}>
        <AiOutlineAlignLeft />
      </div>
      <div
        className={classes.mBar}
        onClick={() => dispatch({ type: "TOGGLE_MOBILE" })}
      >
        <HiOutlineMenu />
      </div>
    </div>
  );
};

export default Header;
