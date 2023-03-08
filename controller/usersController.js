const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are Mandatory ");
  }

  const userAvaible = await User.findOne({ email });
  if (userAvaible) {
    res.status(400);
    throw new Error("user already registered");
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password", hashedPassword);
  // hash password
  const hashedPassword1 = await bcrypt.hash(password, 11);
  console.log("Hashed Password", hashedPassword1);
  //
  const user = await User.create({
    username: username,
    password: hashedPassword,
    email: email,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    throw new Error("user data is not valid");
  }
});

//@desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("ALL FIELDS ARE MANDATORY!");
  }
  const user = await User.findOne({ email });
  // compare password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userrname: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ATS,
      { expiresIn: "5m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc current user
//@route GET /api/users/current //these are called "labels"
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
