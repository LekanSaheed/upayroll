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
  return (
    <div>
      <DataGrid />
    </div>
  );
};

export default DepositHistory;
