const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  shopId: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  stock: { type: Number, required: true },
  discount: { type: Number },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
