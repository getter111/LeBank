import express from "express";
import {
  createLinkToken,
  exchangePublicToken,
  getBankAccounts,
  getTransactions,
  setBankAccounts,
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

//Get incremental transaction updates on an Item
router.post("/transactions/sync", getTransactions);
export { router as plaidRouter };
