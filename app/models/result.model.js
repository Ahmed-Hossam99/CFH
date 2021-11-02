const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
  {
    attachment: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    notes: {
      type: String,
    },
    titleAr: {
      type: String,
      required: true,
    },
    titleEn: {
      type: String,
    },
    subject: {
      type: Number,
      refPath: "subjectType",
      required: true,
    },
    subjectType: {
      type: String,
      required: true,
      enum: ["user", "order"],
    },
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    attachment: doc.attachment,
    images: doc.images,
    notes: doc.notes,
    titleAr: doc.titleAr,
    titleEn: doc.titleEn,
    subject: doc.subject,
    subjectType: doc.subjectType,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("result", schema, {
  responseFunc: response,
});
