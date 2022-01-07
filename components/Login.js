import { useState, useEffect } from "react";
import { useAuthDispatch, useAuthState } from "../payrollContext/AuthContext";
import { toast } from "react-toastify";
import { baseUrl } from "../payrollContext/baseUrl";
import { useRouter } from "next/router";
import classes from "./Login.module.css";
import Loader from "./Loader";
import { RiUser2Line } from "react-icons/ri";
import Image from "next/image";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { Checkbox } from "@material-ui/core";
import Head from 'next/head'
const Login = () => {
  const router = useRouter();
  useEffect(() => {
    if (authenticated) {
      router.push("/payroll");
    }
  }, []);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const dispatch = useAuthDispatch();
  const { user, authenticated } = useAuthState();

  const login = async (e) => {
    setLoading(true);
    e.preventDefault();
    const url = `${baseUrl}/company/login`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.trim().toLowerCase(),
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const token = data.token;
          setLoading(false);
          //
          fetch(`${baseUrl}/company/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setLoading(false);
                localStorage.setItem("token", token);
                toast.success("Successfully logged in");
                dispatch("LOGIN", data.data);
                router.push("/payroll");
                console.log(user);
              } else {
                setLoading(false);
                toast.error(data.error);
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
              toast.error("Something went wrong");
            });
        } else {
          setLoading(false);
          toast.error(data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Something went wrong");
      });
    setLoading(false);
  };
  return (
    <div className={classes.container}>
    <Head>
    <meta name='robots' content='all'/>
    <title>Uhuru Pay payroll login | Uhuru pay</title>
    <meta name='description' content='Login to access your account' key='desc'/>
    </Head>
      {loading && <Loader />}
      <div className={classes.flex_row}>
        <form className={classes.login_form}>
          <div className={classes.header}>Login to access your account</div>
          <div className={classes.formChild}>
            <div className={classes.input}>
              <label>Username</label>
              <div className={classes.input_group}>
                <div className={classes.icon}>
                  <AiOutlineUser />
                </div>
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
            <div className={classes.input}>
              <label>Password</label>
              <div className={classes.input_group}>
                <div className={classes.icon}>
                  <AiOutlineLock />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div style={{ fontSize: "13px" }}>
              <Checkbox onClick={() => setShowPass(!showPass)} /> Show Password
            </div>
            <div className={classes.pass}>
              <span onClick={() => router.push("/reset")}>Reset Password</span>
            </div>
            <button
              onClick={login}
              className={
                !username || !password || loading ? classes.logBtn : ""
              }
              disabled={!username || !password || loading}
            >
              Login
            </button>
          </div>
        </form>
        <div style={{ padding: "10px 0", fontSize: "14px" }}>
          Not registered yet?{" "}
          <span
            style={{ color: "teal", cursor: "pointer" }}
            onClick={() => router.push("/signup")}
          >
            {" "}
            Register
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
