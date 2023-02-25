const mongoose = require("mongoose");

const orderProductsSchema = mongoose.Schema({
  email: String,
  orderId: mongoose.Schema.Types.ObjectId,
  products: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      count: Number,
      size: String,
      color: String,
    },
  ],
});

const orderProductsModel = mongoose.model("orderproducts", orderProductsSchema);
module.exports = orderProductsModel;
