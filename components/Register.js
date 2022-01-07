import { useState } from "react";
import classes from "./Register.module.css";
import Loader from "./Loader";
import { baseUrl } from "../payrollContext/baseUrl";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Checkbox } from "@material-ui/core";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [reg_no, setRegNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    const url = `${baseUrl}/company/register`;
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        username,
        address,
        reg_no,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          setName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setPhone("");
          setAddress("");
          setRegNo("");
          setShowPass(false);
        } else {
          toast.error(data.error);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.container}>
      {loading && <Loader />}
      <div className={classes.flex}>
        <div className={classes.details}>
          <div>
            <b>Payroll system</b>
            <br />
          </div>
          <img src="/wallet.svg" />
          <span>
            Powered by
            <a style={{ fontWeight: "bold", color: "teal" }}> Uhuru Pay.</a>
          </span>
        </div>
        <div className={classes.flex1}>
          <div style={{ fontWeight: "700", fontSize: "22px" }}>Register</div>
          <form className={classes.form}>
            <div className={classes.input_container}>
              <label className={classes.label}>Name</label>
              <input
                placeholder="Company name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength="30"
              />
            </div>
            <div className={classes.input_container}>
              <label className={classes.label}>Choose a username</label>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength="13"
              />
            </div>
            <div className={classes.input_container}>
              <label className={classes.label}>Email</label>
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.input_container}>
              <label className={classes.label}>Phone</label>
              <input
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength="15"
                type="number"
              />
            </div>
            <div className={classes.input_container}>
              <label className={classes.label}>Address</label>
              <input
                placeholder="Company Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className={classes.input_container}>
              <label className={classes.label}>Registration Number</label>
              <input
                placeholder="Reg No"
                value={reg_no}
                onChange={(e) => setRegNo(e.target.value)}
                maxLength="15"
              />
            </div>
            <div className={classes.input_container}>
              <label className={classes.label}>Choose a strong password</label>
              <input
                placeholder="Password"
                value={password}
                type={showPass ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={classes.input_container}>
              <label className={classes.label}>Confirm password</label>
              <input
                placeholder="Confirm Password"
                type={showPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div style={{ fontSize: "11px" }}>
              <Checkbox onClick={() => setShowPass(!showPass)} /> Show Password
            </div>
            <div></div>
            <button
              className={
                password !== confirmPassword ||
                !name ||
                !username ||
                !email ||
                !phone ||
                !reg_no ||
                !address ||
                !password ||
                !confirmPassword
                  ? classes.disabled
                  : ""
              }
              disabled={
                password !== confirmPassword ||
                !name ||
                !username ||
                !email ||
                !phone ||
                !reg_no ||
                !address ||
                !password ||
                !confirmPassword
              }
              onClick={register}
            >
              Sign Up
            </button>
          </form>
          <div style={{ fontSize: "13px" }}>
            Have an account?{"  "}
            <span
              onClick={() => router.push("/login")}
              style={{ color: "teal", fontWeight: "600", cursor: "pointer" }}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
