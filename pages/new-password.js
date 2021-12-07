import React from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../payrollContext/baseUrl";

const NewPassword = () => {
  const [password, setpassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const newPass = async (e) => {
    e.preventDefault();
    await fetch(`${baseUrl}/company/reset/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify({
        resetToken: token,
        password: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success("Password Reset was Successful");
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form>
        New Password
        <input value={password} onChange={(e) => {
            setPassword(e.target.value)
        } />
        <input value={confirmPassword} onChange={(e) => {
            setConfirmPassword(e.target.value)
        }}/>
        <button onClick={newPass}></button>
      </form>
    </div>
  );
};
export default NewPassword;
