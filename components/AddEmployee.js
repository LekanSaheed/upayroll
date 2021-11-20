import { Box } from "@mui/system";
import { useState } from "react";
import { countries } from "./countries";
import { Card, AppBar, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { toast } from "react-toastify";
import MySelect from "./MySelect";
const AddEmployee = () => {
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [country, setCountry] = useState(null);

  const countryOptions = countries.map((i) => {
    return {
      value: i.name.toLowerCase(),
      label: i.name.toUpperCase(),
    };
  });
  const handleCountryChange = (e) => {
    setCountry(e);
    console.log(e);
  };
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
    <div>
      Add New Employee
      <form>
        <Card>
          <AppBar
            position="static"
            style={{ background: "#4bc2bc", color: "#fff", padding: "15px" }}
          >
            Personal Information.
          </AppBar>
          <Box padding="14px">
            <Box
              display="flex"
              className={classes.inputContainer}
              gap="13px"
              justifyContent="space-between"
            >
              <div className="input_container">
                <label>First Name</label>
                <input placeholder="First Name" required />
              </div>

              <div className="input_container">
                <label>Middle Name</label>
                <input type="text" required placeholder="Middle Name" />
              </div>
            </Box>

            <div className="input_container">
              <label>Last Name</label>
              <input placeholder="Last Name" required />
            </div>
            <Box display="flex" gap="13px" justifyContent="space-between">
              <div className="input_container">
                <label>Gender</label>
                <input placeholder="Gender" required />
              </div>
              <div className="input_container">
                <label>Date of Birth</label>
                <input type="date" />
              </div>
            </Box>
            <div className="input_container">
              <label>Nationality</label>
              <MySelect
                options={countryOptions}
                placeholder="Select Country"
                value={country}
                onChange={handleCountryChange}
              />
            </div>
          </Box>
        </Card>

        <Card style={{ marginTop: "25px" }}>
          <AppBar
            position="static"
            style={{ background: "#4bc2bc", color: "#fff", padding: "15px" }}
          >
            Contact Information.
          </AppBar>
          <Box padding="14px">
            <Box
              display="flex"
              gap="13px"
              className={classes.inputContainer}
              justifyContent="space-between"
            >
              <div className="input_container">
                <label>Email</label>
                <input type="email" placeholder="Email" required />
              </div>
              <div className="input_container">
                <label>Phone</label>
                <input placeholder="Phone" type="number" required />
              </div>
            </Box>
            <Box
              display="flex"
              gap="13px"
              className={classes.inputContainer}
              justifyContent="space-between"
            >
              <div className="input_container">
                <label>Address Line 1</label>
                <input type="text" placeholder="Address Line 1" required />
              </div>
              <div className="input_container">
                <label>Address Line 2 (Optional)</label>
                <input placeholder="Address Line 2" type="text" />
              </div>
            </Box>
          </Box>
        </Card>

        <Card style={{ marginTop: "25px" }}>
          <AppBar
            position="static"
            style={{ background: "#4bc2bc", color: "#fff", padding: "15px" }}
          >
            Employment Details.
          </AppBar>
          <Box padding="14px">
            <Box
              display="flex"
              gap="13px"
              className={classes.inputContainer}
              justifyContent="space-between"
            >
              <div className="input_container">
                <label>Job Position</label>
                <input type="text" placeholder="Job Position" required />
              </div>

              <div className="input_container">
                <label>Start Date</label>
                <input type="date" />
              </div>
            </Box>
            <div className="input_container">
              <label>Department</label>
              <MySelect placeholder="Select Department" />
            </div>
          </Box>
        </Card>
        <Button
          onClick={() => toast.success("Employee added successfully")}
          variant="contained"
          color="primary"
          style={{ background: "#4bc2bc" }}
          size="large"
        >
          Add Employee
        </Button>
      </form>
    </div>
  );
};

export default AddEmployee;
