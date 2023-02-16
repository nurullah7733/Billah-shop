const mongoose = require("mongoose");

var productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: { type: Number, required: [true, "Quantity is required"] },
    sold: { type: Number, default: 0 },
    img: { type: Array },
    color: { type: String },
    ratings: [
      { star: Number, comment: String, author: mongoose.Schema.Types.ObjectId },
    ],
    totalRating: [{ type: String, default: 0 }],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { versionKey: false, timestamps: true }
);

var PorductModel = mongoose.model("products", productSchema);
module.exports = PorductModel;
