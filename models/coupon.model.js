const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true },
  discount: { type: String, required: true },
  expireDate: { type: Date, required: true },
  isActive: Boolean,
});

export const Coupon =
  mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
