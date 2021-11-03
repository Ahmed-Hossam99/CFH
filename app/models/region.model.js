const mongoose = require("mongoose");
const $baseModel = require("./$baseModel")

const schema = new mongoose.Schema({
    nameAr: {
        type: String,
        required: true
    },
    nameEn: {
        type: String,
        required: true
    },
    city: {
        type: Number,
        ref: 'city',
        require: true
    },


},
    { timestamps: true }
);

const response = (doc) => {
    return {
        id: doc.id,
        nameAr: doc.nameAr,
        nameEn: doc.nameEn,
        city: doc.city,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,


    }
};
module.exports = $baseModel('region', schema, {
    responseFunc: response
})