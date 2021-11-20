import classes from "./Wrapper.module.css";
import { navlinks } from "./navLinks";
import Header from "./Header";
import Main from "./Main";
import Nav from "./Nav";
import Link from "next/link";
import { usePayContext } from "../payrollContext/context";
import { Slide } from "@mui/material";
import { useRouter } from "next/router";
const Wrapper = ({ children }) => {
  const router = useRouter();
  const { dispatch, isToggledMobile } = usePayContext();
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header />
        <Slide
          in={isToggledMobile}
          appear={isToggledMobile}
          direction="down"
          mountOnEnter
          unmountOnExit
        >
          <div className={`${classes.mNav} ${classes.showMobile}`}>
            {navlinks.map((nav, id) => {
              return (
                <div className={classes.navSections} key={id}>
                  <div className={`${classes.drops}`}>
                    {nav.drops.map((aNav, id) => {
                      return (
                        <div
                          onClick={async () => {
                            await dispatch({ type: "CLOSE_MOBILE" });
                            router.push("/payroll/" + aNav.link);
                          }}
                          key={id}
                        >
                          <a className={classes.link}>
                            <div className={classes.icon}>{aNav.icon}</div>
                            {aNav.text}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Slide>
      </div>
      <div className={classes.mainFlex}>
        <Nav />
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export default Wrapper;
