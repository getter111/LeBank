import mongoose from "mongoose";

const FinanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  transaction_id: String,
  bank_account_id: String,
  amount: Number,
  category: String,
  date: Date,
  authorizedDate: Date,
  name: String,
  currencyCode: String,
  pendingTransactionId: String,
  pending: Boolean,
  icon: String,
  paymentChannel: String,
});

//model for our users collection using the UserSchema
export const FinanceModel = mongoose.model("transactions", FinanceSchema);
