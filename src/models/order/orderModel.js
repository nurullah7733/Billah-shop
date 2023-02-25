const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    email: String,
    paymentIntent: {
      paymentId: String,
      paymentMethod: String,
      amount: Number,
    },
    vatTax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    otherCost: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
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
    shippingAddress: {
      street1: String,
      street2: String,
      thana: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
