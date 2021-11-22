import {
  Card,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
  Checkbox,
} from "@mui/material";
import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import MySelect from "../../../components/MySelect";
import { makeStyles } from "@material-ui/core";
const AddPayRun = () => {
  const not = (a, b) => {
    return a.filter((value) => b.indexOf(value) === -1);
  };
  const intersection = (a, b) => {
    return a.filter((value) => b.indexOf(value) !== -1);
  };

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([0, 1, 2, 3]);
  const [right, setRight] = useState([4, 5, 6, 7]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };
  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };
  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const id = `transfer-list-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": id,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={id} primary={`Employee ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
  const useStyles = makeStyles((theme) => ({
    root: {},
    inputContainer: {
      [theme.breakpoints.down(766)]: {
        flexDirection: "column",
      },
    },
  }));
  const classes = useStyles();
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
        <Box display="flex" flexDirection="column" gap="20px" margin="20px 0">
          <Box
            className={classes.inputContainer}
            display="flex"
            gap="40px"
            width="100%"
          >
            <MySelect placeholder="Select Paygroup" />
          </Box>
          <Box gap="40px" className={classes.inputContainer} display="flex">
            <label>Payment Period</label>
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              type="date"
            />
            <TextField
              size="small"
              fullWidth={true}
              variant="outlined"
              type="date"
            />
          </Box>
        </Box>
        <Button>Add PayRun</Button>
      </Box>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item> {customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              Move All left
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              Move all right
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
      </Grid>
    </Wrapper>
  );
};

export default AddPayRun;
