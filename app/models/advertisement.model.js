const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
  {
    image: {
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
    descriptionAr: {
      type: String,
      required: true,
    },
    descriptionEn: {
      type: String,
    },
    branches: [
      {
        type: Number,
        ref: "branch", // TODO make sure about naming
      },
    ],
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    branches: doc.branches,
    image: doc.image,
    titleAr: doc.titleAr,
    titleEn: doc.titleEn,
    descriptionAr: doc.descriptionAr,
    descriptionEn: doc.descriptionEn,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("advertisment", schema, {
  responseFunc: response,
});
