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
} from "@mui/material";
import Loader from "./Loader";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { MdClose } from "react-icons/md";

const PayGroupComp = () => {
  useEffect(() => {
    fetchRuns();
    fetchStaffs();
  }, []);
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const [runlist, setRunList] = useState([]);
  const [row, setRow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [start_date, setStartDate] = useState([]);
  const [end_date, setEndDate] = useState([]);
  const [intervals, setIntervals] = useState(null);
  const [employees, setEmployees] = useState([]);

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
        console.log(data);
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
          console.log(myRow);
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
      "& .-MuiTypography-root": {
        fontSize: "11px !important",
        fontFamily: "poppins !important",
      },
      "& .MuiListItemIcon-root": {
        minWidth: "0",
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
      cellClassName: "cell",
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

  // const fetchRun = async (run) => {
  //   const url = `${baseUrl}/payrun/${run[0]._id}`;
  //   fetch(url, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         setSelected(data.data);
  //         console.log(data.data);
  //       } else {
  //         toast.error(data.error);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const pauseRun = async (run) => {
    const url = `${baseUrl}/payrun/${run[0]}/pause`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
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
  const handleFrequency = (e, newVal) => {
    setFrequency(e);
  };

  const not = (a, b) => {
    return a.filter((value) => b.indexOf(value) === -1);
  };
  const intersection = (a, b) => {
    return a.filter((value) => b.indexOf(value) !== -1);
  };

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

  // Custom List

  const customList = (items, label) => (
    <Paper lg={200} sx={{ width: 150, height: 200, overflow: "auto" }}>
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
          return (
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
                  style={{ fontSize: "10px !important" }}
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
  const handleUpdate = async (itm) => {
    setLoading(true);
    const id = row.filter((run) => run.id === itm[0]);
    await setSelected(id[0]);

    const currentRunStaffId = id[0].payments.map((stf) => {
      return stf.staff;
    });

    const filtered = employees.filter((emp) => {
      return !currentRunStaffId.includes(emp._id);
    });
    console.log(filtered, "fil");
    const currentStaff = employees.filter((emp) => {
      return currentRunStaffId.includes(emp._id);
    });
    await setLeft(filtered);

    setRight(currentStaff);
    setModal(true);
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
            TransitionComponent={Transition}
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
                <IconButton onClick={() => setModal(false)} size="small">
                  <MdClose style={{ color: "#fff" }} />
                </IconButton>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                padding="20px"
                gap="20px"
                color="#fff !important"
              >
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item> {customList(left, "Employee List")}</Grid>
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
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
                  <Grid item>{customList(right, "Selected Employees")}</Grid>
                </Grid>
              </Box>
            </DialogContent>
          </Dialog>
        </Modal>
      </Paper>
    </>
  );
};

export default PayGroupComp;
