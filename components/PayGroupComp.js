import Link from "next/link";
import {
  Card,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Button,
  Paper,
  TablePagination,
  Table,
  Modal,
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Slide,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Grid,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";

const PayGroupComp = () => {
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
            setLeft(data.data);
            console.log(data.data, "employee");
          } else {
            toast.error(data.error);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchStaffs();
  }, []);
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
  const not = (a, b) => {
    return a.filter((value) => b.indexOf(value) === -1);
  };
  const intersection = (a, b) => {
    return a.filter((value) => b.indexOf(value) !== -1);
  };

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
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
  console.log(left);
  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value, idx) => {
          const id = `transfer-list-item-${idx}-label`;

          return (
            <ListItem
              key={id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value._id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": id,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={id} primary={`Employee ${value.firstname}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
  return (
    <div>
      <Modal open={open}>
        <Dialog fullWidth={true} open={open}>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap="40px">
              <Box display="flex" justifyContent="space-between">
                Add New PayGroup
                <IconButton size="small" onClick={() => setOpen(false)}>
                  Close
                </IconButton>
              </Box>

              <TextField
                fullWidth={true}
                placeholder="Enter a pay group name"
                label="Pay Group Name"
                size="small"
              />
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item> {customList(left)}</Grid>
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
                <Grid item>{customList(right)}</Grid>
              </Grid>
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
              <TableCell className={classes.cell}>Pay Group</TableCell>

              <TableCell className={classes.cell}>Employees</TableCell>
              <TableCell className={classes.cell}> Date Created</TableCell>

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
              <TableCell>Default Monthly Paygroup</TableCell>

              <TableCell>sally</TableCell>
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
