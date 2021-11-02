const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
  {
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/nile-pharmacy/image/upload/v1558858260/assets/placeholder_a1ubee.jpg",
    },
    descriptionAr: {
      type: String,
      required: true,
    },
    descriptionEn: {
      type: String,
    },
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    image: doc.image,
    descriptionAr: doc.descriptionAr,
    descriptionEn: doc.descriptionEn,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("about", schema, {
  responseFunc: response,
});
