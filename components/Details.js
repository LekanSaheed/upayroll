import classes from "./Details.module.css";
import { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { Button, Box, Card, Avatar } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const Details = () => {
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});

  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const fetchCompany = async () => {
    const url = `${baseUrl}/company/me`;
    await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.data);
          setCompany(data.data);

          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchCompany();
  }, []);

  const handleInfoChange = (data) => {
    setInfo((state) => ({
      ...state,
      ...data,
    }));
  };
  console.log(info);

  const editCompany = async () => {
    setLoading(true);
    const url = `${baseUrl}/company/${company._id}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setLoading(false);
          toast.success("Profile Updated Successfully");
        } else {
          setLoading(false);
          toast.error(data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className={classes.container}>
      {loading && <Loader />}
      <Box
        className={classes.form}
        padding="10px"
        display="flex"
        flexDirection="column"
      >
        <div className={classes.input_container}>
          <label>Name</label>

          <input
            type="text"
            value={info.name !== undefined ? info.name : company.name}
            onChange={(e) => handleInfoChange({ name: e.target.value })}
            placeholder="Company Name"
          />
        </div>

        <div className={classes.input_container}>
          <label>Phone</label>

          <input
            type="text"
            value={info.phone !== undefined ? info.phone : company.phone}
            onChange={(e) => handleInfoChange({ phone: e.target.value })}
            placeholder="Phone"
          />
        </div>
        <div className={classes.input_container}>
          <label>Email</label>

          <input
            type="text"
            value={info.email !== undefined ? info.email : company.email}
            onChange={(e) => handleInfoChange({ email: e.target.value })}
            placeholder="Email"
          />
        </div>
        <div className={classes.input_container}>
          <label>Reg No</label>
          <input
            type="text"
            value={info.reg_no !== undefined ? info.reg_no : company.reg_no}
            onChange={(e) => handleInfoChange({ address: e.target.value })}
            placeholder="Address"
          />
        </div>
        <div className={classes.input_container}>
          <label>Company TIN Number</label>
          <input
            type="text"
            value={
              info.tin_number !== undefined
                ? info.tin_number
                : company.tin_number
            }
            onChange={(e) => handleInfoChange({ tin_number: e.target.value })}
            placeholder="Company TIN NUMBER"
          />
        </div>
        <div className={classes.input_container}>
          <label>RC/BN</label>
          <input
            type="text"
            value={info.rcbn ? info.rcbn : company.rcbn ? company.rcbn : ""}
            onChange={(e) => handleInfoChange({ rcbn: e.target.value })}
            placeholder="RC/BN"
          />
        </div>
        <div className={classes.input_container}>
          <label>Address</label>
          <input
            type="text"
            value={info.address !== undefined ? info.address : company.address}
            onChange={(e) => handleInfoChange({ address: e.target.value })}
            placeholder="Address"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={editCompany}
          disabled={loading}
        >
          Edit Profile
        </Button>
      </Box>
      <Box className={classes.profile}>
        <Box
          display="flex"
          justifyContent="center"
          padding="10px"
          height="70vh"
        >
          <Avatar sx={{ backgroundColor: "orange" }}>
            {company.name?.slice(0, 1).toUpperCase()}
          </Avatar>
        </Box>
      </Box>
    </div>
  );
};

export default Details;
