import React from "react";
import { Skeleton } from "@mui/material";
const Skel = ({ width, height, anim, variant }) => {
  return (
    <Skeleton
      width={width}
      height={height}
      animation={anim}
      variant={variant}
    />
  );
};

export default Skel;
