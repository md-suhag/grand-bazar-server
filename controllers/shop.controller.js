const { default: mongoose } = require("mongoose");
const Product = require("../models/product.model");
const Shop = require("../models/shop.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getAllShop = catchAsync(async (req, res, next) => {
  const shops = await Shop.find({});
  if (!shops.length) {
    return next(new AppError("No shops found", 404));
  }
  res.status(200).json({
    success: true,
    shops,
    message: "Shops successfully fetched",
  });
});

const getProductsByShop = catchAsync(async (req, res, next) => {
  const { shopId } = req.params;

  const products = await Product.find({
    shopId: new mongoose.Types.ObjectId(shopId),
  });
  if (!products.length) {
    return next(new AppError("No products found for this shop", 404));
  }

  res.status(200).json({
    success: true,
    products,
    message: "Shop products successfully fetched",
  });
});
const createShop = catchAsync(async (req, res, next) => {});
const deleteShop = catchAsync(async (req, res, next) => {});

module.exports = {
  getProductsByShop,
  getAllShop,
  deleteShop,
  createShop,
};
