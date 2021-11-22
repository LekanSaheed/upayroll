import classes from "./Wallet.module.css";
import { Slide } from "@mui/material";
import Link from "next/link";
import { baseUrl } from "../payrollContext/baseUrl";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
const Wallet = () => {
  const [funds, setFunds] = useState(0);
  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    fetch(`${baseUrl}/company/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFunds(parseInt(data.data.balance));
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Slide in={true} direction="down" mountOnEnter unmountOnExit>
      <div className={classes.container}>
        <div className={`${classes.wallet_container} justify-space`}>
          <div className={`${classes.wallet_header} flex-row justify-space`}>
            <div>NGN Wallet</div>
            <Link href="payroll/topup">
              <button className="btn-theme">Top up</button>
            </Link>
          </div>
          <div
            style={{ alignItems: "flex-start" }}
            className={`flex-row ${classes.account_container}`}
          >
            <div className={`flex-column ${classes.wallet_group}`}>
              <span className={classes.title}>LEDGER BALANCE</span>
              <div className={classes.figure}>NGN0.00</div>
              <span className={classes.details}>
                This is your balance in book
              </span>
            </div>
            <div className={`flex-column ${classes.wallet_group}`}>
              <span className={classes.title}>AVAILABLE BALANCE</span>
              <div className={classes.figure}>NGN0.00</div>
              <span className={classes.details}>
                This is your transferrable balance
              </span>
            </div>
          </div>
        </div>
        <div className={classes.card_container}>
          <div className={classes.card_header}>Your Wallet</div>
          <div className={classes.shadow}>
            <div className={classes.card}>
              <div>Total Balance</div>
              <div className={classes.card_figure}>
                {funds.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className={` ${classes.backdrop}`}></div>
          </div>

          <div></div>
        </div>
      </div>
    </Slide>
  );
};

export default Wallet;
