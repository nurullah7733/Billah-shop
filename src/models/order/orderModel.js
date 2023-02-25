const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  email: String,
  paymentIntent: {
    paymentId: String,
    paymentMethod: String,
    amount: String,
  },
  vatTax: { type: Number },
  discount: { type: Number },
  otherCost: { type: Number },
  shippingCost: { type: Number },
  grandTotal: { type: Number },
  note: { type: String },
  orderStatus: {
    type: String,
    default: "Not Processed",
    enum: [
      "Not Processed",
      "Cash on Delivery",
      "Processing",
      "Dispatched",
      "Cancelled",
      "Delivered",
    ],
  },
});

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
