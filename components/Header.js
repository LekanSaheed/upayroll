import classes from "./Header.module.css";
import Image from "next/image";
import { usePayContext } from "../payrollContext/context";
import { AiOutlineAlignLeft } from "react-icons/ai";

const Header = () => {
  const { isToggled, toggleNav } = usePayContext();
  return (
    <div className={classes.header}>
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
      <div onClick={() => toggleNav()}>
        <AiOutlineAlignLeft />
      </div>
    </div>
  );
};

export default Header;
