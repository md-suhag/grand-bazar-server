const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.type.ObjectId, ref: "User" },
    shopId: { type: mongoose.Schema.type.ObjectId, ref: "Shop" },
    paymentDetails: {},
  },
  { timestamps: true }
);

export const Vendor =
  mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
