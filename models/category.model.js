const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: String,
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
