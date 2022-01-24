import { TableHead } from "@mui/material";
import { makeStyles } from "@mui/styles";
const StyledHead = ({ children }) => {
  const useStyles = makeStyles({
    root: {
      "& .MuiTableCell-head": {
        fontWeight: "bolder",
        backgroudColor: "#4bc2bc",
      },
    },
  });
  const classes = useStyles();
  return <TableHead className={classes.root}>{children}</TableHead>;
};

export default StyledHead;
