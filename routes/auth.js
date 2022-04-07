const express = require("express");
const User = require("../models/User");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, fullname, password } = req.body;
  if (!username || !fullname || !password)
    return res.status(401).json({
      success: false,
      message: "Missing fields, please doublecheck your request",
    });

  try {
    const checkExists = await User.findOne({ username });
    if (checkExists)
      return res.status(401).json({
        success: false,
        message: "Username already exists, please try again",
      });

    const hashedPassword = await argon2.hash(password);

    const newUser = await new User({
      username,
      fullname,
      password: hashedPassword,
    });
    await newUser.save();

    const accessToken = await jwt.sign(
      { userId: newUser._id },
      process.env.SECRET_TOKEN
    );

    return res.status(200).json({
      success: true,
      message: "Create new user successfully",
      accessToken,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Internal server error: ${err}` });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(401).json({
      success: false,
      message: `Missing fields, please doublecheck your request`,
    });

  try {
    const checkUserExists = await User.findOne({ username });
    if (!checkUserExists)
      return res
        .status(404)
        .json({ success: false, message: "User not found, please try again" });

    const validPassword = argon2.verify(checkUserExists.password, password);
    if (!validPassword)
      return res.status(403).json({
        success: false,
        message: "Bad request: wrong password, please try again",
      });

    const accessToken = jwt.sign(
      {
        userId: checkUserExists._id,
      },
      process.env.SECRET_TOKEN
    );

    return res
      .status(200)
      .json({ success: true, message: "Login successfully", accessToken });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Internal server error: ${err}` });
  }
});
