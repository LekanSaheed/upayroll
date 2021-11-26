import classes from "./Banner.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { BsCheckCircleFill, BsThreeDots } from "react-icons/bs";
import HoverDrop from "./HoverDrop";
import { HiCash, HiUserAdd } from "react-icons/hi";
import { MdContactMail } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";

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

  const digit = funds.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const details = [
    { figure: "20", details: "New Employees", icon: <HiUserAdd /> },
    { figure: digit, details: "Total Balance", icon: <HiCash /> },
    { figure: "13", details: "Current Run" },
    { figure: "3 of 9", details: "Profile Info", icon: <RiProfileLine /> },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.banner_container}>
        <div className={classes.banner_title}>
          Employees{" "}
          <span className={classes.tridot} style={{ cursor: "pointer" }}>
            <BsThreeDots />
          </span>
        </div>
        <div className={classes.banner_text}>
          <div className={classes.circle}>
            <div className={classes.text}> 590</div>
          </div>
        </div>
        <span>Lol</span>
        <HoverDrop
          details={[
            {
              text: "All Employees",
              link: "/payroll/all-employee",
            },
            {
              text: "Add New",
              link: "/payroll/add-employee",
            },
          ]}
        />
      </div>
      {/* <div className={classes.wallet_container}>
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
      </div> */}

      <div className={classes.grid}>
        {details.map((i, id) => {
          return (
            <div className={classes.grid_item}>
              <div className={classes.banner_title}>
                <div></div>
                <span style={{ cursor: "pointer" }}>
                  <BsThreeDots />
                </span>
              </div>
              <div className={classes.grid_main}>
                <div className={classes.grid_icon}>{i.icon}</div>
                <div className={classes.grid_group}>
                  <div className={classes.grid_figure}>{i.figure}</div>
                  <div className={classes.grid_details}>{i.details}</div>
                </div>
              </div>

              <HoverDrop />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Banner;
