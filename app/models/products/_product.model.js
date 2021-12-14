const mongoose = require("mongoose");
const $baseModel = require("../$baseModel");

const schema = new mongoose.Schema(
  {
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/nile-pharmacy/image/upload/v1558858260/assets/placeholder_a1ubee.jpg",
    },
    icon: {
      type: String,
      default:
        "https://res.cloudinary.com/nile-pharmacy/image/upload/v1558858260/assets/placeholder_a1ubee.jpg",
    },
    titleAr: {
      type: String,
      required: true,
    },
    titleEn: {
      type: String,
    },
    branches: [
      {
        type: Number,
        ref: "branch", // TODO make sure about naming
      },
    ],
    price: {
      type: Number,
      // required: true,
      min: 1,
    },
    priceAfterDiscount: {
      type: Number,
      min: 1,
      default: null,
    },
  },
  { timestamps: true, discriminatorKey: "type" }
);

const response = (doc) => {
  return {
    id: doc.id,
    image: doc.image,
    icon: doc.icon,
    titleAr: doc.titleAr,
    titleEn: doc.titleEn,
    descriptionEn: doc.descriptionEn,
    descriptionAr: doc.descriptionAr,
    branches: doc.branches,
    price: doc.price,
    priceAfterDiscount: doc.priceAfterDiscount,
    offerType: doc.offerType,
    tests: doc.tests,
    detailsAr: doc.detailsAr,
    detailsEn: doc.detailsEn,
    measuresAr: doc.measuresAr,
    measuresEn: doc.measuresEn,
    availableAt: doc.availableAt,
    possibleResults: doc.possibleResults,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("product", schema, {
  responseFunc: response,
});
