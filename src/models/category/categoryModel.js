const mongoose = require("mongoose");

var categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false, timestamps: true }
);

var CategoryModel = mongoose.model("categories", categorySchema);
module.exports = CategoryModel;
