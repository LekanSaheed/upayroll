import classes from "./Banner.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { BsCheckCircleFill, BsThreeDots } from "react-icons/bs";

import { HiCash, HiUserAdd } from "react-icons/hi";
import { MdContactMail } from "react-icons/md";
import { RiProfileLine, RiSettingsLine } from "react-icons/ri";
import moment from "moment";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@mui/material";
import Skel from "./Skel";
import { useRouter } from "next/router";
const Banner = () => {
  const [funds, setFunds] = useState(0);
  const [stafflist, setStafflist] = useState([]);
  const [payrun, setPayrun] = useState([]);
  const [mStaff, setMStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  ChartJs.register(ArcElement, Tooltip, Legend);
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
          setLoading(false);
        } else {
          toast.error(data.error);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
          setLoading(false);
        } else {
          toast.error(data.error);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
          setLoading(false);
        } else {
          toast.error(data.error);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const router = useRouter();
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
      figure: payrun.length,
      details: "Active Runs",
      link: "payroll/pay-run/add-new",
      dropText: "New payment run",
      icon: <BsCheckCircleFill />,
    },
    {
      figure: "",
      details: "Employee Roles",
      icon: "",
      link: "payroll/profile",
    },
    {
      figure: "",
      details: "Account Settings",
      icon: <RiSettingsLine />,
      link: "payroll/profile",
    },
  ];
  const data = {
    labels: ["Web", "Mobile", "CyberSec"].slice(0, 12),
    datasets: [
      {
        label: "#",
        data: [12, 24, 56].slice(0, 12),
        backgroundColor: [
          "rgb(12, 58, 196)",
          "rgb(224, 0, 94)",
          "rgb(3, 104, 20)",
        ],
      },
    ],
  };

  return (
    <div className={classes.container}>
      {/* <div className={classes.banner_container}>
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
      </div> */}
      <div className={classes.balance}>
        <div className={classes.balance_main}>
          <div className={classes.balance_title}>Wallet Balance</div>
          <div className={classes.amount}>
            {loading ? (
              <Skel height={60} width={167} />
            ) : (
              <span>
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>₦</span>{" "}
                {digit}
              </span>
            )}
          </div>
          <div>
            {loading ? (
              <Skel height={70} width={130} />
            ) : (
              <Link href="/payroll/topup">
                <button className={classes.topUpbtn}>Fund Wallet</button>
              </Link>
            )}
          </div>
        </div>
        <div className={classes.balanceCircle2}></div>
      </div>

      <div className={classes.grid}>
        {details.map((i, id) => {
          return (
            <div
              key={id}
              className={`${
                i.details !== "Employee Roles"
                  ? classes.grid_item
                  : classes.doughnut_item
              } 
                   ${i.details === "Account Settings" ? classes.settings : ""}`}
              onClick={() =>
                i.details === "Account Settings"
                  ? router.push(i.link)
                  : console.log("Console Version ")
              }
            >
              {" "}
              {i.details === "Account Settings" && <div>Go to</div>}
              <span className={classes.icon}>{i.icon}</span>
              <Box display="flex" flexDirection="column">
                <div className={classes.grid_detail}>
                  {loading ? <Skel height={18} width={120} /> : i.details}
                </div>
                <div className={classes.grid_figure}>
                  {i.details !== "Account Settings" &&
                  i.details !== "Employee Roles" &&
                  loading ? (
                    <Skel height={30} width={70} />
                  ) : (
                    i.figure
                  )}{" "}
                </div>
              </Box>
              {i.details === "Employee Roles" && (
                <div className={classes.doughnut_container}>
                  <div className={classes.doughnut}>
                    {loading ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          flexDirection: "column",
                        }}
                      >
                        {" "}
                        <Skel width={200} height={12} />
                        <Skel variant="circular" width={150} height={150} />
                      </div>
                    ) : (
                      <Doughnut
                        data={data}
                        options={{
                          font: {
                            size: 3,
                          },
                          plugins: {
                            labels: {
                              render: "label",
                              arc: true,
                              position: "outside",
                            },
                            legend: {
                              align: "left",
                              labels: {
                                render: "label",
                                arc: true,
                                position: "outside",
                                boxWidth: 7,
                                boxHeight: 7,
                                borderRadius: 50,
                              },
                            },
                          },
                        }}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* {details.map((i, id) => {
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
        })} */}
      </div>
    </div>
  );
};
export default Banner;
