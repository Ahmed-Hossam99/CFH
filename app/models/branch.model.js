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
        descriptionAr: {
            type: String,
            require: true
        },
        descriptionEn: {
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
        },
        location: {
            type: String,
            require: true
        },

    },
    { timestamps: true }
);
const response = (doc) => {
    return {
        id: doc.id,
        titleAr: doc.titleAr,
        titleEn: doc.titleEn,
        descriptionAr: doc.descriptionAr,
        descriptionEn: doc.descriptionEn,
        region: doc.region,
        city: doc.city,
        // coordinates: doc.coordinates,
        location: doc.location,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

module.exports = $baseModel('branch', schema, {
    responseFunc: response
})