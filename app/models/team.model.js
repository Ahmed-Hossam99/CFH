const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
  {
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg",
    },
    descriptionAr: {
      type: String,
      required: true,
    },
    descriptionEn: {
      type: String,
    },
    nameAr: {
      type: String,
      required: true,
    },
    nameEn: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    nameAr: doc.nameAr,
    nameEn: doc.nameEn,
    image: doc.image,
    descriptionAr: doc.descriptionAr,
    descriptionEn: doc.descriptionEn,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("team", schema, {
  responseFunc: response,
});
