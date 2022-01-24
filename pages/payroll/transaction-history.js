import DepositHistory from "../../components/DepositHistory";
import Wrapper from "../../components/Wrapper";
import { Paper } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
const TransactionHistory = () => {
  const customTool = () => {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };
  return (
    <Wrapper>
      <Paper>
        <DepositHistory components={{ Toolbar: customTool }} />
      </Paper>
    </Wrapper>
  );
};
export default TransactionHistory;
