import Link from "next/link";
import {
  Card,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Button,
  TextField,
  TablePagination,
  Table,
  Modal,
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Slide,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };
  const [open, setOpen] = useState(false);
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
  return (
    <div>
      <Modal open={open}>
        <Dialog fullWidth={true} TransitionComponent={Transition} open={open}>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap="40px">
              <Box display="flex" justifyContent="space-between">
                Add New PayGroup
                <IconButton size="small" onClick={() => setOpen(false)}>
                  Close
                </IconButton>
              </Box>
              <TextField fullWidth={true} size="small" label="Name" required />
              <TextField fullWidth={true} size="small" label="Name" required />
              <TextField fullWidth={true} size="small" label="Name" required />
              <TextField fullWidth={true} size="small" label="Name" required />
              <Button
                variant="contained"
                color="primary"
                style={{ background: "#4bc2bc" }}
              >
                Add Paygroup
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Modal>
      <Box marginBottom="20px" display="flex" justifyContent="space-between">
        <div>Pay Group List</div>

        <Button
          onClick={() => setOpen(true)}
          color="primary"
          variant="contained"
          style={{ borderRadius: "30px", background: "#4bc2bc" }}
        >
          + Create New
        </Button>
      </Box>
      <TableContainer component={Card}>
        <Table size="small">
          <TableHead>
            <TableRow
              style={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: "auto",
                padding: "15px",
              }}
              className={classes.tableRow}
            >
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
            <TableRow
              style={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: "auto",
                padding: "15px",
                padding: "15px",
              }}
            >
              <TableCell>MAKESHIFT CO.</TableCell>
              <TableCell>Default Monthly Paygroup</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Monthly</TableCell>
              <TableCell>1 0f 1</TableCell>
              <TableCell>30/11/2021</TableCell>
              <TableCell>02/12/2021</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={10}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
        />
      </TableContainer>
    </div>
  );
};

export default PayGroupComp;
