import express from "express";
import {
  createLinkToken,
  exchangePublicToken,
  getBankAccounts,
  getBankTransactions,
  setBankAccounts,
  setTransactions,
} from "../controllers/plaid.js";

const router = express.Router();

//route creates a link-token to authenticate with plaid
router.post("/create_link_token/:username", createLinkToken);

//route creates a public token to access plaid api
router.post("/exchange_public_token", exchangePublicToken);

//sets banking info of user (rounting and bank info)
router.post("/auth/set/banks", setBankAccounts);

//fetches all of user's bank accounts
router.get("/auth/get/banks/:username", getBankAccounts);

//Get incremental transaction updates on an Item, put in db
router.get("/transactions/sync/:username", setTransactions);

//query database for user transactions
router.post("/get-transactions/:count", getBankTransactions);

export { router as plaidRouter };
