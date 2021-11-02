const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
  {
    titleAr: {
      type: String,
      required: true,
    },
    titleEn: {
      type: String,
    },
    detailsAr: {
      type: String,
      required: true,
    },
    detailsEn: {
      type: String,
    },
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    titleAr: doc.titleAr,
    titleEn: doc.titleEn,
    detailsAr: doc.detailsAr,
    detailsEn: doc.detailsEn,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("instruction", schema, {
  responseFunc: response,
});
