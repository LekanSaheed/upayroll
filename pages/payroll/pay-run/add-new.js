import {
  Card,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
  Checkbox,
  AppBar,
} from "@mui/material";
import Wrapper from "../../../components/Wrapper";
import { useState, useEffect } from "react";
import MySelect from "../../../components/MySelect";
import { makeStyles } from "@material-ui/core";
import { toast } from "react-toastify";
import { baseUrl } from "../../../payrollContext/baseUrl";
const AddPayRun = () => {
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
  const not = (a, b) => {
    return a.filter((value) => b.indexOf(value) === -1);
  };
  const intersection = (a, b) => {
    return a.filter((value) => b.indexOf(value) !== -1);
  };

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(employees);
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
  const customList = (items, label) => (
    <Paper lg={300} sx={{ width: 250, height: 300, overflow: "auto" }}>
      <AppBar
        style={{ padding: "10px", background: "#4bc2bc" }}
        position="static"
      >
        {label}
      </AppBar>
      <List dense component="div" role="list">
        {items.map((value) => {
          const id = `transfer-list-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": id,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={id}
                primary={`Employee ${`${value.firstname} ${value.lastname}`}`}
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
  const useStyles = makeStyles((theme) => ({
    root: {},
    inputContainer: {
      [theme.breakpoints.down(766)]: {
        flexDirection: "column",
      },
    },
  }));
  const classes = useStyles();
  return (
    <Wrapper>
      <Box
        gap="20px"
        backgroundColor="#fff"
        padding="25px"
        borderRadius="3px"
        border="solid 1px #eded"
      >
        New Additional Pay Run
        <Box display="flex" flexDirection="column" gap="20px" margin="20px 0">
          <Box
            gap="40px"
            justifyContent="space-between"
            className={classes.inputContainer}
            display="flex"
            flexDirection="column"
          >
            <Box display="flex" flexDirection="column">
              <label>Payment Period</label>
              <TextField
                size="small"
                fullWidth={true}
                variant="outlined"
                type="date"
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <label>Payment Date</label>
              <TextField
                size="small"
                fullWidth={true}
                variant="outlined"
                type="date"
              />
            </Box>
          </Box>
        </Box>
        <Button>Add PayRun</Button>
      </Box>

      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item> {customList(left, "Employee List")}</Grid>
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
        <Grid item>{customList(right, "Selected Employees")}</Grid>
      </Grid>
    </Wrapper>
  );
};

export default AddPayRun;
