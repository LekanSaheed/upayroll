import { useState, useEffect } from "react";
import { useAuthDispatch, useAuthState } from "../payrollContext/AuthContext";
import { toast } from "react-toastify";
import { baseUrl } from "../payrollContext/baseUrl";
import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter();
  useEffect(() => {
    if (authenticated) {
      router.push("/payroll");
    }
  }, []);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAuthDispatch();
  const { user, authenticated } = useAuthState();

  const login = async (e) => {
    e.preventDefault();
    const url = `${baseUrl}/company/login`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.trim().toLowerCase(),
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const token = data.token;
          //
          fetch(`${baseUrl}/company/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem("token", token);
              toast.success("Successfully logged in");
              dispatch("LOGIN", data.data);
              router.push("/payroll");
              console.log(user);
            })
            .catch((err) => {
              console.log(err);
              toast.error("Something went wrong");
            });
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form>
        <div>
          <label>Name</label>
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={login}>Login</button>
      </form>
    </div>
  );
};

export default Login;
