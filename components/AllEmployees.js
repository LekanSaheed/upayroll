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
import { useState } from "react";
const employees = [
  {
    id: "UP234",
    name: "Salam Adeniyi",
    gender: "Male",
    role: "Web Designer",
    date_of_join: "11/04/2013",
    nationality: "Nigerian",
    marital_status: "Single",
    designation: "Web development",
    phone: 2349087654563,
    email: "salamadeniyi@outlook.com",
    address: "18,Cola Street, Lekki, Lagos",
  },
  {
    id: "UP234",
    name: "Salam Adeniyi",
    gender: "Male",
    role: "Web Designer",
    date_of_join: "11/04/2013",
    nationality: "Nigerian",
    marital_status: "Single",
    designation: "Web development",
    phone: 2349087654563,
    email: "salamadeniyi@outlook.com",
    address: "18,Cola Street, Lekki, Lagos",
  },
  {
    id: "UP234",
    name: "Salam Adeniyi",
    gender: "Male",
    role: "Web Designer",
    date_of_join: "11/04/2013",
    nationality: "Nigerian",
    marital_status: "Single",
    designation: "Web development",
    phone: 2349087654563,
    email: "salamadeniyi@outlook.com",
    address: "18,Cola Street, Lekki, Lagos",
  },
  {
    id: "UP234",
    name: "Salam Adeniyi",
    gender: "Male",
    role: "Web Designer",
    date_of_join: "11/04/2013",
    nationality: "Nigerian",
    marital_status: "Single",
    designation: "Web development",
    phone: 2349087654563,
    email: "salamadeniyi@outlook.com",
    address: "18,Cola Street, Lekki, Lagos",
  },
  {
    id: "UP234",
    name: "Salam Adeniyi",
    gender: "Male",
    role: "Web Designer",
    date_of_join: "11/04/2013",
    nationality: "Nigerian",
    marital_status: "Single",
    designation: "Web development",
    phone: 2349087654563,
    email: "salamadeniyi@outlook.com",
    address: "18,Cola Street, Lekki, Lagos",
  },
  {
    id: "UP234",
    name: "Salam Adeniyi",
    gender: "Male",
    role: "Web Designer",
    date_of_join: "11/04/2013",
    nationality: "Nigerian",
    marital_status: "Single",
    designation: "Web development",
    phone: 2349087654563,
    email: "salamadeniyi@outlook.com",
    address: "18,Cola Street, Lekki, Lagos",
  },
];
const AllEmployees = () => {
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
                <TableCell>Nationality</TableCell>
                <TableCell>Marital Status</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
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
                      <TableCell>{e.id}</TableCell>
                      <TableCell>{e.name}</TableCell>
                      <TableCell>{e.gender}</TableCell>
                      <TableCell>{e.role}</TableCell>
                      <TableCell>{e.date_of_join}</TableCell>
                      <TableCell>{e.nationality}</TableCell>
                      <TableCell>{e.marital_status}</TableCell>
                      <TableCell>{e.designation}</TableCell>
                      <TableCell>{e.phone}</TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>{e.address}</TableCell>
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
