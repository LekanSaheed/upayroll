import Link from "next/link";
import {
  Card,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  AppBar,
  Button,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
const PayGroupComp = () => {
  const useStyle = makeStyles({
    tableRow: {
      height: "40px",
      background: "#4bc2bc",
    },
    cell: {
      padding: "0 16px",
      color: "#fff",
      fontWeight: "600",
    },
  });
  const classes = useStyle();
  return (
    <div>
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
      <TableContainer component={Card}>
        <TableContainer>
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.cell}>Company</TableCell>
              <TableCell className={classes.cell}>PayGroup</TableCell>
              <TableCell className={classes.cell}>Status</TableCell>
              <TableCell className={classes.cell}>Frequency</TableCell>
              <TableCell className={classes.cell}>Employee</TableCell>
              <TableCell className={classes.cell}>End Date</TableCell>
              <TableCell className={classes.cell}>Payment Date</TableCell>
              <TableCell className={classes.cell} />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={{ padding: "15px" }}>
              <TableCell>MAKESHIFT CO.</TableCell>
              <TableCell>Default Monthly Paygroup</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Monthly</TableCell>
              <TableCell>1 0f 1</TableCell>
              <TableCell>30/11/2021</TableCell>
              <TableCell>02/12/2021</TableCell>
            </TableRow>
          </TableBody>
        </TableContainer>
      </TableContainer>
    </div>
  );
};

export default PayGroupComp;
