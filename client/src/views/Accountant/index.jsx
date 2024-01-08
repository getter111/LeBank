import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBox from "../../components/FlexBox.jsx";
import { getBankTransactions } from "../../state/api.js";
import { ActionsTab } from "./ActionsTab.jsx";
import { TransactionStack } from "./TransactionStack.jsx";

const Accountant = ({ setCurrentPage, user }) => {
  const theme = useTheme();

  //state for transactions api call
  const [transactions, setTransactions] = useState([]);
  const [dayCount, setDayCount] = useState("30");
  const [bankId, setBankId] = useState("all");

  //select menu stuff
  const selectMenuOptions = [
    "Plaid Gold Standard 0% Interest Checking",
    "Plaid Silver Standard 0.1% Interest Saving",
    "1111222233331111",
    "1111222233330000",
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    console.log(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let transactionsData = await getBankTransactions(
          user,
          dayCount,
          bankId
        );
        console.log(
          "transaction fetched: ",
          transactionsData.data.transactions
        );
        setTransactions(transactionsData.data.transactions);
        setCurrentPage("Accountant");
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, [user]);

  useEffect(() => {
    console.log("Updated transactions:", transactions);
  }, [transactions]);

  return (
    <FlexBox
      sx={{
        width: "100%",
        minHeight: "49vh",
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
        {/* Last (x) days button */}
        <Button
          onClick={() => {
            console.log("hi");
          }}
          variant="contained"
          color="primary"
          endIcon={<ExpandMoreIcon />}
          sx={{ alignSelf: "flex-start", marginBottom: "1em" }}
        >
          Last 30 Days
        </Button>
        <List
          component="nav"
          aria-label="Device settings"
          sx={{ bgcolor: theme.palette.primary.main }}
        >
          <ListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="selected bank account"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              sx={{
                "& .MuiListItemText-primary": {
                  color: "green",
                },
                "& .MuiListItemText-secondary": {
                  color: "blue",
                },
              }}
              primary={`Selected Bank Account: ${selectMenuOptions[selectedIndex]}`}
              secondary={selectMenuOptions[selectedIndex]}
            />
            <IconButton
              edge="end"
              aria-label="expand more"
              aria-haspopup="true"
              size="small"
            >
              <ExpandMoreIcon />
            </IconButton>
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
          sx={{
            "& ul": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          {selectMenuOptions.map((option, index) => (
            <MenuItem
              key={option}
              // disabled={index === 0}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
              sx={{
                color:
                  index === selectedIndex
                    ? "green"
                    : theme.palette.text.secondary,
                borderBottom:
                  index === selectedIndex
                    ? `2px solid ${theme.palette.secondary.main}`
                    : "none",
                "&:hover": {
                  color: index === selectedIndex ? "white" : "green",
                },
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </FlexBox>
      <ActionsTab />
      {transactions.length === 0 ? (
        <FlexBox
          sx={{
            width: "49vw",
            justifyContent: "center",
            flexDirection: "row",
            height: "11vh",
          }}
        >
          <Typography>Please Log in to see transactions data </Typography>
        </FlexBox>
      ) : (
        <TransactionStack user={user} transactions={transactions} />
      )}
    </FlexBox>
  );
};

export default Accountant;
