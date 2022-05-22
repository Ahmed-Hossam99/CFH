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
    possibleResults: [
      {
        _id: false,
        titleAr: {
          type: String,
          required: true
        },
        titleEn: {
          type: String,
          required: true
        },
        descriptionAr: {
          type: String,

        },
        descriptionEn: {
          type: String,

        }
      }

    ],
    descriptionEn: {
      type: String,
      required: true,
    }, descriptionAr: {
      type: String,
      required: true,
    },
  },
  { discriminatorKey: "type" }
);
module.exports = ProductModel.discriminator("test", schema);
