import { ChevronRightOutlined } from "@mui/icons-material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlexBox from "../../components/FlexBox.jsx";

import {
  getAccessToken,
  getBankAccounts,
  setBankAccounts,
} from "../../state/api";

const BankInfo = ({ mergedArray }) => {
  const navigate = useNavigate();
  return (
    <>
      {mergedArray.map(({ accounts, institution }) => (
        <div>
          <FlexBox
            sx={{
              justifyContent: "flex-start",
              width: "100%",
              margin: "0.2rem",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/account-info")}
              variant="contained"
              color="primary"
              endIcon={<ChevronRightOutlined />}
              sx={{
                width: "45vw",
                height: "4.5rem",
              }}
            >
              <FlexBox
                sx={{
                  justifyContent: "flex-start",
                  width: "100%",
                  flexWrap: "wrap",
                  alignContent: "center",
                  alignItems: "center",

                  // margin: "auto",
                }}
              >
                <AccountBalanceIcon
                  sx={{ width: "5%", marginRight: "0.5rem" }}
                />
                <Typography
                  sx={{
                    flex: "2",
                    flexShrink: "0",
                    textAlign: "start",
                  }}
                >
                  {institution + " " + accounts.name + " *" + accounts.mask}
                </Typography>
                <Typography sx={{ flex: "1", flexShrink: "0" }}>
                  {"Balance: " + "$" + accounts.balances.available}
                </Typography>
              </FlexBox>
            </Button>
          </FlexBox>
        </div>
      ))}
    </>
  );
};

//after user logs in and passes in the public token we render this component
export const PlaidAuth = ({ publicToken, user, institution }) => {
  const [plaidAccessToken, setPlaidAccessToken] = useState();
  const [accounts, setAccounts] = useState([]);
  const [accountNumbers, setAccountNumbers] = useState([]);

  //function that merges two array of objs into one for easy access
  const mergeArrays = (accounts, accountNumbers) => {
    const mergedData = {};
    let i = 0;

    accounts.forEach((obj) => {
      mergedData[i] = { ...mergedData[i], ...obj };
      i++;
    });
    i = 0;

    accountNumbers.forEach((obj) => {
      mergedData[i] = { ...mergedData[i], ...obj }; // Use j instead of i
      i++;
    });
    return Object.values(mergedData);
  };

  //only executes when user ADDS NEW BANK, in other words when they get a new access_token. gets accesstoken and sets bank info
  useEffect(() => {
    const fetchAccessToken = async (publicToken, user) => {
      try {
        const accessToken = await getAccessToken(publicToken, user);
        setPlaidAccessToken(accessToken.data.accessToken);
        console.log("access token: ", accessToken.data);
      } catch (error) {
        console.error(error);
      }
    };

    const settingBankAccounts = async (user, institution) => {
      try {
        const auth = await setBankAccounts(user, institution);
        console.log("bank info set!", auth.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBankAccounts = async (user) => {
      try {
        const result = await getBankAccounts(user);
        console.log("getting banks:! ", result.data);
        //set state
        setAccounts(result.data.accountInfoList);
        setAccountNumbers(result.data.achNumbersList);
        //returns array of objects
        // console.log("accounts: ", accounts);
        // console.log("accountNumbers: ", accountNumbers);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      //if user clicked the plaid link
      if (publicToken !== undefined) {
        try {
          const accessToken = await fetchAccessToken(publicToken, user);
          await settingBankAccounts(user, institution);
          await fetchBankAccounts(user);
        } catch (error) {
          console.error(error);
        }
      } else {
        // Public token is undefined, user didn't add a new bank
        fetchBankAccounts(user);
      }
    };

    fetchData();
  }, [publicToken, user, institution]);

  // Calculate mergedArray after fetching data
  const mergedArray = mergeArrays(accounts, accountNumbers);
  console.log("merged array: ", mergedArray);

  return (
    <div>
      {mergedArray.length > 0 ? (
        <BankInfo mergedArray={mergedArray} />
      ) : (
        <div>Please 操你妈</div>
      )}
    </div>
  );
};
