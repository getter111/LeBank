import { Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import FlexBox from "../../components/FlexBox";
import { getLinkToken } from "../../state/api";
import { PlaidAuth } from "./PlaidAuth";
// username: user_good
// password: pass_good
// If prompted to enter a 2FA code: 1234

const BankViews = ({ user }) => {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  const [institution, setInstitution] = useState("Some Bank");
  const defaultUser = "User";

  useEffect(() => {
    const userLoggedin = async (user) => {
      try {
        const result = await getLinkToken(user);
        setLinkToken(result.data.link_token);
        console.log(user + "s link_token:", result.data.link_token);
      } catch (error) {
        console.log(error);
      }
    };

    //if user != our default, we call for new link token
    if (user !== defaultUser) {
      userLoggedin(user);
    }
  }, [user]);

  //plaid-link ui for logging into bank account
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      // send public_token to server
      setPublicToken(public_token);
      console.log("log in success. public_token:", public_token, metadata);
      setInstitution(metadata.institution.name); //might have to add to db as well hehe
      console.log(metadata);
    },
  });

  return linkToken ? (
    <FlexBox
      sx={{
        bgcolor: "#32332e",
        height: "calc(100vh - 4rem)",
      }}
    >
      <FlexBox
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "4rem",
          width: "50%",
          height: "100%",
        }}
      >
        <PlaidAuth
          publicToken={publicToken}
          user={user}
          institution={institution}
        />

        <FlexBox>
          <Button
            onClick={() => open()}
            disabled={!ready}
            variant="contained"
            color="primary"
            sx={{
              marginTop: "1rem",
              width: "45vw",
              height: "3rem",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography>Connect a bank account</Typography>
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  ) : (
    <div>Login to connect to a bank account.</div>
    //<PlaidAuth/>
  );
};

export default BankViews;
