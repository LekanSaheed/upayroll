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
const departments = [
  {
    id: 1,
    department: "Web Development",
    designation: "	Web Developer",
    numbers: 120,
  },
  {
    id: 2,
    department: "Application Development",
    designation: "	Application Developer",
    numbers: 10,
  },
  {
    id: 3,
    department: "Ui/UX ",
    designation: "UI/UX designer",
    numbers: 34,
  },
  {
    id: 4,
    department: "Cyber Security",
    designation: "Ethical Hackers",
    numbers: 38,
  },
];
const Department = () => {
  return (
    <div>
      Department
      <TableContainer component={Card}>
        <TableContainer>
          <StyledHead>
            <TableRow
              style={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: "auto",
              }}
            >
              <TableCell>#</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Numbers of employee</TableCell>
            </TableRow>
          </StyledHead>
          <TableBody>
            {departments.map((i, id) => {
              return (
                <TableRow
                  style={{
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    width: "auto",
                  }}
                  key={id}
                >
                  <TableCell>{i.id}</TableCell>
                  <TableCell>{i.department}</TableCell>
                  <TableCell>{i.designation}</TableCell>
                  <TableCell>{i.numbers}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableContainer>
      </TableContainer>
    </div>
  );
};

export default Department;
