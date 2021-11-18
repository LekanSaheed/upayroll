import classes from "./Details.module.css";
import { useState } from "react";

const Details = () => {
  const [name, setName] = useState("");
  const [tinNumber, setTinNumber] = useState("");
  const [rcbn, setRcbn] = useState("");
  const [address, setAddress] = useState("");
  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <div className={classes.input_container}>
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Company Name"
          />
        </div>
        <div className={classes.input_container}>
          <label>Company TIN Number</label>
          <input
            type="text"
            value={tinNumber}
            onChange={(e) => setTinNumber(e.target.value)}
            placeholder="Company TIN NUMBER"
          />
        </div>
        <div className={classes.input_container}>
          <label>RC/BN</label>
          <input
            type="text"
            value={rcbn}
            onChange={(e) => setRcbn(e.target.value)}
            placeholder="RC/BN"
          />
        </div>
        <div className={classes.input_container}>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </div>
      </form>
    </div>
  );
};

export default Details;
