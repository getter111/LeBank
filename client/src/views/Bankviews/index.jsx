import React, { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { getAccessToken, getLinkToken } from "../../state/api";

// username: user_good
// password: pass_good
// If prompted to enter a 2FA code: 1234

const PlaidAuth = ({ publicToken }) => {
  useEffect(() => {
    const fetchAccessToken = async (publicToken) => {
      try {
        const accessToken = await getAccessToken(publicToken);
        console.log("access token: ", accessToken.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccessToken(publicToken);
  });
  return <div>{publicToken}</div>;
};

const BankViews = ({ user }) => {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
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
    },
  });

  return publicToken ? (
    <PlaidAuth publicToken={publicToken} />
  ) : (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};

export default BankViews;
