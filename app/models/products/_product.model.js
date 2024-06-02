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
    descriptionEn: {
      type: String,
      required: true,
    },
    descriptionAr: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

  },
  { timestamps: true }
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
    price: doc.price,
    quantity: doc.quantity,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("product", schema, {
  responseFunc: response,
});
