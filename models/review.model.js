const { default: mongoose, Schema } = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

export const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);
