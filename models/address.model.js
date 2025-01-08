const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: String,
  phone: String,
  addressLine1: String,
  city: String,
  state: String,
  zipCode: Number,
  country: String,
});

export const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema);
