import React, { useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import classes from "./Checkout.module.css";
import { useAuthState } from "../payrollContext/AuthContext";

const Checkout = ({ pub_key }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useAuthState();
  console.log(user);
  const config = {
    public_key: pub_key,
    tx_ref: Date.now(),
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    redirect_url: "https://upayroll.vercel.app/payroll/topup/successful",
    customer: {
      email: user.email,
      phonenumber: user.phone,
      name: user.name,
    },
    customizations: {
      title: "Fund Payroll",
      description: "Payment to fund payroll wallet",
      logo: "../public/favicon.ico",
      //   logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  React.useEffect(() => {
    console.log(pub_key);
  }, []);
  const handleFlutterPayment = useFlutterwave(config);

  return (
    <form className={classes.form}>
      <div className={classes.input_container}>
        <label>Amount</label>
        <input
          value={amount}
          placeholder="Amount"
          type="number"
          min="0"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button
        className={classes.pay_btn}
        onClick={(e) => {
          e.preventDefault();
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Continue
      </button>
    </form>
  );
};
export default Checkout;
