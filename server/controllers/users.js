import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

/**
 * funtion that responds to get request for a specific user id
 * @param id the specified id in the url
 * @return the user information with the corresponding "id"
 */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * funtion that registers a new user into the database
 * @param username username for they account
 * @param password password for they account
 * @return message indicating if registered successfully or nah
 */
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  //confirm user doesn't already exists
  const user = await UserModel.findOne({ username: username });
  if (user) {
    return res.status(400).json({
      message: "User already exists! Please choose another username!",
    });
  }

  //hash the new user's password
  const hashPass = await bcrypt.hash(password, 10);

  //add the user to my database
  const newUser = new UserModel({ username, password: hashPass });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
};

/**
 * funtion that signs in and authenticates that it is said user
 * @param username users username creditentials
 * @param password users password creditentials
 * @return alert if logged in success or nah
 */
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });

  if (!user) {
    return res.status(404).json({ message: "User not found", status: 404 });
  }

  //compare if passwords match
  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) {
    return res.status(404).json({
      message: "Username or password does not match",
      input: password,
      status: 404,
    });
  }

  //is a valid password... now logging in the user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token, userId: user._id });
};
