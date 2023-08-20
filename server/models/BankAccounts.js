import mongoose from "mongoose";

const BankAccountSchema = new mongoose.Schema(
  {
    institution: String,
    accounts: {
      balances: {
        available: Number,
        current: Number,
        iso_currency_code: String,
        limit: Number,
        unofficial_currency_code: String,
      },
      account_id: String,
      mask: String,
      name: String,
      official_name: String,
      subtype: String,
      // type: String, // L Mongoose
    },
    achNumbers: {
      account: String,
      account_id: String,
      routing: String,
      wire_routing: String,
    },
  },
  {
    timestamps: true,
  }
);

//model for our users collection using the UserSchema
export const BankAccountModel = mongoose.model("banks", BankAccountSchema);
