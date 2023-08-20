import express from "express";
import {
  getUser,
  getUserWithName,
  loginUser,
  registerUser,
} from "../controllers/users.js";

const router = express.Router();

//route that returns user info
router.get("/get/:id", getUser);

//route that returns user info
router.get("/getByUsername/:username", getUserWithName);

//route that registers users into database
router.post("/register", registerUser);

//route that logs user into the app
router.post("/login", loginUser);

export { router as userRouter };
