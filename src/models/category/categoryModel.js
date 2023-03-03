const mongoose = require("mongoose");

var categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

var CategoryModel = mongoose.model("categories", categorySchema);
module.exports = CategoryModel;
