const mongoose = require("mongoose");

var brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false, timestamps: true }
);

var BrandModel = mongoose.model("brands", brandSchema);
module.exports = BrandModel;
