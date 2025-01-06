const { default: mongoose, Schema } = require("mongoose");

const categorySchema = new mongoose.Schema({});

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
