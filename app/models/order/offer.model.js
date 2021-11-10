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
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg",
    }, icon: {
      type: String,
      default:
        "https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg",
    },
  },
  { discriminatorKey: "type" }
);
module.exports = OrderModel.discriminator("orders-offer", schema);
