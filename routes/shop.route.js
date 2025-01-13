const express = require("express");
const {
  getProductsByShop,
  getAllShop,
  createShop,
  deleteShop,
} = require("../controllers/shop.controller");
const { logo } = require("../middlewares/multer");
const ROLES = require("../constants/roles");
const { auth } = require("../middlewares/auth");

const shopRouter = express.Router();

shopRouter.get("/", getAllShop);
shopRouter.get("/:shopId/products", getProductsByShop);
shopRouter.post("/", logo, auth(ROLES.VENDOR), createShop);
shopRouter.delete("/:shopId", auth(ROLES.VENDOR, ROLES.ADMIN), deleteShop);

module.exports = shopRouter;
