import React, { useState, useEffect } from "react";
import { Tab, Tabs, Box } from "@mui/material";
import classes from "./TranxHistory.module.css";
import PropTypes from "prop-types";
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
  const [value, setValue] = useState(0);

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };

  return (
    <div className={classes.tranxCont}>
      <Box sx={{ width: "100%" }}>
        <Box
          padding="10px 20px"
          sx={{ borderBottom: 2, borderColor: "divider" }}
        >
          <h2>History</h2>
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
