import classes from "./TopUpSuccess.module.css";
import { baseUrl } from "../payrollContext/baseUrl";
import { BsCheckCircle } from "react-icons/bs";
import React from "react";

const TopUpSuccess = ({ id }) => {
  const url = `${baseUrl}/transactions/success?id=${id}`;
  React.useEffect(() => {
    const fetchResponse = async () => {
      const token =
        typeof window !== "undefined" && localStorage.getItem("token");
      await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    };
    fetchResponse("3A2644903");
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.modal}>
        <div className={classes.icon}>
          <BsCheckCircle />
        </div>
        <div className={classes.main}>Cash Deposit Successful</div>
      </div>
    </div>
  );
};

export default TopUpSuccess;
