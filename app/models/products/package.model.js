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
    measuresAr: {
      type: String,
      required: true,
    },
    measuresEn: {
      type: String,
    },
    availableAt: {
      type: String,
      required: true,
      enum: ["home", "lab", "both"],
    },
  },
  { discriminatorKey: "type" }
);
module.exports = ProductModel.discriminator("package", schema);
