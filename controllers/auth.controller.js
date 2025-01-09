const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("./../models/user.model");
const bcrypt = require("bcrypt");
const { sendToken, uploadFilesToCloudinary } = require("../lib/helper");

const register = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (role == "admin" && req?.user?.role !== "admin") {
    return next(new AppError("you can't create admin account", 403));
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return next(new AppError("User already exists!", 400));
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  const file = req.file;

  if (!file) return next(new AppError("Please Upload profile image"));
  const result = await uploadFilesToCloudinary([file]);

  const profileImg = {
    public_id: result[0].public_id,
    url: result[0].url,
  };
  const newUser = new User({
    name,
    email,
    password: hashPassword,
    profileImg,
    role,
  });
  await newUser.save();

  sendToken(res, newUser, 201, "user created");
});

const login = catchAsync(async (req, res, next) => {});

module.exports = {
  login,
  register,
};
