import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import FlexBox from "./FlexBox";

const TableRow = ({
  date,
  merchantName,
  description,
  transacitonAmt,
  totalBalance,
  icon,
}) => {
  const imageUrl = icon;
  const altstring = icon.slice(43);
  const textColor = transacitonAmt < 0 ? "#4CAF50" : "inherit";
  return (
    //maybe add pending transactions here... as it wiil still be under account history
    <FlexBox sx={{ width: "49vw", padding: "0.69rem" }}>
      <Avatar
        alt={altstring}
        src={imageUrl}
        sx={{ width: 45, height: 45 }}
        variant="rounded"
      />
      <Typography
        sx={{
          flex: "1",
          textAlign: "center",
          alignSelf: "center",
          color: textColor,
        }}
      >
        {date}
      </Typography>
      <Typography
        sx={{
          flex: "1",
          textAlign: "center",
          alignSelf: "center",
          color: textColor,
        }}
      >
        {merchantName}
      </Typography>
      <Typography
        sx={{
          flex: "1",
          textAlign: "center",
          alignSelf: "center",
          color: textColor,
        }}
      >
        {description}
      </Typography>
      <Typography
        sx={{
          flex: "1",
          textAlign: "center",
          alignSelf: "center",
          color: textColor,
        }}
      >
        {transacitonAmt}
      </Typography>
      <Typography
        sx={{
          flex: "1",
          textAlign: "center",
          alignSelf: "center",
          color: textColor,
        }}
      >
        {totalBalance}
      </Typography>
    </FlexBox>
  );
};

export default TableRow;
