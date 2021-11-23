import classes from "./TopUpSuccess.module.css";
import { baseUrl } from "../payrollContext/baseUrl";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

const TopUpSuccess = ({ id }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  React.useEffect(() => {
    const params = JSON.parse(router.query.response);
    const url = `${baseUrl}/transactions/success?id=${
      params.id ? params.id : 2345778
    }`;
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
          if (res.success) {
            setSuccess(true);
            setMessage("Transaction Successful");
            toast.success(res.message);
            setError("");
          } else {
            setSuccess(false);
            toast.error("");
            setError(res.error);
          }
        });
    };

    fetchResponse();
    console.log(params.id, "router");
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.modal}>
        <div
          className={`${classes.icon} ${success ? classes.success : ""} ${
            error ? classes.error : ""
          }`}
        >
          {success && <BsCheckCircle />}
          {error && <AiFillCloseCircle />}
        </div>
        <div className={classes.main}>{success ? message : error}</div>
      </div>
      {error && <Link href="/payroll/topup">Go Back</Link>}
      {success && <Link href="/payroll">Done</Link>}
    </div>
  );
};

export default TopUpSuccess;
