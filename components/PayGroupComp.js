import Link from "next/link";
import { Button } from "@mui/material";

const PayGroupComp = () => {
  return (
    <div>
      PayGroup
      <div>Pay Run List</div>
      <div>Create New payRun</div>
      <Link href="/payroll/pay-run/add-new">+ Create New</Link>
    </div>
  );
};

export default PayGroupComp;
