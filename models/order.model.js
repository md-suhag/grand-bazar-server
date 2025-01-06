const { default: mongoose, Schema } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    paymentStatus: Boolean,
    shippingAddress: String,
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
