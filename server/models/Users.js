import mongoose from "mongoose";
import { loadType } from "mongoose-currency";
loadType(mongoose);

let Currency = mongoose.Types.Currency;
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, min: 2, max: 100 },
    password: { type: String, required: true, min: 4 },
    accountBalance: {
      type: Currency,
      currency: "USD",
      //since currency takes the val and multiplies by hundred we gotta divide by 100 to get true val
      get: (val) => val / 100,
    },
    transactions: { type: Array },
    expensesByCategory: {
      type: Map,
      of: {
        type: Currency,
        currency: "USD",
        get: (val) => val / 100,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

//model for our users collection using the UserSchema
export const UserModel = mongoose.model("users", UserSchema);

//MOCK MODEL
//UPDATE LATER ACCORDING TO PLAID API
