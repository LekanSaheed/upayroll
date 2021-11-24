import classes from "./Dashboard.module.css";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineCash } from "react-icons/hi";
import Wallet from "./Wallet";
import Cards from "./Cards";
import { Slide } from "@mui/material";
import Banner from "./Banner";
const Dashboard = () => {
  return (
    <div className={classes.container}>
      <div className={classes.dash_flex}>
        <div className={classes.dash_group}>
          <Banner />

          <Wallet />
        </div>
        <Cards />
      </div>
      <Slide
        in={true}
        style={{ transitionDelay: 200 }}
        direction="right"
        mountOnEnter
        unmountOnExit
      >
        <div className={classes.flex_container}>
          <div className={classes.flexItem}>
            <div className="flex-row justify-space">
              <div className="flex-row">
                <div className="colored-icon dash-icon">
                  <AiOutlineUsergroupAdd />
                </div>
                New Employees
              </div>
              <div>13</div>
            </div>
            <div className="flex-column">
              <div>Overall Employees</div>
              <div>3456</div>
            </div>
          </div>
          <div className={classes.flexItem}></div>
        </div>
      </Slide>
    </div>
  );
};

export default Dashboard;
