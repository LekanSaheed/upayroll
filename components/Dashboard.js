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

          {/* <Wallet /> */}
        </div>
      </div>
      <Cards />
    </div>
  );
};

export default Dashboard;
