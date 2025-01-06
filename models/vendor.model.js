const { mongoose, Schema } = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    userId: { type: Schema.type.ObjectId, ref: "User" },
    shopId: { type: Schema.type.ObjectId, ref: "Shop" },
    paymentDetails: {},
  },
  { timestamps: true }
);

export const Vendor =
  mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
