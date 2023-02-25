const mongoose = require("mongoose");

const orderProductsSchema = mongoose.Schema(
  {
    email: String,
    orderId: String,
    orderModelId: mongoose.Schema.Types.ObjectId,
    products: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        unitPrice: Number,
        total: Number,
        size: { type: String, uppercase: true },
        color: String,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const orderProductsModel = mongoose.model("orderproducts", orderProductsSchema);
module.exports = orderProductsModel;
