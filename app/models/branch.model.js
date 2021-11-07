const mongoose = require("mongoose")
const $baseModel = require("./$baseModel")

const schema = new mongoose.Schema(
    {
        titleAr: {
            type: String,
            require: true
        },
        titleEn: {
            type: String,
            require: true
        },
        region: {
            type: Number,
            ref: 'region',
            require: true

        },
        city: {
            type: Number,
            ref: 'city',
            require: true

        },
        coordinates: {
            type: [Number],
            required: true
        }

    },
    { timestamps: true }
);
const response = (doc) => {
    return {
        id: doc.id,
        titleAr: doc.titleAr,
        titleEn: doc.titleEn,
        region: doc.region,
        city: doc.city,
        coordinates: doc.coordinates,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

module.exports = $baseModel('branch', schema, {
    responseFunc: response
})