import { MdMoney, MdOutlineSpaceDashboard } from "react-icons/md";
import {
  HiOutlineOfficeBuilding,
  HiOutlineUserAdd,
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineCash,
} from "react-icons/hi";
import { RiProfileLine, RiHistoryLine } from "react-icons/ri";

export const navlinks = [
  {
    text: "main",
    drops: [{ text: "Dashboard", icon: <MdOutlineSpaceDashboard />, link: "" }],
  },
  {
    text: "Employees",
    drops: [
      {
        text: "Add Employee",
        icon: <HiOutlineUserAdd />,
        link: "/add-employee",
      },
      {
        text: "All Employee",
        icon: <HiOutlineUsers />,
        link: "/all-employee",
      },
      // {
      //   text: "Department",
      //   icon: <HiOutlineOfficeBuilding />,
      //   link: "department",
      // },
    ],
  },
  {
    text: "Payroll",
    drops: [
      // { text: "Pay Group", icon: <MdMoney />, link: "pay-group" },
      { text: "Pay Run", icon: <HiOutlineCash />, link: "/pay-run" },
    ],
  },
  {
    text: "Company Details",
    drops: [{ text: "Profile", icon: <RiProfileLine />, link: "/profile" }],
  },
  {
    text: "Report",
    drops: [
      {
        text: "Transaction History",
        icon: <RiHistoryLine />,
        link: "/transaction-history",
      },
      // { text: "Staffs", icon: <HiOutlineUserGroup />, link: "staffs" },
    ],
  },
];
