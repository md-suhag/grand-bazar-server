const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const {
  registerValidator,
  validateHandler,
  loginValidator,
} = require("../lib/validators");
const { profileImg } = require("../middlewares/multer");

const authRouter = express.Router();

authRouter.post("/login", loginValidator(), validateHandler, login);
authRouter.post(
  "/register",
  profileImg,
  registerValidator(),
  validateHandler,
  register
);

module.exports = authRouter;
