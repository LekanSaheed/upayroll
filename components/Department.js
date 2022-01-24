import {
  Card,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  AppBar,
  Modal,
  DialogContent,
  Box,
  Button,
  Dialog,
  TextField,
  IconButton,
} from "@mui/material";
import { Slide } from "@mui/material";
import { makeStyles } from "@mui/styles";
import StyledHead from "./StyledHead";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
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
        <Dialog
          paperProps={{ style: { borderRadius: "50px" } }}
          fullWidth={true}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          transitionProps={{
            style: { transitionDelay: 2000 },
          }}
        >
          <DialogContent fullWidth={true}>
            <Box
              gap="40px"
              gridGap="40px"
              display="flex"
              flexDirection="column"
            >
              <Box display="flex" justifyContent="space-between">
                Add New Designation
                <IconButton onClick={() => setOpen(false)}>
                  <MdClose />
                </IconButton>
              </Box>
              <TextField
                label="Department"
                variant="outlined"
                fullWidth={true}
                size="small"
                required
              />
              <TextField
                label="Designation"
                variant="outlined"
                size="small"
                fullWidth={true}
                required
              />
              <Button
                size="large"
                style={{
                  borderRadius: "30px",
                  backgroundColor: "#4bc2bc",
                  fontWeight: "bold",
                }}
                endIcon={<HiPlus />}
                variant="contained"
                color="primary"
                onClick={() => toast.success("Designation Added successfully")}
              >
                Add Designation
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Modal>
      <Box display="flex" marginBottom="20px" justifyContent="space-between">
        {" "}
        <span> Department / Designation </span>
        <Button
          style={{
            borderRadius: "20px",
            fontWeight: "bold",
            background: "#4bc2bc",
          }}
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
          endIcon={<HiPlus />}
        >
          Add Designation
        </Button>
      </Box>
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
                  className={classes.root}
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
