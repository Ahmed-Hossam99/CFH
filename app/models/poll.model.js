const mongoose = require("mongoose")
const $baseModel = require("./$baseModel")

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },

        phone: {
            type: String,
            require: true
        },

        notes: {
            type: String,
            // require: true
        },
        answers: [
            {
                _id: false,
                question: {
                    type: Number,
                    ref: 'question',
                    require: true
                },
                value: {
                    type: Number,
                    require: true
                },
            }
        ],
        youKnowUs: {
            type: String,
            required: true,
            enum: ["faceBook", "other", "afrind", "instagram"],
        },

    },
    { timestamps: true }
);
const response = (doc) =>
{
    return {
        id: doc.id,
        phone: doc.phone,
        name: doc.name,
        answers: doc.answers,
        youKnowUs: doc.youKnowUs,
        notes: doc.notes,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

module.exports = $baseModel('poll', schema, {
    responseFunc: response
})