import Link from "next/link";
import {
  Modal,
  DialogContent,
  Slide,
  IconButton,
  Dialog,
  Button,
  Box,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
  Checkbox,
  AppBar,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material";
import Skel from "./Skel";
import PropTypes from "prop-types";
import Loader from "./Loader";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { MdClose } from "react-icons/md";
import MySelect from "./MySelect";

const PayGroupComp = () => {
  useEffect(() => {
    fetchRuns();
    fetchStaffs();
  }, []);
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const not = (a, b) => {
    return a.filter((value) => b.indexOf(value) === -1);
  };
  const intersection = (a, b) => {
    return a.filter((value) => b.indexOf(value) !== -1);
  };
  const [runlist, setRunList] = useState([]);
  const [row, setRow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [start_date, setStartDate] = useState([]);
  const [end_date, setEndDate] = useState([]);
  const [intervals, setIntervals] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [dataset, setDataset] = useState({});
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(employees);
  const [right, setRight] = useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const TabPanel = (props) => {
    const { value, children, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={index}
        aria-labelledby={`Payrun-Tab-${index}`}
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
  const [value, setValue] = useState(0);

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };

  const editPayrun = async (id) => {
    toast.loading("Editing...");
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    await fetch(`${baseUrl}/payrun/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        start_date: start_date,
        end_date: end_date,
        interval: intervals.value && intervals.value,
        payments: right.map((c) => {
          return {
            staff: c._id,
            amount: c.salary,
          };
        }),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.dismiss();
          toast.success("Payrun Edited Successfully");
          setModal(false);
          fetchRuns();
        } else {
          toast.dismiss();
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  const setFrequency = (frequency) => {
    if (frequency === 1) {
      return "Daily";
    }
    if (frequency === 7) {
      return "Weekly";
    }
    if (frequency === 14) {
      return "Bi-Weekly";
    }
    if (frequency === 30) {
      return "Monthly";
    }
    if (frequency === 365) {
      return "Yearly";
    }
  };
  console.log({
    payments: right.map((c) => {
      return {
        staff: c._id,
        amount: c.amount,
      };
    }),
  });
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
          setEmployees(data.data);
          console.log(data.data);
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(employees);
  const fetchRuns = async () => {
    const url = `${baseUrl}/payrun/list`;
    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRunList(data.data);
          const myRow = data.data.map((row, id) => {
            return {
              ...row,
              id: id + 1,

              start_date: moment(row.start_date).format("ddd, DD MMM yyyy"),
              end_date: moment(row.end_date).format("ddd, DD MMM yyyy"),
              interval: setFrequency(row.interval),
              status: row.status,
              employee_num: row.payments.length,
              created_At: moment(row.created_At).format(
                "ddd, DD MMM yyyy hh:mm a"
              ),
            };
          });
          setLoading(false);

          setRow(myRow);
        } else {
          toast.error(data.error);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const useStyles = makeStyles({
    root: {
      "& .upHeader": {
        fontWeight: "800",
        background: "teal",
        color: "#fff",
        fontFamily: "circularStd",
      },
      "& .cell": {
        fontFamily: "circularStd",
      },
      "& .suspended": {
        color: "red",
      },
      "& .active": {
        color: "green",
      },
      "& .paused": {
        color: "goldenrod",
      },
    },
    backdrop: {
      background: "#4bc2bc",
    },
    diagContent: {
      padding: "0 !important",
    },
    appBar: {
      fontSize: "12px !important",
      fontFamily: "poppins !important",
    },
    list: {
      fontSize: "11px !important",
      fontFamily: "poppins !important",
    },
    lCont: {
      fontSize: "11px !important",
      fontFamily: "poppins !important",
      "& .MuiTypography-root": {
        fontSize: "11px !important",
        fontFamily: "poppins !important",
      },
      "& .MuiListItemIcon-root": {
        minWidth: "0",
      },
    },
    btn: {
      background: "#4bc2bc !important",
      "&:hover": {
        background: "#4bc2bc24 !important",
      },
    },
  });
  const classes = useStyles();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      editable: true,
      headerClassName: "upHeader",
      cellClassName: "cell",
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 150,
      editable: true,
      headerClassName: "upHeader",
      cellClassName: "cell",
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 150,
      editable: true,
      headerClassName: "upHeader",
      cellClassName: "cell",
    },
    {
      field: "interval",
      headerName: "Frequency",
      width: 150,
      editable: true,
      headerClassName: "upHeader",
      cellClassName: "cell",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      headerClassName: "upHeader",
      cellClassName: (params) => {
        return params.value === "paused"
          ? "cell paused"
          : params.value === "active"
          ? "cell active"
          : "cell suspended";
      },
    },
    {
      field: "employee_num",
      headerName: "No of Employees",
      width: 150,
      editable: true,
      headerClassName: "upHeader",
      cellClassName: "cell",
    },
    {
      field: "created_At",
      headerName: "Creation Date",
      width: 150,
      editable: true,
      headerClassName: "upHeader",
      cellClassName: "cell",
    },
  ];

  const Transition = React.forwardRef(function Transition(props, ref) {
    return (
      <Slide
        direction="up"
        style={{ transitionDelay: 300 }}
        ref={ref}
        {...props}
      />
    );
  });

  const pauseRun = async (run) => {
    setLoading(true);
    const url = `${baseUrl}/payrun/${run}/pause`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          toast.success("Payrun paused");
          fetchRuns();
          setModal(false);
        } else {
          setLoading(false);
          toast.error(data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const resumeRun = async (run) => {
    setLoading(true);
    const url = `${baseUrl}/payrun/${run}/resume`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          toast.success("Payrun resumed");
          fetchRuns();
          setModal(false);
        } else {
          setLoading(false);
          toast.error(data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const suspendRun = async (run) => {
    setLoading(true);
    const url = `${baseUrl}/payrun/${run}/suspend`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          toast.success("Payrun suspended");
          fetchRuns();
          setModal(false);
        } else {
          setLoading(false);
          toast.error(data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const options = [
    { label: "Daily", value: 1 },
    { label: "Weekly", value: 7 },
    { label: "Bi-Weekly", value: 14 },
    { label: "Monthly", value: 30 },
    { label: "Yearly", value: 365 },
  ];

  // Custom List

  const customList = (items, label) => (
    <Paper lg={200} sx={{ width: 180, height: 210, overflow: "auto" }}>
      <AppBar
        className={classes.appBar}
        style={{ padding: "7px", background: "#4bc2bc" }}
        position="static"
      >
        {label}
      </AppBar>
      <List dense component="div" role="list">
        {items.map((value, idx) => {
          const id = `transfer-list-item-${value}-label`;
          return loading ? (
            <Skel key={idx} />
          ) : (
            <ListItem
              key={idx}
              role="listitem"
              button
              onClick={handleToggle(value)}
              className={classes.lCont}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  size="small"
                  inputProps={{
                    "aria-labelledby": id,
                  }}
                />
              </ListItemIcon>
              {loading ? (
                // <div
                //   style={{
                //     height: "100%",
                //     width: "100%",
                //     display: "flex",
                //     alignItems: "center",
                //     justifyContent: "center",
                //   }}
                // >
                <CircularProgress />
              ) : (
                // </div>
                <ListItemText
                  id={id}
                  className={classes.list}
                  primary={`${`${value.firstname} ${value.lastname}`}`}
                />
              )}
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  const intervalFunc = (int) => {
    if (int === 1) {
      return { label: "Daily", value: 1 };
    }
    if (int === 7) {
      return { label: "Weekly", value: 7 };
    }
    if (int === 14) {
      return { label: "Bi-Weekly", value: 14 };
    }
    if (int === 30) {
      return { label: "Monthly", value: 30 };
    }
    if (int === 365) {
      return { label: "Yearly", value: 365 };
    }
  };

  const handleUpdate = async (itm) => {
    setModal(true);
    setLoading(true);
    const id = row.filter((run) => run.id === itm[0]);
    const init_date = runlist
      .filter((run) => run._id === id[0]._id)
      .map((run) => {
        return {
          start: moment(run.start_date).format("YYYY-MM-DD"),
          end: moment(run.end_date).format("YYYY-MM-DD"),
          interval: intervalFunc(run.interval),
        };
      });

    await setSelected({
      ...id[0],
      start_date: init_date[0].start,
      end_date: init_date[0].end,
      interval: init_date[0].interval,
    });
    setStartDate(init_date[0].start);
    setEndDate(init_date[0].end);
    setIntervals(init_date[0].interval);
    const currentRunStaffId = id[0].payments.map((stf) => {
      return stf.staff;
    });

    const filtered = employees.filter((emp) => {
      return !currentRunStaffId.includes(emp._id);
    });

    const currentStaff = employees.filter((emp) => {
      return currentRunStaffId.includes(emp._id);
    });
    await setLeft(filtered);

    setRight(currentStaff);

    setLoading(false);

    // setSelected(option);
  };
  return (
    <>
      {loading && <Loader />}
      <Box marginBottom="20px" display="flex" justifyContent="space-between">
        <div>Pay Run List</div>
        <Link href="/payroll/pay-run/add-new">
          <Button
            color="primary"
            variant="contained"
            style={{ borderRadius: "30px", background: "#4bc2bc" }}
          >
            + Create New
          </Button>
        </Link>
      </Box>
      <Paper>
        <div style={{ height: 400, width: "100%" }} className={classes.root}>
          <DataGrid
            density="compact"
            columns={columns}
            rows={runlist.map((row, id) => {
              return {
                ...row,
                id: id + 1,
                start_date: moment(row.start_date).format("ddd, DD MMM yyyy"),
                end_date: moment(row.end_date).format("ddd, DD MMM yyyy"),
                interval: setFrequency(row.interval),
                status: row.status,
                employee_num: row.payments.length,
                created_At: moment(row.created_At).format(
                  "ddd, DD MMM yyyy hh:mm a"
                ),
              };
            })}
            rowsPerPageOptions={[5, 10, 25, 100]}
            headerHeight={70}
            loading={loading}
            onSelectionModelChange={handleUpdate}
            onRowClick={() => setLoading(true)}
          />
        </div>
        <Modal
          open={modal}
          BackdropProps={{ style: { background: "rgba(255,255,255, 0.6)" } }}
        >
          <Dialog
            PaperProps={{
              style: {
                color: "#fff",
                verticalAlign: "bottom",
                padding: "0 ",
              },
            }}
            // TransitionComponent={Transition}
            open={modal}
            fullWidth={true}
          >
            <DialogContent className={classes.diagContent}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                backgroundColor="#4bc2bc"
                padding="18px"
              >
                Payrun details{" "}
                <IconButton
                  onClick={() => {
                    setModal(false);
                    setValue(0);
                  }}
                  size="small"
                >
                  <MdClose style={{ color: "#fff" }} />
                </IconButton>
              </Box>
              {selected.status !== "suspended" ? (
                <>
                  <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange}>
                      <Tab label="Edit" id={0} />
                      <Tab
                        label={
                          selected.status === "paused" ? "Resume" : "Pause"
                        }
                        id={1}
                      />

                      <Tab label="Suspend" id={2} />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      padding="20px"
                      gap="20px"
                      color="#fff !important"
                    >
                      <Box display="flex" flexDirection="column">
                        <label style={{ color: "black" }}>Start Date</label>
                        <TextField
                          disabled={true}
                          size="small"
                          type="date"
                          fullWidth={true}
                          onChange={(e) => setStartDate(e.target.value)}
                          value={start_date}
                        />
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <label style={{ color: "black" }}>End Date</label>
                        <TextField
                          size="small"
                          type="date"
                          fullWidth={true}
                          onChange={(e) => setEndDate(e.target.value)}
                          value={end_date}
                        />
                      </Box>
                      <MySelect
                        options={options}
                        value={intervals}
                        onChange={(e) => setIntervals(e)}
                      />
                      <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item> {customList(left, "Employee List")}</Grid>
                        <Grid item>
                          <Grid
                            container
                            direction="column"
                            alignItems="center"
                          >
                            <Button
                              sx={{ my: 0.5 }}
                              variant="outlined"
                              size="small"
                              onClick={handleAllRight}
                              disabled={left.length === 0}
                              aria-label="move all right"
                            >
                              &gt;&gt;
                            </Button>
                            <Button
                              sx={{ my: 0.5 }}
                              variant="outlined"
                              size="small"
                              onClick={handleCheckedRight}
                              disabled={leftChecked.length === 0}
                              aria-label="move selected right"
                            >
                              &gt;
                            </Button>
                            <Button
                              sx={{ my: 0.5 }}
                              variant="outlined"
                              size="small"
                              onClick={handleCheckedLeft}
                              disabled={rightChecked.length === 0}
                              aria-label="move selected left"
                            >
                              &lt;
                            </Button>
                            <Button
                              sx={{ my: 0.5 }}
                              variant="outlined"
                              size="small"
                              onClick={handleAllLeft}
                              disabled={right.length === 0}
                              aria-label="move all left"
                            >
                              &lt;&lt;
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid item>
                          {customList(right, "Selected Employees")}
                        </Grid>
                      </Grid>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ background: "#4bc2bc" }}
                        onClick={() => editPayrun(selected._id)}
                      >
                        Edit Payrun
                      </Button>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Box padding="20px">
                      <div
                        style={{
                          fontSize: "23px",
                          textAlign: "center",
                          color: "black",
                          margin: "20px",
                        }}
                      >
                        Do you want to{" "}
                        {selected.status === "paused" ? "resume" : "pause"} this
                        payrun?
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#bababa",
                          textAlign: "center",
                        }}
                      >
                        {selected.status === "paused"
                          ? ""
                          : "You can pause now and resume later."}
                      </div>
                    </Box>{" "}
                    <Box
                      backgroundColor="#4bc2bc"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        variant="contained"
                        style={{ padding: "20px", background: "#4bc2bc" }}
                        onClick={() => {
                          setModal(false);
                          setValue(0);
                        }}
                        className={classes.btn}
                      >
                        No
                      </Button>
                      {selected.status === "paused" ? (
                        <Button
                          className={classes.btn}
                          variant="contained"
                          onClick={() => resumeRun(selected._id)}
                          style={{ padding: "20px", background: "#4bc2bc" }}
                        >
                          Yes
                        </Button>
                      ) : (
                        <Button
                          className={classes.btn}
                          variant="contained"
                          onClick={() => pauseRun(selected._id)}
                          style={{ padding: "20px", background: "#4bc2bc" }}
                        >
                          Yes
                        </Button>
                      )}
                    </Box>
                  </TabPanel>
                  {selected.status !== "suspended" && (
                    <TabPanel value={value} index={2}>
                      <Box padding="20px">
                        <div
                          style={{
                            fontSize: "23px",
                            textAlign: "center",
                            color: "black",
                            margin: "20px",
                          }}
                        >
                          Do you want to Suspend this payrun?
                        </div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: "#bababa",
                            textAlign: "center",
                          }}
                        >
                          You cannot resume a payrun after suspending.
                        </div>
                      </Box>{" "}
                      <Box
                        backgroundColor="#4bc2bc"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Button
                          variant="contained"
                          style={{ padding: "20px", background: "#4bc2bc" }}
                          onClick={() => {
                            setModal(false);
                            setValue(0);
                          }}
                          className={classes.btn}
                        >
                          No
                        </Button>
                        <Button
                          className={classes.btn}
                          variant="contained"
                          onClick={() => suspendRun(selected._id)}
                          style={{ padding: "20px", background: "#4bc2bc" }}
                        >
                          Yes
                        </Button>
                      </Box>
                    </TabPanel>
                  )}
                </>
              ) : (
                <Box
                  color="#000"
                  padding="20px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="23px"
                >
                  {selected.status === "suspended" && "Payrun Suspended"}
                </Box>
              )}
            </DialogContent>
          </Dialog>
        </Modal>
      </Paper>
    </>
  );
};

export default PayGroupComp;
