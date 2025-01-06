const { default: mongoose, Schema } = require("mongoose");

const flashSaleSchema = new mongoose.Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  discount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const FlashSale =
  mongoose.models.FlashSale || mongoose.model("FlashSale", flashSaleSchema);
