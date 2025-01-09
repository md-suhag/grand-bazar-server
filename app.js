const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const notFound = require("./middlewares/notFound");
const authRouter = require("./routes/auth.route");
const { v2: cloudinary } = require("cloudinary");
const cookieParser = require("cookie-parser");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// api endpoints
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome! Multivendor ecommerce application's server is working.");
});

// Global Error handler middleware
app.use(globalErrorHandler);

// not found middleware
app.use(notFound);

module.exports = app;
