import {
  Paper,
  Slide,
  Modal,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
} from "@mui/material";
import MySelect from "./MySelect";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { MdClose } from "react-icons/md";
const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState({});

  useEffect(() => {
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
            setLoading(false);
          } else {
            toast.error(data.error);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchStaffs();
  }, []);
  const useStyles = makeStyles({
    root: {
      "& .header": {
        fontFamily: "poppins",
      },
      "& .cell": {
        fontFamily: "circularStd",
      },
    },
    diagCont: {
      padding: "0 !important",
    },
  });
  const classes = useStyles();

  const columns = [
    {
      field: "sn",
      headerName: "S/N",
      width: 90,
      cellClassName: "cell",
      headerClassName: "header",
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      cellClassName: "cell",
      headerClassName: "header",
    },

    {
      field: "gender",
      headerName: "Gender",
      cellClassName: "cell",
      headerClassName: "header",
    },
    {
      field: "post",
      headerName: "Post",
      width: 150,
      cellClassName: "cell",
      headerClassName: "header",
    },
    {
      field: "salary",
      headerName: "Salary",
      cellClassName: "cell",
      headerClassName: "header",
      width: 150,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 180,
      cellClassName: "cell",
      headerClassName: "header",
    },
    {
      field: "department",
      headerName: "Department",
      width: 180,
      cellClassName: "cell",
      headerClassName: "header",
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 130,
      cellClassName: "cell",
      headerClassName: "header",
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      cellClassName: "cell",
      headerClassName: "header",
    },
    {
      field: "address_1",
      headerName: "Address 1",
      width: 180,
      cellClassName: "cell",
      headerClassName: "header",
    },
    {
      field: "address_2",
      headerName: "Address 2",
      width: 180,
      cellClassName: "cell",
      headerClassName: "header",
    },
    {
      field: "created_At",
      headerName: "Date Created",
      cellClassName: "cell",
      headerClassName: "header",
    },
    {
      field: "id",
      headerName: "#Hash",
      cellClassName: "cell",
      headerClassName: "header",
    },
  ];
  const handleSelection = (id) => {
    const findSelected = employees.find((e) => e._id === id[0]);
    setSelected(findSelected);
    setModal(true);
  };
  console.log(selected);
  return (
    <>
      <Modal open={modal}>
        <Dialog
          open={modal}
          fullWidth={true}
          PaperProps={{
            style: {
              verticalAlign: "bottom",
              padding: "0 ",
            },
          }}
        >
          <DialogContent className={classes.diagCont}>
            <Box
              display="flex"
              justifyContent="space-between"
              padding="20px"
              color="#fff"
              backgroundColor="#bb4079"
            >
              Edit Staff
              <IconButton size="small" onClick={() => setModal(false)}>
                <MdClose style={{ color: "#fff" }} />
              </IconButton>
            </Box>
            <Box padding="10px">
              <span>Personal Info</span>
              <Box
                display="flex"
                flexDirection="column"
                gap="10px"
                gridGap="10px"
              >
                <TextField label="First Name" size="small" fullWidth={true} />
                <TextField label="Middle Name" size="small" fullWidth={true} />
                <TextField label="Last Name" size="small" fullWidth={true} />
                <MySelect />
                <span>Date of Birth</span>
                <TextField type="date" size="small" fullWidth={true} />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="10px"
                gridGap="10px"
              >
                <span>Contact Info</span>
                <Box>
                  <TextField label="Email" size="small" fullWidth={true} />
                  <TextField label="Phone" size="small" fullWidth={true} />
                  <TextField label="Address 1" size="small" fullWidth={true} />
                  <TextField label="Address 2" size="small" fullWidth={true} />
                </Box>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Modal>
      <Paper style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          onSelectionModelChange={handleSelection}
          className={classes.root}
          columns={columns}
          rows={employees.map((e, id) => {
            return {
              ...e,
              sn: id + 1,
              id: e._id,
              name: e.firstname + " " + e.lastname,
              salary: "₦" + e.salary.toLocaleString(),
              start_date: moment(e.start_date).format("ddd, MMM DD YYYY"),
              created_At: moment(e.created_At).format("ddd, MMM DD YYYY"),
            };
          })}
          loading={loading}
        />
        {/* <TableContainer hover sx={{ width: "auto", height: "auto" }}>
          <Table>
            <StyledHead>
              <TableRow
                style={{
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  width: "auto",
                }}
                width="100%"
              >
                <TableCell>Employee Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Date Of Join</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>

                <TableCell>Address</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell>Salary</TableCell>
              </TableRow>
            </StyledHead>
            <TableBody stripedRows>
              {employees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((e, id) => {
                  return (
                    <TableRow
                      className={classes.root}
                      key={id}
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "auto",
                      }}
                    >
                      <TableCell>{e._id.slice(0, 6)}</TableCell>
                      <TableCell>{e.firstname + " " + e.lastname}</TableCell>
                      <TableCell>{e.gender}</TableCell>
                      <TableCell>{e.post}</TableCell>
                      <TableCell>{e.start_date}</TableCell>

                      <TableCell>{e.department}</TableCell>
                      <TableCell>{e.phone}</TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>{e.address_1}</TableCell>
                      <TableCell>{e.created_At}</TableCell>
                      <TableCell>{e.salary}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={employees.length}
          page={page}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
        /> */}
      </Paper>
    </>
  );
};

export default AllEmployees;
