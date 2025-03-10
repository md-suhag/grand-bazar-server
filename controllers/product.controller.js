const mongoose = require("mongoose");
const Product = require("../models/product.model");
const catchAsync = require("../utils/catchAsync");
const QueryBuilder = require("../utils/queryBuilder");
const Category = require("../models/category.model");
const Shop = require("../models/shop.model");
const AppError = require("../utils/appError");
const { uploadFilesToCloudinary } = require("../lib/helper");
const { v2: cloudinary } = require("cloudinary");

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

const createProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, categoryId, shopId, stock, discount } =
    req.body;

  const files = req.files;

  if (!files) return next(new AppError("Please Upload product images", 400));
  const images = await uploadFilesToCloudinary(files);

  const product = await Product.create({
    name,
    description,
    images,
    price,
    discount,
    stock,
    categoryId,
    shopId,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId).populate({
    path: "shopId",
    select: "vendorId",
    populate: { path: "vendorId", select: "userId" },
  });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  if (
    product.shopId?.vendorId?.userId?.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new AppError("Unauthorized to delete this product", 403));
  }

  if (product.images && product.images.length > 0) {
    await Promise.all(
      product.images.map((image) =>
        cloudinary.uploader.destroy(image.public_id)
      )
    );
  }

  await Product.findByIdAndDelete(productId);

  return res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
};
