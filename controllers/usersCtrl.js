import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

// @desc      Register user
// @route     POST /api/v1/users/register
// @access    Private/Admin

export const registerUserCtrl = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  // check if users exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    // throw
    throw new Error("User already exists");
  }

  // hash password
  // create a salt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create the user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    data: user,
  });
});

// @desc      Login user
// @route     POST /api/v1/users/login
// @access    Public

export const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //  find the user in the db with the email only
  const userFound = await User.findOne({
    email,
  });

  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: "success",
      message: "User logged in successfully",
      userFound,
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error("Invalid login parameters");
  }
});

// @desc      Get user profile
// @route     GET/api/v1/users/profile
// @access    Private

export const getUserProfileCtrl = asyncHandler(async (req, res) => {
  const token = getTokenFromHeader(req);

  // verify token
  const verified = verifyToken(token);

  res.json({
    msg: "Welcome to Profile page",
  });
});
