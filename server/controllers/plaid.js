import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { BankAccountModel } from "../models/BankAccounts.js";
import { FinanceModel } from "../models/Finances.js";
import { UserModel } from "../models/Users.js";

const plaidConfig = function () {
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
  return new PlaidApi(configuration);
};

/**
 * funtion that initiates the creation of a link_token using the user's username
 * @param username the specified username in the url
 * @return the user's link token
 */
export const createLinkToken = async function (req, res) {
  try {
    const plaidClient = plaidConfig();

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
      products: ["auth", "transactions"],
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

/**
 * funtion that creates the user's access token
 * @param public_token the user's public token
 * @return the user's access token to access plaid apis
 */
export const exchangePublicToken = async function (req, res, next) {
  const publicToken = req.body.public_token;
  const caller = req.body.plaid_User; //username of who called the public -> access token exchange
  const plaidClient = plaidConfig();

  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = response.data.access_token;
    const itemID = response.data.item_id; //plaid id representing a connection to a bank

    //saving data to our db (<filter>, <data>)
    const update = await UserModel.updateOne(
      { username: caller },
      { $set: { plaidAccessToken: accessToken, plaidItemId: itemID } }
    );

    const data = response.data;
    res.status(200).json({
      public_token_exchange: "complete",
      accessToken,
      itemID,
      data,
      update,
    });
  } catch (error) {
    res.status(500).json("error exchanging public token");
  }
};

// PlaidAuth stuff (retrieve and verify bank account info)//

/**
 * funtion that calls plaids api to set user's banking identification in the db
 * @param user the user that called this function to get the accesstoken for db
 * @return the user's banking account info
 */
export const setBankAccounts = async function (req, res) {
  try {
    const plaidClient = plaidConfig();
    const username = req.body.username;
    const institution = req.body.institution;

    const user = await UserModel.findOne({ username: username });

    const accessToken = user.plaidAccessToken;
    const plaidRequest = {
      access_token: accessToken,
    };

    //add new bank accounts to database and return all bank accounts in db
    const plaidResponse = await plaidClient.authGet(plaidRequest);

    const bankAccounts = plaidResponse.data.accounts; //holds the current added accounts
    const bankNumbers = plaidResponse.data.numbers.ach;
    //loop thru bankAccounts & bankNumbers
    const bankAccountEntries = bankAccounts.map((acc, index) => ({
      institution: institution, // Assign the institution name
      accounts: acc,
      achNumbers: bankNumbers[index],
    })); //type of array object

    //add some checks for duplicates
    const insertedBankAccountDocs = [];

    // Check for duplicates and insert only non-duplicate bank account entries
    for (const entry of bankAccountEntries) {
      const duplicate = await BankAccountModel.findOne({
        "achNumbers.account": entry.achNumbers.account, //using acc # to check dups
      });
      //if not found, we add to the collection
      if (!duplicate) {
        const bankAccountDoc = await BankAccountModel.create(entry);
        insertedBankAccountDocs.push(bankAccountDoc);
        console.log("not duplicate:", bankAccountDoc);
      }
    }

    // Get the IDs from the inserted bank accounts to add them to the user's connectedBankAccountIds array. if insertedBankAccountDocs is empty these never run either
    const bankAccountIds = insertedBankAccountDocs.map(
      (doc) => doc.achNumbers.account_id
    );
    bankAccountIds.forEach((id) => user.connectedBankAccountIds.push(id));
    await user.save();

    res.status(200).json(bankAccountIds);
  } catch (err) {
    res.status(500).json("failesdfd SETTING banking information");
  }
};

/**
 * funtion that returns the all of the user's associated connected banks
 * @param user the logged in user
 * @return all of user's bank accounts
 */
export const getBankAccounts = async function (req, res) {
  try {
    const { username } = req.params;
    // const username = req.body.username;
    const user = await UserModel.findOne({ username: username });
    // retrieve the associated bank accounts from BankAccountModel
    const associatedBankAccounts = await BankAccountModel.find({
      "achNumbers.account_id": { $in: user.connectedBankAccountIds },
    });

    const achNumbersList = [];
    const accountInfoList = [];

    associatedBankAccounts.forEach((account) => {
      achNumbersList.push(account.achNumbers);
      accountInfoList.push({
        institution: account.institution,
        accounts: account.accounts,
        _id: account._id,
      });
    });
    res.status(200).json({
      accountInfoList,
      achNumbersList,
    });
  } catch (err) {
    res.status(500).json("failesdfd GETTING banking information");
  }
};

// PlaidTransaction stuff (retrieve and verify bank account info)//

/**
 * fetches transactions data with the plaidapi and handles pagination if there are more transactions data to fetch.
 * @param accessToken the user's accessToken
 * @param cursor the user's cursor (starting line)
 * @return transactions data
 */
const syncMoreNewData = async function (accessToken, cursor) {
  const plaidClient = plaidConfig();
  const allData = { added: [], modified: [], removed: [], nextCursor: cursor };
  let hasMore = true;

  while (hasMore) {
    const request = {
      access_token: accessToken,
      cursor: allData.nextCursor,
      count: 50,
      options: { include_personal_finance_category: true },
    };

    const response = await plaidClient.transactionsSync(request);
    const newData = response.data;

    // Add this page of results
    allData.added = allData.added.concat(newData.added);
    allData.modified = allData.modified.concat(newData.modified);
    allData.removed = allData.removed.concat(newData.removed);
    hasMore = newData.has_more;

    // Update cursor to the next cursor
    allData.nextCursor = newData.next_cursor;
  }

  return allData;
};

/**
 * gets users transactions.
 * @return transactions data
 */
export const getTransactions = async function (req, res) {
  try {
    const username = req.body.username;
    const user = await UserModel.findOne({ username: username });

    const accessToken = user.plaidAccessToken;
    let cursor = user.transactionsCursor || null; // Use the stored cursor from the user object. (starting point when fetching transactions again in the future)

    //transactionsData should send back unique transaction data as long as cursor is unique for the accesstoken
    const transactionsData = await syncMoreNewData(accessToken, cursor);
    user.transactionsCursor = transactionsData.nextCursor;
    await user.save();

    // Map fields from the Plaid transaction response
    const transactionsToAdd = transactionsData.added.map((trans) => ({
      userId: user._id,
      transaction_id: trans.transaction_id,
      bank_account_id: trans.account_id,
      amount: trans.amount,
      category: trans.personal_finance_category.primary,
      date: trans.date,
      authorizedDate: trans.authorized_date,
      name: trans.merchant_name ? trans.merchant_name : trans.name,
      currencyCode: trans.iso_currency_code,
      pendingTransactionId: trans.pending_transaction_id,
    }));

    // Save the fetched transactions to the MongoDB collection
    await FinanceModel.insertMany(transactionsToAdd);

    res.json(transactionsToAdd);
  } catch (error) {
    res.status(500).json("failed getting transactions");
  }
};
