const mongoose = require("mongoose");
const OrderModel = require("./_order.model");

const schema = new mongoose.Schema(
  {
    result: {
      type: Number,
      ref: "result",
    },
    products: [
      {
        type: Number,
        ref: "product",
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    day: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    booking: {
      type: String,
      enum: ["external", "internal"],
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["accepted", "rejected", "pending", "inProgress", "done"],
    },
    adminNotes: {
      type: String,
    },
    clientNotes: {
      type: String,
    },
  },
  { discriminatorKey: "type" }
);
module.exports = OrderModel.discriminator("normal", schema);
