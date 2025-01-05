const { default: mongoose } = require("mongoose");

const shopSchema = new mongoose.Schema({});

const Shop = mongoose.model("Shop", shopSchema);
