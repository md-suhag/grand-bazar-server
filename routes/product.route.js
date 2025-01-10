const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
} = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getSingleProduct);

module.exports = productRouter;
