import { usePayContext } from "../payrollContext/context";
import classes from "./Nav.module.css";
import Link from "next/link";
import { navlinks } from "./navLinks";
import { Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { BiLogOut } from "react-icons/bi";
import { useAuthDispatch } from "../payrollContext/AuthContext";
const Nav = () => {
  const dispatch = useAuthDispatch();
  const router = useRouter();
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
                    <Link key={id} href={"/payroll" + aNav.link}>
                      <Tooltip
                        arrow
                        placement="right"
                        title={isToggled ? aNav.text : ""}
                        className={myClass.tooltip}
                      >
                        <a
                          className={`${classes.link} ${
                            router.pathname === "/payroll" + aNav.link
                              ? classes.active
                              : ""
                          }`}
                        >
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
      <button className={classes.logout} onClick={() => dispatch("LOGOUT")}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BiLogOut />
        </div>{" "}
        {!isToggled ? "Logout" : ""}
      </button>
    </div>
  );
};

export default Nav;
