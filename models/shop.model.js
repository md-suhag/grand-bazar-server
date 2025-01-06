const { default: mongoose } = require("mongoose");

const shopSchema = new mongoose.Schema({});

export const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema);
