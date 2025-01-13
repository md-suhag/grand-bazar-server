const express = require("express");
const {
  getProductsByShop,
  getAllShop,
  createShop,
  deleteShop,
} = require("../controllers/shop.controller");

const shopRouter = express.Router();

shopRouter.get("/", getAllShop);
shopRouter.get("/:shopId/products", getProductsByShop);
shopRouter.post("/", createShop);
shopRouter.delete("/:shopId", deleteShop);

module.exports = shopRouter;
