import classes from "./Wallet.module.css";
import { Slide } from "@mui/material";
const Wallet = () => {
  return (
    <Slide
      style={{ transitionDelay: 200 }}
      in={true}
      direction="right"
      mountOnEnter
      unmountOnExit
    >
      <div className={`${classes.wallet_container} justify-space`}>
        <div className={`${classes.wallet_header} flex-row justify-space`}>
          <div>NGN Wallet</div>
          <button className="btn-theme">Top up</button>
        </div>
        <div
          style={{ alignItems: "flex-start" }}
          className={`flex-row justify-space ${classes.account_container}`}
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
          <div className={`flex-column ${classes.wallet_group}`}>
            <span className={classes.title}>BANK ACCOUNT</span>
            <div>XMAP BANK (012345678)</div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Wallet;
