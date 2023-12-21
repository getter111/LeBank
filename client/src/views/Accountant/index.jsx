import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBox from "../../components/FlexBox.jsx";
import TableRow from "../../components/TableRow.jsx";

const TransactionStack = () => {
  const [date, setDate] = useState("11/21/2023");
  const [transactionType, setTransactionType] = useState("Credit");
  const [description, setDescription] = useState("Clemson University DIR DEP");
  const [transacitonAmt, setTransacitonAmt] = useState("$211.63");
  const [totalBalance, setTotalBalance] = useState("$1,350.49");

  return (
    <Stack
      sx={{ border: "1px solid", alignItems: "center" }}
      spacing={1}
      divider={
        <Divider sx={{ bgcolor: "white" }} orientation="horizontal" flexItem />
      }
    >
      <TableRow
        date={date}
        transactionType={transactionType}
        description={description}
        transacitonAmt={transacitonAmt}
        totalBalance={totalBalance}
      />
      <TableRow
        date={date}
        transactionType={transactionType}
        description={description}
        transacitonAmt={transacitonAmt}
        totalBalance={totalBalance}
      />
    </Stack>
  );
};

const Accountant = ({ setCurrentPage, user }) => {
  setCurrentPage("Accountant");
  return (
    <FlexBox
      sx={{
        width: "100%",
        height: "69vh",
        flexDirection: "column",
      }}
    >
      <div>gangy</div>
      <TransactionStack />
    </FlexBox>
  );
};

export default Accountant;
