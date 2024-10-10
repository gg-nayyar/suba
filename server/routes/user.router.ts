import express from "express";
import cookieParser from "cookie-parser";
import userSchema from "../models/user.mongo";

const app = express();

app.use(cookieParser());

const userRouter = express.Router();

userRouter.post("/username", async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const checkUsername = await userSchema.findOne({
    username: req.body.username,
  });
  if (checkUsername && req.body.username == checkUsername.username) {
    return res.json({ username: "username already exist" });
  }
  const username = await userSchema.findOneAndUpdate(
    { accessToken: accessToken },
    { username: req.body.username }
  );
  await username?.save();
  return res.json({ username: "username saved" });
});

export default userRouter;
