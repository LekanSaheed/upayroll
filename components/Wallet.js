import classes from "./Wallet.module.css";
import { Slide } from "@mui/material";
import Link from "next/link";
import { baseUrl } from "../payrollContext/baseUrl";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { HiOutlineCash } from "react-icons/hi";
const Wallet = () => {
  return (
    <Slide in={true} direction="down" mountOnEnter unmountOnExit>
      <div className={classes.container}>
        <div className={`${classes.wallet_container} justify-space`}>
          <div className={`${classes.wallet_header} flex-row justify-space`}>
            <div>New Employees</div>
          </div>
          <div style={{}} className={`flex-row ${classes.account_container}`}>
            <div>10</div>
          </div>
        </div>
        <div className={classes.card_container}>
          <div className="flex-row justify-space">
            <div className="flex-row">
              <div className="colored-icon dash-icon">
                <HiOutlineCash />
              </div>
              Salaries
            </div>{" "}
            <div>13</div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Wallet;
