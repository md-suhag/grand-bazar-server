const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const { registerValidator, validateHandler } = require("../lib/validators");
const { profileImg } = require("../middlewares/multer");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post(
  "/register",
  profileImg,
  registerValidator(),
  validateHandler,
  register
);

module.exports = authRouter;
