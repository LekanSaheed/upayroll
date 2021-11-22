import classes from "./Wallet.module.css";
import { Slide } from "@mui/material";
import Link from "next/link";
const Wallet = () => {
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
              <div className={classes.card_figure}>35,000,00.00</div>
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
