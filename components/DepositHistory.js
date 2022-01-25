import React, { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import moment from "moment";
const DepositHistory = (props) => {
  const [loading, setLoading] = useState(true);
  const [row, setRow] = useState([]);
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    const url = `${baseUrl}/transactions/history/deposit`;
    await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setLoading(false);
          setRow(
            data.data.sort((a, b) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            })
          );
        } else {
          console.log(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const columns = [
    {
      field: "id",
      headerName: "S/N",
      width: 90,
      headerClassName: "header",
      cellClassName: "cell",
    },

    {
      field: "amount",
      headerName: "Amount",
      width: 90,
      headerClassName: "header",
      cellClassName: "cell",
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      headerClassName: "header",
      cellClassName: (params) => {
        return params.value === "successful"
          ? "cell success"
          : params.value === "pending"
          ? "cell pending"
          : "cell failed";
      },
    },
    {
      field: "txRef",
      headerName: "Ref",
      width: 100,
      headerClassName: "header",
      cellClassName: "cell",
    },
    {
      field: "date",
      headerName: "Date Created",
      width: 230,
      headerClassName: "header",
      cellClassName: "cell",
    },
  ];
  const useStyles = makeStyles({
    root: {
      "& .header": {
        fontFamily: "poppins",
        fontWeight: "bolder",
        color: "#bb4079",
        fontSize: "12px",
        textTransform: "uppercase",
      },
      "& .cell": {
        fontFamily: "poppins",
        fontSize: "12px",
      },
      "& .success": {
        color: "#42ba96",
        // color: "#fff",
        // fontWeight: "600",
        fontFamily: "poppins",
        fontSize: "11px",
        // background: "#42ba96",
        // maxHeight: "20px !important",
        // minHeight: "20px !important",
        // borderRadius: "10px !important",
        // marginTop: "4%",
        // minWidth: "auto !important",
        // maxWidth: "auto !important",
        // lineHeight: "20px !important",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
      },
      "& .pending": {
        color: "goldenrod",
        fontFamily: "poppinsBold",
      },
      "& .failed": {
        color: "red",
        fontFamily: "poppinsBold",
      },
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ height: "65vh", width: "100%" }}>
      <DataGrid
        columns={columns.map((col) => ({
          ...col,

          filterable: false,
        }))}
        rows={row.map((r, id) => {
          return {
            ...r,
            id: id + 1,
            amount: `₦${r.amount ? r.amount.toLocaleString() : "-"}`,
            date: moment(r.createdAt).format("ddd, MMM DD YYYY hh:mm:a"),
          };
        })}
        loading={loading}
        {...props}
      />
    </div>
  );
};

export default DepositHistory;
