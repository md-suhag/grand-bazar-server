const express = require("express");
const { getAllProducts } = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);

module.exports = productRouter;
