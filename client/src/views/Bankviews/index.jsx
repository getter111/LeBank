import React, { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { getLinkToken } from "../../state/api";

const BankViews = ({ user }) => {
  const [linkToken, setLinkToken] = useState();
  const defaultUser = "User";

  useEffect(() => {
    const userLoggedin = async (user) => {
      try {
        const result = await getLinkToken(user);
        setLinkToken(result.data.link_token);
        console.log("user updated", result.data.link_token);
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
      console.log("success", public_token, metadata);
    },
  });

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};

export default BankViews;
