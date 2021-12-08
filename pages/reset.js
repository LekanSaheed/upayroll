import React from "react";
import classes from "./reset-password.module.css";
import Image from "next/image";
import Link from "next/link";
import { HiMail } from "react-icons/hi";
import { baseUrl } from "../payrollContext/baseUrl";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = React.useState("");

  const resetPass = async (e) => {
    e.preventDefault();
    await fetch(`${baseUrl}/company/reset/mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setEmail("");
          toast.info(data.message);
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(email);
  return (
    <div className={classes.container}>
      <div>
        {" "}
        <Image src="/favicon.ico" height={50} width={50} />
      </div>
      <form className={classes.reset_form}>
        <div className={classes.header}>Reset Your Password.</div>
        <div className={classes.instructions}>
          Fear not. We will email you instructions to reset your password, make
          sure you have due to access to email provided,
        </div>
        <div className={classes.input_container}>
          <label>Email</label>
          <div className={classes.input_group}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#c3c3c3",
                fontSize: "19px",
              }}
            >
              <HiMail />
            </span>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button onClick={resetPass}>Reset Password</button>
        <span className={classes.log}>
          <Link href="/login">Return to login</Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
