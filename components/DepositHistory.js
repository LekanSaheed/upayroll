import React, { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { DataGrid } from "@mui/x-data-grid";
const DepositHistory = () => {
  const [loading, setLoading] = useState(true);
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
    { field: "id", headerName: "S/N", width: 90 },
    { field: "txRef", headerName: "Ref", width: 100 },
    { field: "amount", headerName: "Amount", width: 90 },
    { field: "status", headerName: "Status", width: 90 },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid columns={columns} rows={[]} />
    </div>
  );
};

export default DepositHistory;
