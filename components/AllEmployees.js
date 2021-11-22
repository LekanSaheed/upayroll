import {
  Card,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Table,
  TablePagination,
  AppBar,
  Box,
  Paper,
  Slide,
} from "@mui/material";
import StyledHead from "./StyledHead";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import { toast } from "react-toastify";

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);

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
          } else {
            toast.error(data.error);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchStaffs();
  }, []);
  const useStyles = makeStyles({
    root: {
      "&:nth-of-type(even)": {
        backgroundColor: "white",
      },
      "&:nth-of-type(odd)": {
        backgroundColor: "#fafafa",
      },
    },
  });
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };
  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Paper sx={{ width: 950, overflow: "hidden" }}>
        <TableContainer hover sx={{ width: "auto", height: "auto" }}>
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
        />
      </Paper>
    </Slide>
  );
};

export default AllEmployees;
