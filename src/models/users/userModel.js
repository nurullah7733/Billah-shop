const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
    },
    cart: [{ type: Array, default: [] }],
    wishList: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
    address: [{ type: mongoose.Schema.Types.ObjectId }],
    role: {
      type: String,
      default: "user",
      trim: true,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

var UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
