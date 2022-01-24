import Head from "next/head";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Login from "../components/Login";
import DashBoard from "../components/Dashboard";
import Wrapper from "../components/Wrapper";
import { useAuthState } from "../payrollContext/AuthContext";
import { useRouter } from "next/router";
export default function Home() {
  const { authenticated } = useAuthState();
  const router = useRouter();
  if (authenticated) {
    router.push("/payroll");
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Uhuru Pay Payroll System.</title>
        <meta name="description" content="uhuru pay, payroll, igr, revenue" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!authenticated && <Login />}
    </div>
  );
}
