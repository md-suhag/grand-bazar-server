const { default: mongoose, Schema } = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    logo: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    description: String,
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema);
