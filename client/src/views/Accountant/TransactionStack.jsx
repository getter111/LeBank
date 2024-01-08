import { Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import TableRow from "../../components/TableRow.jsx";

export const TransactionStack = ({ transactions }) => {
  const getBalance = () => {
    const initialBalance = { bal1: 0, bal2: 0 };

    const balance = transactions.reduce((acc, trans) => {
      if (trans.bank_account_id === "Kqzezd3kVpUpZXxmJe5KC14xGo8oz8HG6jBlE") {
        acc.bal1 += trans.amount;
      } else if (
        trans.bank_account_id === "5eQwQbypVLuRZz8Qx5EGso9B8noaqMS3xEPa3"
      ) {
        acc.bal2 += trans.amount;
      }
      return acc;
    }, initialBalance);

    console.log(balance);
    return balance;
  };

  return (
    <Stack
      sx={{ border: "1px solid", alignItems: "center" }}
      spacing={0.69}
      divider={
        <Divider sx={{ bgcolor: "white" }} orientation="horizontal" flexItem />
      }
    >
      <Typography
        sx={{
          border: "1px solid",
          textAlign: "start",
          width: "49vw",
          padding: "0.69rem",
        }}
      >
        ACCOUNT HISTORY
      </Typography>
      {transactions.map((transaction, index) => (
        <TableRow
          key={index}
          icon={transaction.icon}
          date={moment(transaction.date).format("ll")}
          merchantName={transaction.name}
          description={transaction.category}
          transacitonAmt={transaction.amount}
          totalBalance={6969}
        />
      ))}
      {transactions.length}
    </Stack>
  );
};
