const mongoose = require("mongoose");
const ProductModel = require("./_product.model");

const schema = new mongoose.Schema(
  {
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
    possibleResults: [{ type: String }],
  },
  { discriminatorKey: "type" }
);
module.exports = ProductModel.discriminator("test", schema);
