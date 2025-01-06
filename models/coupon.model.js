const { default: mongoose, Schema } = require("mongoose");

const couponSchema = new mongoose.Schema({});

export const Coupon =
  mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
