const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { productImages } = require("../middlewares/multer");
const { auth } = require("../middlewares/auth");
const ROLES = require("../constants/roles");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getSingleProduct);
productRouter.post("/create", productImages, createProduct);
productRouter.delete(
  "/:productId",
  auth(ROLES.VENDOR, ROLES.ADMIN),
  deleteProduct
);

module.exports = productRouter;
