import React from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../payrollContext/baseUrl";
import { useRouter } from "next/router";

const NewPassword = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const router = useRouter();
  const token = router.query.token
    ? JSON.parse(router.query.token)
    : "no-token-found";

  const newPass = async (e) => {
    e.preventDefault();
    await fetch(`${baseUrl}/company/reset/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  console.log(router.query);
  return (
    <div>
      <form>
        New Password
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <input
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button onClick={newPass}>Continue</button>
      </form>
    </div>
  );
};
export default NewPassword;
