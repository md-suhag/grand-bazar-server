const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

export const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);
