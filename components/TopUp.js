import { baseUrl } from "../payrollContext/baseUrl";
import classes from "./TopUp.module.css";
import { useState, useEffect } from "react";
import CreditCardInput from "react-credit-card-input";
import Loader from "./Loader";
import { BsCashStack, BsCreditCardFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
const TopUp = () => {
  const [card_number, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry_date, setExpiryDate] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const topUp = async () => {
    setLoading(true);
    const url = `${baseUrl}/transactions/fund`;
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        card_number: card_number.replace(/ /g, ""),
        cvv: cvv,
        expiry_year: expiry_date.split("/")[1].trim(),
        expiry_month: expiry_date.split("/")[0].trim(),
        amount: amount,
        pin: pin,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          toast.success(data.message);
          setTimeout(() => {
            router.push(data.url);
          }, 2000);
        } else {
          toast.error(data.error);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const key = "FLWSECK_TEST-008e9db6eae0baaf577a898fb8afb5d9-X";
  const flutterApi = "https://api.flutterwave.com";

  return (
    <div className={classes.container}>
      {loading && <Loader />}
      <div className={classes.header}>Top up</div>
      <div className={classes.main}>
        <CreditCardInput
          cardNumberInputProps={{
            value: card_number,
            onChange: (e) => setCardNumber(e.target.value),
          }}
          cardExpiryInputProps={{
            value: expiry_date,
            onChange: (e) => {
              setExpiryDate(e.target.value);
            },
          }}
          cardCVCInputProps={{
            value: cvv,
            onChange: (e) => setCvv(e.target.value),
          }}
          fieldClassName="input"
        />

        <div className={classes.input_container}>
          <label>Amount</label>
          <div className={classes.input_group}>
            <input
              type="number"
              min="0"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className={classes.icon}>
              <BsCashStack />
            </div>
          </div>
        </div>

        <div className={classes.input_container}>
          <label>Pin</label>
          <div className={classes.input_group}>
            <input
              type="number"
              min="0"
              placeholder="Pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <div className={classes.icon}>
              <BsCreditCardFill />
            </div>
          </div>
        </div>
        <button
          disabled={!card_number || !cvv || !expiry_date || !amount || !pin}
          className={classes.btn}
          id="btn"
          style={{
            backgroundColor:
              !card_number || !cvv || !expiry_date || !amount || !pin
                ? "#efefef"
                : "#4bc2bc",
          }}
          onClick={topUp}
        >
          Top Up
        </button>
        <Link
          href={{
            pathname: `${router.pathname}/success`,
            query: { id: 23455 },
          }}
        >
          Test Slug
        </Link>
      </div>
    </div>
  );
};

export default TopUp;
