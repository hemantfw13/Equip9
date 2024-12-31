const express = require("express");
const UserModel = require("../models/User.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");

userRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, mobile, password } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ msg: "User registration failed", error: err.message });
      } else {
        const user = new UserModel({ firstName, lastName, mobile, password: hash });
        await user.save();
        res.send({ msg: "User registration successful" });
      }
    });
  } catch (e) {
    res.send({ msg: "User registration failed", error: e.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await UserModel.findOne({ mobile });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login Success",
            user: { firstName: user.firstName, lastName: user.lastName },
          });
        } else {
          res.status(400).send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.status(400).send({ msg: "Wrong Credentials" });
    }
  } catch (e) {
    res.status(500).send({ msg: "Error during login", error: e.message });
  }
});




userRouter.get("/", async (req, res) => {
  const { name } = req.query;

  if (name) {
    const user = await UserModel.findOne({ name });
    return res.json({ exists: !!user, user });
  }

  const users = await UserModel.find({});
  res.json({ users });
});





module.exports = { userRouter };
