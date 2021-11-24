import classes from "./Banner.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { BsCheckCircleFill } from "react-icons/bs";

const Banner = () => {
  const [funds, setFunds] = useState(0);
  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    fetch(`${baseUrl}/company/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFunds(parseInt(data.data.balance));
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.banner_container}>
        <div className={classes.banner_title}>Employees</div>
        <div className={classes.banner_text}>
          <div className={classes.circle}>
            <div className={classes.text}> 590</div>
          </div>
        </div>
        <span>Lol</span>
      </div>
      <div className={classes.wallet_container}>
        <div className={classes.wallet_main}>
          <Link href="payroll/topup">
            <button className="btn-theme">Top up</button>
          </Link>
          <div className={classes.list}>
            <sub> Pay Period.</sub>
            <span>
              {" "}
              <BsCheckCircleFill style={{ color: "#4bc2bc" }} /> Nov 30
            </span>
            <span>
              {" "}
              <BsCheckCircleFill style={{ color: "#4bc2bc" }} /> Dec 10
            </span>
            <span>
              {" "}
              <BsCheckCircleFill style={{ color: "#4bc2bc" }} /> Dec 13
            </span>
          </div>
          <span className="btn">View All</span>
        </div>
        <div className={classes.circleContainer}>
          N
          {funds.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
    </div>
  );
};
export default Banner;
