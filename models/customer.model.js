const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orders: { type: mongoose.Schema.Types.objectId, ref: "Order" },
  },
  { timestamps: true }
);

export const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);
