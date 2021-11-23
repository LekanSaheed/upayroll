import classes from "./TopUpSuccess.module.css";
import { baseUrl } from "../payrollContext/baseUrl";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
const TopUpSuccess = ({ id }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
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
        .then((res) => {
          console.log(res);
          if (success) {
            setSuccess(true);
            setMessage(res.message);
            setError("");
          } else {
            setSuccess(false);
            setError(res.error);
          }
        });
    };
    fetchResponse(
      // router.query.response && JSON.parse(router.query.response.id)
      2345778
    );
    console.log(JSON.parse(router.query.response), "router");
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.modal}>
        <div
          className={`${classes.icon} ${
            success ? classes.success : classes.error
          }`}
        >
          {success ? <BsCheckCircle /> : <AiFillCloseCircle />}
        </div>
        <div className={classes.main}>{success ? message : error}</div>
      </div>
    </div>
  );
};

export default TopUpSuccess;
