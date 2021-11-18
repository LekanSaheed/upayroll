import { useState } from "react";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  return (
    <div>
      Add New Employee
      <form>
        <div className="flex-row gap justify-space">
          <div className="input_container">
            <label>First Name</label>
            <input />
          </div>
          <div className="input_container">
            <label>Last Name</label>
            <input />
          </div>
        </div>
        <div className="input_container">
          <div className="input_container">
            <label>Job Position</label>
            <input />
          </div>
        </div>
        <div className="flex-row gap ">
          <div className="input_container">
            <label>Email</label>
            <input />
          </div>
          <div className="input_container">
            <label>Phone</label>
            <input />
          </div>
        </div>
        <div className="flex-row gap ">
          <div className="input_container">
            <label>Gender</label>
            <input />
          </div>
          <div className="input_container">
            <label>Phone</label>
            <input />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
