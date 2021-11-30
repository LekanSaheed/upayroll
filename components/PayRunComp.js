import Link from "next/link";
import {
  Modal,
  DialogContent,
  Slide,
  IconButton,
  Dialog,
  Button,
  Box,
  Paper,
} from "@mui/material";
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
  }, []);
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const [runlist, setRunList] = useState([]);
  const [row, setRow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState({});

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
              id: row._id,
              sn: id + 1,
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
  });
  const classes = useStyles();

  const columns = [
    {
      field: "sn",
      headerName: "S/N",
      width: 90,
      editable: true,
      headerClassName: "upHeader",
      cellClassName: "cell",
    },
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

  const fetchRun = async (run) => {
    const url = `${baseUrl}/payrun/${run[0]}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRun(data.data);
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  return (
    <>
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
                id: row._id,
                sn: id + 1,
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
            pageSize={runlist.length}
            headerHeight={70}
            loading={loading}
            onSelectionModelChange={async (itm) => {
              await fetchRun(itm).then(() => {
                setModal(true);
              });
              //  setSelected(option);
            }}
          />
        </div>
        <Modal
          open={modal}
          BackdropProps={{ style: { background: "rgba(255,255,255, 0.6)" } }}
        >
          <Dialog
            PaperProps={{
              style: {
                background: "#4bc2bc",
                color: "#fff",
                verticalAlign: "bottom",
              },
            }}
            TransitionComponent={Transition}
            open={modal}
            fullWidth={true}
          >
            <DialogContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                Payrun details{" "}
                <IconButton onClick={() => setModal(false)} size="small">
                  <MdClose />
                </IconButton>
              </Box>

              <Box display="flex" flexDirection="column" gap="20px">
                <Button color="primary" variant="contained">
                  Suspend Payrun
                </Button>
                <Button color="primary" variant="contained">
                  Pause Payrun
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </Modal>
      </Paper>
    </>
  );
};

export default PayGroupComp;
