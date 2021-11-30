import classes from "./Banner.module.css";
import { ListItem, Divider } from "@mui/material";
import Link from "next/link";

const HoverDrop = ({ details }) => {
  return (
    <div className={classes._container}>
      {details &&
        details.map((a, id) => {
          return (
            <div key={id}>
              <ListItem>
                <Link href={a.link}>{a.text}</Link>
              </ListItem>
              <Divider />
            </div>
          );
        })}
    </div>
  );
};

export default HoverDrop;
