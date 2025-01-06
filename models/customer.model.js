const { default: mongoose, Schema } = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    orders: { type: Schema.Types.objectId, ref: "Order" },
  },
  { timestamps: true }
);

export const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);
