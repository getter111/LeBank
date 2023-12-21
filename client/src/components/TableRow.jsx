import { Typography } from "@mui/material";
import React from "react";
import FlexBox from "./FlexBox";

const TableRow = ({
  date,
  transactionType,
  description,
  transacitonAmt,
  totalBalance,
}) => {
  return (
    <FlexBox sx={{ width: "49vw", padding: "0.69rem" }}>
      <Typography sx={{ flex: "1", textAlign: "center", alignSelf: "center" }}>
        {date}
      </Typography>
      <Typography sx={{ flex: "1", textAlign: "center", alignSelf: "center" }}>
        {transactionType}
      </Typography>
      <Typography sx={{ flex: "1", textAlign: "center", alignSelf: "center" }}>
        {description}
      </Typography>
      <Typography sx={{ flex: "1", textAlign: "center", alignSelf: "center" }}>
        {transacitonAmt}
      </Typography>
      <Typography sx={{ flex: "1", textAlign: "center", alignSelf: "center" }}>
        {totalBalance}
      </Typography>
    </FlexBox>
  );
};

export default TableRow;
