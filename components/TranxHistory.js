import React, { useState, useEffect } from "react";
import { Tab, Tabs, Box, Avatar } from "@mui/material";
import classes from "./TranxHistory.module.css";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

import DepositHistory from "./DepositHistory";
import PayoutHistory from "./PayoutHistory";
const TabPanel = (props) => {
  const { value, children, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={index}
      aria-labelledby={`Transaction-History-Tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
const TranxHistory = () => {
  const useStyles = makeStyles({
    grade: {
      backgroundImage: "linear-gradient(to left, #4bc2bc, #4bc2bc)",
      color: "#fff",
    },
    root: {
      fontFamily: "poppins !important",
      "& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
        color: "#4bc2bc",
      },
      "& .css-1aquho2-MuiTabs-indicator": {
        backgroundColor: "#4bc2bc",
      },
      "& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root": {
        fontFamily: "poppins !important",
        fontWeight: "bold",
      },
      "& .css-1z4p5c-MuiDataGrid-root .MuiDataGrid-row": {
        marginBottom: "5px",
        borderTop: "solid 1px #fafafa !important",
        boxShadow: "0 0 3px rgba(0 0 0 /17%)",
      },
    },
  });
  const mui_class = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };

  return (
    <div className={classes.tranxCont}>
      <Box className={mui_class.root} sx={{ width: "100%" }}>
        <Box
          padding="10px 20px"
          sx={{
            borderBottom: 2,
            borderColor: "divider",
            borderTopLeftRadius: "10px",
          }}
          className={mui_class.grade}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <h2>History</h2>
          <Avatar
            sx={{
              backgroundColor: "#fff",
              padding: "10px",
              height: 35,
              width: 35,
            }}
            src="/favicon.ico"
          />
        </Box>
        <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Deposit" id={0} />
            <Tab label="Payout" id={1} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <DepositHistory
            disableColumnFilter
            disableColumn
            Selector
            disableColumnMenu
            pageSize={10}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PayoutHistory />
        </TabPanel>
      </Box>
    </div>
  );
};

export default TranxHistory;
