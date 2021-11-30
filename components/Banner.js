import classes from "./Banner.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { BsCheckCircleFill, BsThreeDots } from "react-icons/bs";
import HoverDrop from "./HoverDrop";
import { HiCash, HiUserAdd } from "react-icons/hi";
import { MdContactMail } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import moment from "moment";

const Banner = () => {
  const [funds, setFunds] = useState(0);
  const [stafflist, setStafflist] = useState([]);
  const [payrun, setPayrun] = useState([]);
  const [mStaff, setMStaff] = useState([]);

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
    fetchStaffs();
    fetchRun();
  }, []);

  const fetchStaffs = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    await fetch(`${baseUrl}/staff/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStafflist(data.data);
          addedEmployee(data.data);
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchRun = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    await fetch(`${baseUrl}/payrun/list`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const checkActive = data.data.filter((aRun) => {
            return aRun.status === "active";
          });
          setPayrun(checkActive);
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const digit = funds.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();
  const currentMonth = month[date.getMonth()];

  const addedEmployee = async (data) => {
    data.map((aStaff) => {
      let checkDate = moment(aStaff.created_At, "YYYY/MM/DD");
      let staffAddedDate = checkDate.format("M");
      let getCurrentDate = date.getMonth() + 1;
      if (getCurrentDate == staffAddedDate) {
        // console.log(aStaff);
        mStaff.push(aStaff);
      }
    });
  };

  const details = [
    {
      figure: mStaff.length,
      details: `Added Employees in ${currentMonth}`,
      icon: <HiUserAdd />,
      link: "payroll/add-employee",
      dropText: "Add employee",
    },
    {
      figure: digit,
      details: "Total Balance",
      icon: <HiCash />,
      link: "payroll/topup",
      dropText: "Top up",
    },
    {
      figure: payrun.length,
      details: "Active Run",
      link: "payroll/pay-run/add-new",
      dropText: "New payment run",
    },
    {
      figure: "3 of 9",
      details: "Profile Info",
      icon: <RiProfileLine />,
      link: "payroll/profile",
      dropText: "Edit profile",
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.banner_container}>
        <div className={classes.banner_title}>
          Total of Employees{" "}
          <span className={classes.tridot} style={{ cursor: "pointer" }}>
            <BsThreeDots />
          </span>
        </div>
        <div className={classes.banner_text}>
          <div className={classes.circle}>
            <div className={classes.text}>{stafflist.length}</div>
          </div>
        </div>
        <span></span>
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
            <div key={id} className={classes.grid_item}>
              <div className={classes.banner_title}>
                <div></div>
                <span className={classes.tridot} style={{ cursor: "pointer" }}>
                  <BsThreeDots />
                </span>
                <HoverDrop details={[{ link: i.link, text: i.dropText }]} />
              </div>
              <div className={classes.grid_main}>
                <div className={classes.grid_icon}>{i.icon}</div>
                <div className={classes.grid_group}>
                  <div className={classes.grid_figure}>{i.figure}</div>
                  <div className={classes.grid_details}>{i.details}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Banner;
