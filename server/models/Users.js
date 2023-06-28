import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, min: 2, max: 100 },
  password: { type: String, required: true, min: 4 },
});

//model for our users collection using the UserSchema
export const UserModel = mongoose.model("users", UserSchema);
