import {
  Card,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  AppBar,
} from "@mui/material";
import StyledHead from "./StyledHead";

const Cards = () => {
  const tranx = [
    { id: 4563, date: "11/12/2021", total: 40, status: "paid" },
    { id: 3567, date: "11/12/2021", total: 200, status: "unpaid" },
    { id: 2098, date: "12/12/2021", total: 1000, status: "pending" },
    { id: 4324, date: "18/12/2021", total: 1234, status: "paid" },
  ];
  const employee = [
    {
      name: "John Doe",
      role: "Web Developer",
      designation: "Web Development",
      salary: 200000,
    },
    { name: "Samuel Faye", role: "QA", designation: "QA ", salary: 500000 },
    {
      name: "Damian Lucifer",
      role: "Project Manager",
      designation: "Overall",
      salary: 100000,
    },
    {
      name: "John Goodman",
      role: "Ui/Ux Designer",
      designation: "Web Design",
      salary: 300000,
    },
  ];
  return (
    <div
      style={{
        alignItems: "flex-start",
        flex: "1 1 40%",
        width: "40%",
      }}
      className="flex-column gap"
    >
      <div>
        <AppBar
          position="static"
          style={{ background: "#4bc2bc", color: "#fff", padding: "15px" }}
        >
          Transaction History
        </AppBar>
        <TableContainer component={Card}>
          <TableContainer>
            <StyledHead>
              <TableRow>
                <TableCell>Tranx Id</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </StyledHead>
            <TableBody>
              {tranx.map((row, id) => {
                return (
                  <TableRow key={id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.total}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableContainer>
        </TableContainer>
      </div>
      {/* 
      <div>
        <AppBar
          position="static"
          style={{ background: "#4bc2bc", color: "#fff", padding: "15px" }}
        >
          Newest Employees
        </AppBar>
        <TableContainer component={Card}>
          <TableContainer>
            <StyledHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Salary</TableCell>
              </TableRow>
            </StyledHead>
            <TableBody>
              {employee.map((e, id) => {
                return (
                  <TableRow key={id} style={{ wordBreak: "break-word" }}>
                    <TableCell
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "auto",
                      }}
                    >
                      {e.name}
                    </TableCell>
                    <TableCell
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "auto",
                      }}
                    >
                      {e.role}
                    </TableCell>
                    <TableCell
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "auto",
                      }}
                    >
                      {e.designation}
                    </TableCell>
                    <TableCell
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "auto",
                      }}
                    >
                      {e.salary.toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableContainer>
        </TableContainer>
      </div> */}
    </div>
  );
};

export default Cards;
