import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { generalRoutes } from "../routes/general.js";
import { socialRoutes } from "../routes/socials.js";
import { userRouter } from "../routes/users.js";

dotenv.config();
const app = express();

//middleware data parsers
app.use(express.json());
app.use(cors());

//Routes
app.use("/user/auth", userRouter);
app.use("/general", generalRoutes);
app.use("/socials", socialRoutes);

const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`);
});
