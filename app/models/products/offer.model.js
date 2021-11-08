const mongoose = require("mongoose");
const ProductModel = require("./_product.model");

const schema = new mongoose.Schema(
  {
    tests: [
      {
        type: Number,
        ref: "test",
      },
    ],
    offerType: {
      type: String,
      required: true,
      enum: ["annually", "monthly"],
    },
    detailsAr: {
      type: String,
      required: true,
    },
    detailsEn: {
      type: String,
    },
  },
  { discriminatorKey: "type" }
);
module.exports = ProductModel.discriminator("offer", schema);
