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

  if (!file) return next(new AppError("Please Upload profile image", 400));
  const result = await uploadFilesToCloudinary([file]);

  const profileImg = {
    public_id: result[0].public_id,
    url: result[0].url,
  };
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    profileImg,
    role,
  });

  sendToken(res, user, 201, "user created");
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Invalid email or password", 404));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(new AppError("Invalid email or password", 404));
  }

  sendToken(res, user, 200, "login successful!");
});

module.exports = {
  login,
  register,
};
