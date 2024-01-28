import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBox from "../../components/FlexBox.jsx";
import { getBankAccounts, getBankTransactions } from "../../state/api.js";
import { ActionsTab } from "./ActionsTab.jsx";
import { SelectMenu } from "./SelectMenu.jsx";
import { TransactionStack } from "./TransactionStack.jsx";

// THERE IS SOMETHING WRONG WITH STATE. INCONSISTENT STATE SOMEWHERE MAYBE BANKID OR DAYCOUNT. BC IT IS NOT GETTING UPDATED AT THE SAME TIME? RESUTS IN TRANSACTIONS NOT BEING ACCURATE

const Accountant = ({ setCurrentPage, user }) => {
  //state for transactions api call
  const [transactions, setTransactions] = useState([]);
  const [dayCount, setDayCount] = useState("30");
  const [bankId, setBankId] = useState("all");

  //state for bank selectmenu
  const [bankAnchorEl, setBankAnchorEl] = useState(null);
  const [selectedBankIndex, setSelectedBankIndex] = useState(0);

  //state for day selectmenu
  const [dayAnchorEl, setDayAnchorEl] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  //state for ActionsTab filter buttons. true==expanded
  const [dateFilter, setDateFilter] = useState(false);
  const [descriptFilter, setDescriptFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState(false);
  const [costFilter, setCostFilter] = useState(false);

  //array of bank account info objects
  const [bankAccountInfo, setBankAccountInfo] = useState([]);
  const [BANK_OPTIONS, setBankOptions] = useState(["View All"]);

  const handleFilterClick = (index) => {
    switch (index) {
      case 1:
        setDateFilter(!dateFilter);
        break;
      case 2:
        setDescriptFilter(!descriptFilter);
        break;
      case 3:
        setTypeFilter(!typeFilter);
        break;
      case 4:
        setCostFilter(!costFilter);
        break;
    }
  };

  const handleClickBankListItem = (event) => {
    setBankAnchorEl(event.currentTarget);
    console.log(
      selectedBankIndex === bankAccountInfo.length
        ? "bank list was cicked bank info: all"
        : "bank list was clicked now showing bank info: " +
            bankAccountInfo[selectedBankIndex].accounts.account_id
    );
    // console.log(event.currentTarget);
    console.log("clcik list event " + BANK_OPTIONS);
    console.log("clcik list event bank id " + bankId);

    console.log("///////////////////////////////////////////////////////////");

    //maybe call a another function here to rerender???
  };

  //problem with state sync maybe because useeffect gets called first and it uses selectedIndex.when trying to use selectedBankIndex immediately after calling setSelectedBankIndex(index), it might not have updated yet. so just use index
  const handleBankMenuItemClick = (event, index) => {
    setSelectedBankIndex(index);
    handleBankClose();
    console.log("click event bankoptions: " + BANK_OPTIONS[index]);
    console.log("click event the selected bank index is: " + index);

    //set bankID to the selected bank account //using callback bc new state relies on prev state
    setBankId((prevBankId) =>
      index === bankAccountInfo.length
        ? "all"
        : bankAccountInfo[index].accounts.account_id
    );

    //if bankid is null aka all aka undefined meaning it is view all..
    // if (bankId == null || bankId == undefined) {
    //   console.log(
    //     "click event use all" +
    //       "bankAccount length == " +
    //       bankAccountInfo.length
    //   );
    // }

    console.log(
      "click event use all" + "bankAccount length == " + bankAccountInfo.length
    );
    console.log("click event bankid: " + bankId);
    console.log("///////////////////////////////////////////////////////////");
  };
  const handleBankClose = () => {
    setBankAnchorEl(null);
  };

  //DAYS select menu
  const DAY_OPTIONS = [
    "Last 30 Days",
    "Last 60 Days",
    "Pending only",
    "All availiable",
  ];
  const handleClickDayListItem = (event) => {
    setDayAnchorEl(event.currentTarget);
    // console.log(event.currentTarget);
  };
  const handleDayMenuItemClick = (event, index) => {
    setSelectedDayIndex(index);
    console.log(DAY_OPTIONS[index]);
    console.log("the selected day index is: " + index);

    handleDayClose();
    switch (index) {
      case 0:
        setDayCount(30);
        break;
      case 1:
        setDayCount(60);
        break;
      case 2:
        setDayCount("pending");
        break;
      case 3:
        setDayCount("global");
        break;
      default:
        setDayCount(30);
    }
  };
  const handleDayClose = () => {
    setDayAnchorEl(null);
  };

  /////////////////////////////////////////////////////////////

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let transactionsData = await getBankTransactions(
          user,
          dayCount,
          bankId
        );
        console.log("day: " + dayCount + " bank: " + bankId);
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

    const fectchBanks = async () => {
      try {
        const fectchedData = await getBankAccounts(user);
        const bankAccountData = fectchedData.data.accountInfoList;
        setBankAccountInfo(bankAccountData);

        console.log("useeffect bank index: " + selectedBankIndex);
        console.log("useeffect day index: " + dayCount);
        console.log(
          selectedBankIndex == bankAccountInfo.length
            ? "useeffect bankaccountinfo == all"
            : "useeffect bankaccountinfo: " +
                bankAccountInfo[selectedBankIndex].accounts.account_id
        );

        const bankOptions = bankAccountData.map((account) => {
          return (
            account.institution +
            " " +
            account.accounts.name +
            " *" +
            account.accounts.mask
          );
        });
        bankOptions.push("View All");

        setBankOptions(bankOptions);
        console.log(
          "useeffect bank options " +
            bankOptions[0] +
            bankOptions[1] +
            bankOptions[2]
        );
        console.log("useeffect bankid: " + bankId);

        console.log(
          "///////////////////////////////////////////////////////////"
        );
      } catch (err) {
        console.error(err);
      }
    };
    fectchBanks();
    fetchTransactions();
  }, [user, dayCount, bankId, selectedBankIndex]);

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
          alignItems: "flex-start",
          flexDirection: "column",
          marginTop: "1em",
          marginBottom: "20px",
        }}
      >
        <Box sx={{ padding: "40px 0" }}>
          <Typography>Available Balance</Typography>
          <Typography>$2,512.99</Typography>
          <SelectMenu
            selectMenuOptions={BANK_OPTIONS}
            anchorEl={bankAnchorEl}
            selectedIndex={selectedBankIndex}
            handleClickListItem={handleClickBankListItem}
            handleMenuItemClick={handleBankMenuItemClick}
            handleClose={handleBankClose}
          />
        </Box>

        <SelectMenu
          selectMenuOptions={DAY_OPTIONS}
          anchorEl={dayAnchorEl}
          selectedIndex={selectedDayIndex}
          handleClickListItem={handleClickDayListItem}
          handleMenuItemClick={handleDayMenuItemClick}
          handleClose={handleDayClose}
        />
      </FlexBox>
      <ActionsTab
        handleFilterClick={handleFilterClick}
        dateFilterExpanded={dateFilter}
        descriptFilterExpanded={descriptFilter}
        typeFilterExpanded={typeFilter}
        costFilterExpanded={costFilter}
      />
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
