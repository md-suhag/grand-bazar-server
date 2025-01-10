const mongoose = require("mongoose");
const Product = require("../models/product.model");
const catchAsync = require("../utils/catchAsync");
const QueryBuilder = require("../utils/queryBuilder");
const Category = require("../models/category.model");
const Shop = require("../models/shop.model");
const AppError = require("../utils/appError");

const getSingleProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId)
    .populate("categoryId", "name")
    .populate("shopId", "name");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "product successfully fetched",
    product,
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(Product.find(), req.query)
    .filter()
    .sort()
    .paginate();

  const products = await queryBuilder.query
    .populate("categoryId", "name")
    .populate("shopId", "name");
  const totalProducts = await Product.countDocuments(
    queryBuilder.query._conditions
  );

  res.status(200).json({
    success: true,
    message: "products successfully fetched",
    count: products.length,
    totalPages: Math.ceil(totalProducts / (req.query.limit || 10)),
    currentPage: req.query.page || 1,
    products,
  });
});

module.exports = { getAllProducts, getSingleProduct };
