const mongoose = require("mongoose")
const $baseModel = require("./$baseModel")

const schema = new mongoose.Schema(
    {
        questionAr: {
            type: String,
            require: true
        },

        questionEn: {
            type: String,
        },

    },
    { timestamps: true }
);
const response = (doc) =>
{
    return {
        id: doc.id,
        questionAr: doc.questionAr,
        questionEn: doc.questionEn,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

module.exports = $baseModel('question', schema, {
    responseFunc: response
})