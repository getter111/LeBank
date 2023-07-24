import express from "express";
import { createLinkToken } from "../controllers/plaid.js";

const router = express.Router();

//route creates a link-token to authenticate with plaid
router.post("/create_link_token/:username", createLinkToken);

export { router as plaidRouter };
