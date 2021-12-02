import classes from "./Dashboard.module.css";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineCash } from "react-icons/hi";
import Wallet from "./Wallet";
import Cards from "./Cards";
import { Slide } from "@mui/material";
import Banner from "./Banner";
import TranxHistory from "./TranxHistory";
const Dashboard = () => {
  return (
    <div className={classes.container}>
      <div className={classes.dash_flex}>
        <Banner />
        <TranxHistory />
      </div>
    </div>
  );
};

export default Dashboard;
