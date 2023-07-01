import mongoose, { trusted } from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const reqNumber = {
  type: Number,
  required: true,
};
const transactionSchema = mongoose.Schema(
  {
    userId: reqString,
    symbol: reqString,
    storeName: reqString,
    purchaseAmount: reqNumber,
    category: reqString,
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FinanceSchema = new mongoose.Schema({
  transactions: [transactionSchema],
});

//model for our users collection using the UserSchema
export const FinanceModel = mongoose.model("finances", FinanceSchema);
