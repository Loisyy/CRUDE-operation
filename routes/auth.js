
const express = require("express");
const router = express.Router();
const User = require('../models/users'); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()


// Register a new user
router.post("/register", async (req, res) => {
  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  await User.create({
    fullName: req.body.fullName,
    username: req.body.username,
    role: req.body.role,
    password: hashedPassword,
  });
  res.status(201).send("Created Successfully");
});

//to create a login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDetail = await User.findOne({ email });

  if (!userDetail) return res.status(404).send("user-not-found");
  //accept password by comparing 
  const doesPasswordMatch = bcrypt.compareSync(password, userDetail.password);

  if (!doesPasswordMatch) return res.status(400).send("invalid credentials");

  const { email: userEmail, _id, role } = userDetail;
  //passing user specfic details
  const token = jwt.sign(
    {
      email: userEmail,
      userId: _id,
      role: role,
    },
    process.env.jwt_secret
  );

  res.send({
    message: "Sign in successful",
    token,
  });
});

module.exports = router;

