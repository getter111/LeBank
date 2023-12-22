import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
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

const ActionsTab = () => {
  return (
    <List
      component={Stack}
      direction="row"
      sx={{ border: "1px solid", width: "49vw" }}
    >
      <ListItem>
        <Button
          sx={{ flex: "1" }}
          onClick={() => navigate("/")}
          variant="contained"
          color="primary"
          endIcon={<ExpandMoreIcon />}
        >
          Date
        </Button>
      </ListItem>
      <ListItem>
        <Button
          sx={{ flex: "1" }}
          onClick={() => navigate("/")}
          variant="contained"
          color="primary"
          endIcon={<ExpandMoreIcon />}
        >
          Type
        </Button>
      </ListItem>
      <ListItem>
        <Button
          sx={{ flex: "1" }}
          onClick={() => navigate("/")}
          variant="contained"
          color="primary"
          endIcon={<ExpandMoreIcon />}
        >
          Description
        </Button>
      </ListItem>
      <ListItem>
        <Button
          sx={{ flex: "1" }}
          onClick={() => navigate("/")}
          variant="contained"
          color="primary"
          endIcon={<ExpandMoreIcon />}
        >
          Cost
        </Button>
      </ListItem>
      <ListItem>
        <ListItemText
          sx={{ flex: "1", textAlign: "center", bgcolor: "green" }}
          id="balance"
          primary="Balance"
        />
      </ListItem>
    </List>
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
      <FlexBox
        sx={{
          width: "49vw",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          color="primary"
          endIcon={<ExpandMoreIcon />}
          sx={{ alignSelf: "flex-start", marginBottom: "1em" }}
        >
          Last 30 Days
        </Button>
      </FlexBox>
      <ActionsTab />
      <TransactionStack />
    </FlexBox>
  );
};

export default Accountant;
