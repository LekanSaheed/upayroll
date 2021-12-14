import classes from "./Details.module.css";
import { useState, useEffect } from "react";
import { baseUrl } from "../payrollContext/baseUrl";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { Button, Box, Card, Avatar } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { AiOutlineMail, AiOutlinePhone, AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
const Details = () => {
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const router = useRouter();
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
        "Content-Type": "application/json",
        Accept: "application/json",
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
            onChange={(e) => handleInfoChange({ reg_no: e.target.value })}
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
          flexDirection="column"
          justifyContent="start"
          padding="30px 18px"
          height="70vh"
        >
          <Avatar sx={{ backgroundColor: "orange" }}>
            {company.name?.slice(0, 1).toUpperCase()}
          </Avatar>
          <Box display="flex" flexDirection="column" paddingTop="7px">
            <span className={classes.name}>
              {company.name ? company.name : ""}
            </span>
            <span className={classes.userName}>
              {company.username ? "@" + company.username : ""}
            </span>
          </Box>

          <Box
            backgroundColor="#f5f5f5"
            borderRadius="14px"
            padding="13px 11px"
            display="flex"
            flexDirection="column"
            gridGap="10px"
            gap="10px"
            marginTop="15px"
            className={classes.profileCard}
          >
            <Box
              display="flex"
              height="100px"
              flexDirection="column"
              borderRadius="30px"
              aligItems="center"
              gap="15px"
              gridGap="15px"
              fontSize="18px"
              paddingTop="10px"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <span>
                  {company.balance
                    ? "N" +
                      company.balance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : 0}
                </span>

                <Button
                  onClick={() => router.push("/payroll/topup")}
                  endIcon={<AiOutlinePlus />}
                  color="primary"
                  style={{
                    background: "#4bc2bc",
                    color: "white",
                    borderRadius: "17px",
                    textTransform: "capitalize",
                  }}
                  variant="contained"
                  size="small"
                >
                  Top Up
                </Button>
              </Box>
            </Box>
            <span className={classes.flex}>
              <div className={classes.icon}>
                <AiOutlineMail />
              </div>
              {company.email ? company.email : ""}
            </span>
            <span className={classes.flex}>
              <div className={classes.icon}>
                <AiOutlinePhone />
              </div>
              {company.phone ? company.phone : ""}
            </span>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Details;
