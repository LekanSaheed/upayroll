import React, { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
const DepositHistory = () => {
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
          setRow(data.data);
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
      field: "txRef",
      headerName: "Ref",
      width: 100,
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
      },
      "& .cell": {
        fontFamily: "poppins",
        fontSize: "12px",
      },
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns.map((col) => ({
          ...col,
          filterable: false,
        }))}
        rows={row.map((r, id) => {
          return { ...r, id: id + 1 };
        })}
        loading={loading}
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu
      />
    </div>
  );
};

export default DepositHistory;
