import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { UserModel } from "../models/Users.js";

export const createLinkToken = async function (req, res) {
  try {
    //plaid api config
    const configuration = new Configuration({
      basePath: PlaidEnvironments.sandbox,
      baseOptions: {
        headers: {
          "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
          "PLAID-SECRET": process.env.PLAID_SANDBOX_ID,
        },
      },
    });

    //init plaid
    const plaidClient = new PlaidApi(configuration);

    // Get the client_user_id by searching for the current user,mayhaps pass in the username? to get the link token
    const { username } = req.params;
    const user = await UserModel.findOne({ username: username });
    const clientUserId = user._id;

    const plaidRequest = {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: clientUserId,
      },
      client_name: "Plaid Test App",
      products: ["auth"],
      language: "en",
      redirect_uri: "http://localhost:5173/",
      country_codes: ["US"],
    };

    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
    res.status(200).json(createTokenResponse.data);
  } catch (error) {
    res.status(500).json("error creating token response");
  }
};
