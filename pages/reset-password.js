import React from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../payrollContext/baseUrl";
import { useRouter } from "next/router";
import classes from "./new-pass.module.css";
import Image from "next/image";
import { Link } from "@material-ui/core";
const NewPassword = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const router = useRouter();
  const token = router.query.token ? router.query.token : "404";

  const newPass = async (e) => {
    e.preventDefault();
    await fetch(`${baseUrl}/company/reset/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resetToken: token,
        password: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success("Password Reset was Successful");
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            window.reload;
          }, 2000);
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(router.query);
  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <div>
          {" "}
          <Image src="/WORDMARK.png" height={30} width={124} />
        </div>
        <label>New Password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <label>Confirm Password</label>
        <input
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button
          className={
            !password || !confirmPassword || confirmPassword !== password
              ? classes.disablebtn
              : ""
          }
          disabled={
            !password || !confirmPassword || confirmPassword !== password
          }
          onClick={newPass}
        >
          Continue
        </button>
      </form>
      <Link
        color="inherit"
        style={{ marginTop: "10px" }}
        onClick={() => router.push("/login")}
      >
        Back to login
      </Link>
    </div>
  );
};
export default NewPassword;
