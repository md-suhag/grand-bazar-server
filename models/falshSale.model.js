const { default: mongoose, Schema } = require("mongoose");

const flashSaleSchema = new mongoose.Schema({});

export const FlashSale =
  mongoose.models.FlashSale || mongoose.model("FlashSale", flashSaleSchema);
