const mongoose = require("mongoose");
const OrderModel = require("./_order.model");

const schema = new mongoose.Schema(
  {
    offers: [
      {
        type: Number,
        ref: "offer",
      },
    ],
  },
  { discriminatorKey: "type" }
);
module.exports = OrderModel.discriminator("order-offer", schema);
