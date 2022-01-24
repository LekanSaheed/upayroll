import React, { useState } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
const PayoutHistory = () => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const [payout, setPayout] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchPayoutHistory = async () => {
      const url = `${baseUrl}/transactions/history/payout`;
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setPayout(data.data);
            setLoading(false);
          } else {
            toast.error("Error Fetching payput history");
            setLoading(false);
          }
          console.log(data);
        })
        .catch((err) => console.log(err));
    };
    fetchPayoutHistory();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "S/N",
      width: 90,
      headerClassName: "header",
      cellClassName: "cell",
    },
    {
      field: "reference",
      headerName: "Ref",
      width: 140,
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
      field: "narration",
      headerName: "Narration",
      width: 180,
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
      "& .success": {
        color: "green",
        fontWeight: "600",
        fontFamily: "poppinsBold",
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
    <div>
      Payout history here
      <div className={classes.root} style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          columns={columns}
          loading={loading}
          rows={payout.map((pay, id) => {
            return {
              ...pay,
              id: id + 1,
            };
          })}
        />
      </div>
    </div>
  );
};

export default PayoutHistory;
