const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
} = require("../controllers/product.controller");
const { productImages } = require("../middlewares/multer");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getSingleProduct);
productRouter.post("/create", productImages, createProduct);

module.exports = productRouter;
