const { body, param, validationResult } = require("express-validator");
const AppError = require("../utils/appError.js");

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new AppError(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("email", "Please Enter Email").isEmail().normalizeEmail(),
  body(
    "password",
    "Password must be strong (8-20 chars, uppercase, number, special char)"
  )
    .notEmpty()
    .isStrongPassword(),
];

const loginValidator = () => [
  body("email", "Please Enter Email").isEmail(),
  body(
    "password",
    "Password must be at least 8 characters and max 20 characters"
  )
    .notEmpty()
    .isLength({ min: 8, max: 20 }),
];

module.exports = { loginValidator, registerValidator, validateHandler };
