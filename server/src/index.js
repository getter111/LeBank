import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { userRouter } from "../routes/users.js";

//data imports
import { dataUser } from "../data/data.js";
import { UserModel } from "../models/Users.js";

dotenv.config();
const app = express();

//middleware data parsers
app.use(express.json()); //parse json data -> object
app.use(express.urlencoded({ extended: false })); // parse URL-encoded data -> object
app.use(cors()); //ability for frontend to access our apis

//Routes
app.use("/user/auth", userRouter);

//link to our api
const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`);

  //ONE time data import
  // UserModel.insertMany(dataUser);
});
