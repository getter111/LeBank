import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //confirm user doesn't already exists
  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.json({
      message: "User already exists! Please choose another username!",
    });
  }

  //hash the new user's password
  const hashPass = await bcrypt.hash(password);

  //add the user to my database
  const newUser = new UserModel({ username, hashPass });
  await newUser.save();
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });

  if (!user) {
    return res.json({ message: "User not found" });
  }

  //compare if passwords match
  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) {
    res.json({ message: "Username or password does not match" });
  }

  //is a valid password... now logging in the user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, userId: user._id });
});

export { router as userRouter };
