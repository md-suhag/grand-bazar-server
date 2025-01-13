const { default: mongoose } = require("mongoose");
const Product = require("../models/product.model");
const Shop = require("../models/shop.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Vendor = require("../models/vendor.model");
const { uploadFilesToCloudinary } = require("../lib/helper");
const { v2: cloudinary } = require("cloudinary");

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
const createShop = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;
  const existShop = await Shop.findOne({ name });
  if (existShop) {
    return next(new AppError("This shop already exists", 400));
  }
  const vendor = await Vendor.findOne({ userId: req.user._id });
  const file = req.file;
  if (!file) {
    return next(new AppError("Please upload logo", 400));
  }
  const result = await uploadFilesToCloudinary([file]);
  const logo = {
    public_id: result[0].public_id,
    url: result[0].url,
  };

  const newShop = await Shop.create({
    vendorId: vendor._id,
    logo,
    name,
    description,
  });

  res.status(201).json({
    success: true,
    newShop,
    message: "New shop created successfully",
  });
});
const deleteShop = catchAsync(async (req, res, next) => {
  const { shopId } = req.params;

  const shop = await Shop.findById(shopId);
  if (!shop) {
    return next(new AppError("Shop not found", 404));
  }

  const vendor = await Vendor.findOne({ userId: req.user._id });
  if (
    req.user.role !== "admin" &&
    (!vendor || !shop.vendorId.equals(vendor._id))
  ) {
    return next(new AppError("Unauthorized to delete this shop", 403));
  }
  await cloudinary.uploader.destroy(shop.logo.public_id);
  await Shop.findByIdAndDelete(shopId);

  res.status(200).json({
    success: true,
    message: "Shop deleted successfully",
  });
});

module.exports = {
  getProductsByShop,
  getAllShop,
  deleteShop,
  createShop,
};
