import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import FlexBox from "../../components/FlexBox.jsx";
import {
  getAccessToken,
  getBankAccounts,
  setBankAccounts,
} from "../../state/api";

const BankInfo = ({ mergedArray }) => {
  return (
    <>
      {mergedArray.map(
        ({ accounts, account_id, account, routing, institution }) => (
          <Accordion key={account_id} sx={{ bgcolor: "red", width: "45vw" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <FlexBox sx={{ paddingRight: "1rem" }}>
                <AccountBalanceIcon />
              </FlexBox>
              <FlexBox sx={{ flexDirection: "column" }}>
                <FlexBox sx={{ justifyContent: "flex-start", width: "100%" }}>
                  <Typography>{institution}</Typography>
                </FlexBox>

                <Typography>{accounts.name + " " + account}</Typography>
              </FlexBox>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{"Routing: " + routing}</Typography>
            </AccordionDetails>
          </Accordion>
        )
      )}
    </>
  );
};

//after user logs in and gets public token we render this component
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
        // setPlaidAccessToken(accessToken.data.accessToken);
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
        console.log("accounts: ", accounts);
        console.log("accountNumbers: ", accountNumbers);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
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
  //we need another function that populates the page with bank already in database, we dont want to only rely on fetch to popuate the page. we only fetch when user adds in new bank accounts, otherwise we should reply on the populate function

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
