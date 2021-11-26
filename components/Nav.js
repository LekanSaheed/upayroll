import { usePayContext } from "../payrollContext/context";
import classes from "./Nav.module.css";
import Link from "next/link";
import { navlinks } from "./navLinks";
import { Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const Nav = () => {
  const useStyles = makeStyles({
    tooltip: {
      cursor: "pointer",
    },
  });
  const myClass = useStyles();
  const { isToggled } = usePayContext();
  return (
    <div
      className={`${isToggled ? classes.shrink : classes.showNav} ${
        classes.lgNav
      }`}
    >
      <div className={classes.nav_container}>
        {navlinks.map((nav, id) => {
          return (
            <div className={classes.navSections} key={id}>
              {!isToggled && (
                <div className={classes.section_text}>{nav.text}</div>
              )}
              <div
                className={`${classes.drops} ${
                  isToggled ? classes.removeMargin : ""
                }`}
              >
                {nav.drops.map((aNav, id) => {
                  return (
                    <Link key={id} href={"/payroll/" + aNav.link}>
                      <Tooltip
                        arrow
                        placement="right"
                        title={isToggled ? aNav.text : ""}
                        className={myClass.tooltip}
                      >
                        <a className={classes.link}>
                          <div className={classes.icon}>{aNav.icon}</div>
                          {!isToggled && aNav.text}
                        </a>
                      </Tooltip>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Nav;
