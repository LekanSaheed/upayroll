import {
  Paper,
  Button,
  Modal,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  AppBar,
} from "@mui/material";
import MySelect from "./MySelect";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { MdClose } from "react-icons/md";
import { BiUpload } from "react-icons/bi";
import { banks } from "./naijaBanks";

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [dataset, setDataset] = useState({});

  const bankOptions = banks.map((b) => {
    return {
      label: b.name,
      value: b.code,
    };
  });
  useEffect(() => {
    fetchStaffs();
  }, []);
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
      "& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
        fontSize: "11px",
      },
      "& .css-oln51b-control": {
        fontSize: "11px",
      },
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
      field: "dob",
      headerName: "DOB",
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

  const editStaff = async (id) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    fetch(`${baseUrl}/staff/${id}/edit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataset),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success("Staff edited successfully");
          setModal(false);
          fetchStaffs();
          setLoading(false);
          setSelected({});
          setDataset({});
        } else {
          setLoading(false);
          toast.error(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDataChange = (data) => {
    setDataset((state) => ({
      ...state,
      ...data,
    }));
  };
  const getBankName = (code) => {
    const bankName = bankOptions
      .filter((b) => {
        return b.value === code;
      })
      .map((b) => {
        return b.label;
      });
    console.log(bankName);
    return bankName[0];
  };
  console.log(dataset);
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
              <IconButton
                size="small"
                onClick={() => {
                  setModal(false);
                  setSelected({});
                  setDataset({});
                }}
              >
                <MdClose style={{ color: "#fff" }} />
              </IconButton>
            </Box>
            <Box padding="15px">
              <AppBar
                position="static"
                elevation={0}
                style={{
                  padding: "10px",
                  background: "#efefef",
                  color: "black",
                  fontSize: "13px",
                  marginBottom: "20px",
                }}
              >
                Personal Info
              </AppBar>
              <Box
                display="flex"
                flexDirection="column"
                gap="20px"
                gridGap="20px"
              >
                <TextField
                  label="First Name"
                  value={
                    dataset.firstname !== undefined
                      ? dataset.firstname
                      : selected.firstname
                  }
                  onChange={(e) =>
                    handleDataChange({ firstname: e.target.value })
                  }
                  size="small"
                  fullWidth={true}
                />
                <TextField
                  label="Middle Name"
                  value={
                    dataset.middlename !== undefined
                      ? dataset.middlename
                      : selected.middlename
                  }
                  onChange={(e) =>
                    handleDataChange({ middlename: e.target.value })
                  }
                  size="small"
                  fullWidth={true}
                />
                <TextField
                  value={
                    dataset.lastname !== undefined
                      ? dataset.lastname
                      : selected.lastname
                  }
                  onChange={(e) =>
                    handleDataChange({ lastname: e.target.value })
                  }
                  label="Last Name"
                  size="small"
                  fullWidth={true}
                />
                <div>
                  <span style={{ fontSize: "12px" }}>Gender</span>
                  <MySelect
                    options={[
                      { value: "male", label: "MALE" },
                      { value: "female", label: "FEMALE" },
                    ]}
                    value={{
                      value:
                        dataset.gender !== undefined
                          ? dataset.gender
                          : selected.gender
                          ? selected.gender
                          : "",
                      label:
                        dataset.gender !== undefined
                          ? dataset.gender.toUpperCase()
                          : selected.gender
                          ? selected.gender.toUpperCase()
                          : "",
                    }}
                    onChange={(e) => {
                      console.log(e);
                      handleDataChange({ gender: e.value });
                    }}
                  />
                </div>
                <div>
                  {" "}
                  <span style={{ fontSize: "12px" }}>Date of Birth</span>
                  <TextField
                    type="date"
                    value={
                      dataset.dob !== undefined
                        ? moment(dataset.dob).format("YYYY-MM-DD")
                        : moment(selected.dob).format("YYYY-MM-DD")
                    }
                    onChange={(e) => handleDataChange({ dob: e.target.value })}
                    size="small"
                    fullWidth={true}
                  />
                </div>
              </Box>
              <br />
              <AppBar
                position="static"
                elevation={0}
                style={{
                  padding: "10px",
                  background: "#efefef",
                  color: "black",
                  fontSize: "13px",
                  marginBottom: "20px",
                }}
              >
                Contact Info
              </AppBar>
              <Box
                display="flex"
                flexDirection="column"
                gridGap="20px"
                gap="20px"
              >
                <TextField
                  label="Email"
                  value={
                    dataset.email !== undefined ? dataset.email : selected.email
                  }
                  onChange={(e) => handleDataChange({ email: e.target.value })}
                  size="small"
                  fullWidth={true}
                />
                <TextField
                  value={
                    dataset.phone !== undefined ? dataset.phone : selected.phone
                  }
                  onChange={(e) => handleDataChange({ phone: e.target.value })}
                  label="Phone"
                  size="small"
                  fullWidth={true}
                />
                <TextField
                  value={
                    dataset.address_1 !== undefined
                      ? dataset.address_1
                      : selected.address_1
                  }
                  onChange={(e) =>
                    handleDataChange({ address_1: e.target.value })
                  }
                  label="Address 1"
                  size="small"
                  fullWidth={true}
                />
                <TextField
                  value={
                    dataset.address_2 !== undefined
                      ? dataset.address_2
                      : selected.address_2
                  }
                  onChange={(e) =>
                    handleDataChange({ address_2: e.target.value })
                  }
                  label="Address 2"
                  size="small"
                  fullWidth={true}
                />
              </Box>

              <AppBar
                position="static"
                elevation={0}
                style={{
                  padding: "10px",
                  background: "#efefef",
                  color: "black",
                  fontSize: "13px",
                  marginBottom: "20px",
                  marginTop: "30px",
                }}
              >
                Bank Info
              </AppBar>
              <Box
                display="flex"
                flexDirection="column"
                gridGap="20px"
                gap="20px"
              >
                <TextField
                  type="number"
                  minLength="10"
                  min="0"
                  value={
                    dataset.bank &&
                    dataset.bank.hasOwnProperty("account_number")
                      ? dataset.bank.account_number
                      : selected.bank
                      ? selected.bank.account_number
                      : ""
                  }
                  onChange={(e) => {
                    // e.target.value !== ""
                    handleDataChange({
                      bank: {
                        ...selected.bank,
                        ...dataset.bank,
                        account_number: e.target.value,
                      },
                    });
                    // : handleDataChange({
                    //     bank: {
                    //       ...dataset.bank,
                    //       bank_code: selected.bank.bank_code
                    //         ? selected.bank.bank_code
                    //         : "",
                    //     },
                    //   });
                  }}
                  label="Account Number"
                  size="small"
                  fullWidth={true}
                />
                <MySelect
                  options={bankOptions}
                  value={{
                    value:
                      dataset.bank && dataset.bank.hasOwnProperty("bank_code")
                        ? dataset.bank.bank_code
                        : selected.bank
                        ? selected.bank.bank_code
                        : null,
                    label: getBankName(
                      dataset.bank !== undefined
                        ? dataset.bank.bank_code
                        : selected.bank !== undefined
                        ? selected.bank.bank_code
                        : null
                    ),
                  }}
                  onChange={(e) => {
                    handleDataChange({
                      bank: { ...dataset.bank, bank_code: e.value },
                    });
                  }}
                  placeholder="Select a Bank"
                />
              </Box>
              <AppBar
                position="static"
                elevation={0}
                style={{
                  padding: "10px",
                  background: "#efefef",
                  color: "black",
                  fontSize: "13px",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
              >
                Employment Details
              </AppBar>
              <Box
                display="flex"
                flexDirection="column"
                gridGap="20px"
                gap="20px"
              >
                <TextField
                  value={
                    dataset.salary !== undefined
                      ? dataset.salary
                      : selected.salary
                  }
                  onChange={(e) => handleDataChange({ salary: e.target.value })}
                  label="Salary"
                  size="small"
                  fullWidth={true}
                />
                <TextField
                  value={
                    dataset.post !== undefined ? dataset.post : selected.post
                  }
                  onChange={(e) => handleDataChange({ post: e.target.value })}
                  label="Role"
                  size="small"
                  fullWidth={true}
                />
                <TextField
                  value={
                    dataset.department !== undefined
                      ? dataset.department
                      : selected.department
                  }
                  onChange={(e) =>
                    handleDataChange({ department: e.target.value })
                  }
                  label="Department"
                  size="small"
                  fullWidth={true}
                />
              </Box>
              <Button
                style={{
                  background:
                    Object.entries(dataset).length < 1 ? "#cccccc" : "#4bc2bc",
                  marginTop: "20px",
                }}
                variant="contained"
                fullWidth={true}
                endIcon={<BiUpload />}
                disabled={Object.entries(dataset).length < 1}
                onClick={() => editStaff(selected._id)}
              >
                Edit
              </Button>
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
