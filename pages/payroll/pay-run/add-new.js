import { Card, Box, TextField, Button } from "@mui/material";
import Wrapper from "../../../components/Wrapper";

const AddPayRun = () => {
  return (
    <Wrapper>
      <Box
        gap="20px"
        backgroundColor="#fff"
        padding="25px"
        borderRadius="3px"
        border="solid 1px #eded"
      >
        New Additional Pay Run
        <Box display="flex" gap="20px" margin="20px 0">
          <Box display="flex" gap="40px" width="50%" flexDirection="column">
            <TextField
              size="small"
              label="Company"
              fullWidth={true}
              variant="outlined"
            />
            <TextField
              size="small"
              label="Pay Period"
              fullWidth={true}
              variant="outlined"
            />
          </Box>
          <Box gap="40px" display="flex" width="50%" flexDirection="column">
            <TextField
              size="small"
              label="Pay Group"
              fullWidth={true}
              variant="outlined"
            />
            <TextField
              size="small"
              label="Payment Date"
              fullWidth={true}
              variant="outlined"
            />
          </Box>
        </Box>
        <Button>Add PayRun</Button>
      </Box>
    </Wrapper>
  );
};

export default AddPayRun;
