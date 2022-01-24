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
import { makeStyles, CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import { baseUrl } from "../../../payrollContext/baseUrl";
import Loader from "../../../components/Loader";
const AddPayRun = () => {
  const [employees, setEmployees] = useState([]);
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

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
            setEmployees(data.data);
            console.log(data.data, "employee");
            setLoading(false);
          } else {
            toast.error(data.error);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    fetchStaffs();
  }, []);

  const options = [
    { label: "Daily", value: 1 },
    { label: "Weekly", value: 7 },
    { label: "Bi-Weekly", value: 14 },
    { label: "Monthly", value: 30 },
    { label: "Yearly", value: 365 },
  ];
  const handleFrequency = (e, newVal) => {
    setFrequency(e);
  };

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

  const addPayRun = async () => {
    setLoading(true);
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    const url = `${baseUrl}/payrun/add`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        start_date: start_date,
        end_date: end_date,
        interval: frequency.value,
        payments: right.map((emp) => {
          return {
            staff: emp._id,
            amount: emp.salary,
          };
        }),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Pay Run added successfully");
          console.log(data.data);
        } else {
          toast.error(data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        position="sticky"
      >
        {label}
      </AppBar>
      {label === "Employee List" && (
        <AppBar position="sticky">
          {" "}
          <input
            type="search"
            onChange={(e) => {
              if (e.target.value === "") {
                const newEmp = employees.filter((i) => {
                  const ids = right.map((r) => r._id);
                  return !ids.includes(i._id);
                  console.log(ids);
                });
                console.log(newEmp);
                setLeft(newEmp);
              } else {
                console.log(employees);

                setLeft(
                  employees
                    .filter((i) => {
                      const ids = right.map((r) => r._id);
                      return !ids.includes(i._id);
                      console.log(ids);
                    })
                    .filter((i) => {
                      return `${i.firstname} ${i.lastname}`
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase());
                    })
                );
              }
            }}
            placeholder="search"
            style={{ border: "solid 1px #efefef", padding: "10px" }}
          />
        </AppBar>
      )}
      <List dense component="div" role="list">
        {items.map((value, idx) => {
          const id = `transfer-list-item-${value}-label`;
          return (
            <ListItem
              key={idx}
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
              {loading ? (
                // <div
                //   style={{
                //     height: "100%",
                //     width: "100%",
                //     display: "flex",
                //     alignItems: "center",
                //     justifyContent: "center",
                //   }}
                // >
                <CircularProgress />
              ) : (
                // </div>
                <ListItemText
                  id={id}
                  primary={`${`${value.firstname} ${value.lastname}`}`}
                />
              )}
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
      {loading && <Loader />}
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
              <label>Title</label>
              <TextField
                size="small"
                fullWidth={true}
                variant="outlined"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <label>Start Date</label>
              <TextField
                size="small"
                fullWidth={true}
                variant="outlined"
                type="date"
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <label>End Date</label>
              <TextField
                size="small"
                fullWidth={true}
                variant="outlined"
                type="date"
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <label>Frequency</label>
              <MySelect
                placeholder="Select frequency"
                options={options}
                value={frequency}
                onChange={handleFrequency}
              />
            </Box>
          </Box>
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
        <Button
          color="primary"
          variant="contained"
          onClick={addPayRun}
          style={{ background: "#4bc2bc" }}
        >
          Add PayRun
        </Button>
      </Box>
    </Wrapper>
  );
};

export default AddPayRun;
