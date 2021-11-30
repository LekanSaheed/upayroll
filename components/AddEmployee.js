import { Box } from "@mui/system";
import { useState } from "react";
import { countries } from "./countries";
import { Card, AppBar, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { toast } from "react-toastify";
import MySelect from "./MySelect";
import { baseUrl } from "../payrollContext/baseUrl";
import Loader from "./Loader";
const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [start_date, setStart_date] = useState(null);
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");
  const [salary, setSalary] = useState(null);
  const [dob, setDob] = useState(null);
  const [post, setPost] = useState(null);

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
  const handleGender = (gender) => {
    setGender(gender);
  };
  const handleDepartment = (dept) => {
    setDepartment(dept);
  };
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  const departmentOptions = [
    { value: "web development", label: "Web Development" },
    { value: "web design", label: "Web Design" },
    { value: "cyber security", label: "Cyber Security" },
    { value: "revenue mangement", label: "Revenue Management" },
    { value: "mobile development", label: "Mobile Development" },
  ];

  const addEmployee = async () => {
    setLoading(true);
    const url = `${baseUrl}/staff/add`;
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstName,
        middlename: middleName,
        lastname: lastname,
        gender: gender.value,
        dob: dob,
        phone: phone,
        email: email,
        address_1: address_1,
        address_2: address_2,
        post: post,
        start_date: start_date,
        department: department,
        salary: salary,
      }),
    };
    await fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setLoading(false);
          toast.success("Employee Added Successfully");
        } else {
          toast.error(res.error);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div>
      Add New Employee
      {loading && <Loader />}
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
                <input
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="input_container">
                <label>Middle Name</label>
                <input
                  type="text"
                  required
                  placeholder="Middle Name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>
            </Box>

            <div className="input_container">
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <Box display="flex" gap="13px" justifyContent="space-between">
              <div className="input_container">
                <label>Gender</label>
                <MySelect
                  options={genderOptions}
                  value={gender}
                  onChange={handleGender}
                />
              </div>
              <div className="input_container">
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </Box>
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
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input_container">
                <label>Phone</label>
                <input
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  required
                />
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
                <input
                  type="text"
                  value={address_1}
                  onChange={(e) => setAddress_1(e.target.value)}
                  placeholder="Address Line 1"
                  required
                />
              </div>
              <div className="input_container">
                <label>Address Line 2 (Optional)</label>
                <input
                  value={address_2}
                  onChange={(e) => setAddress_2(e.target.value)}
                  placeholder="Address Line 2"
                  type="text"
                />
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
                <input
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  type="text"
                  placeholder="Job Position"
                  required
                />
              </div>

              <div className="input_container">
                <label>Start Date</label>
                <input
                  type="date"
                  required
                  value={start_date}
                  onChange={(e) => setStart_date(e.target.value)}
                />
              </div>
            </Box>
            <Box
              display="flex"
              gap="13px"
              className={classes.inputContainer}
              justifyContent="space-between"
            >
              <div className="input_container">
                <label>Department</label>
                {/* <MySelect
                  placeholder="Select Department"
                  value={department}
                  onChange={handleDepartment}
                  options={departmentOptions}
                /> */}
                <input
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  type="text"
                  placeholder="Department"
                  required
                />
              </div>
              <div className="input_container">
                <label>Salary</label>
                <input
                  type="number"
                  min="0"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            </Box>
          </Box>
        </Card>
        <Button
          disabled={
            !firstName ||
            !lastname ||
            !middleName ||
            !phone ||
            !email ||
            !gender ||
            !start_date ||
            !dob ||
            !address_1 ||
            !post ||
            !salary ||
            !department
          }
          onClick={() => {
            addEmployee();
          }}
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#4bc2bc" }}
          size="large"
        >
          Add Employee
        </Button>
      </form>
    </div>
  );
};

export default AddEmployee;
