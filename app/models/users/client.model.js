const mongoose = require("mongoose");
const UserModel = require("./_user.model");

const schema = new mongoose.Schema({
    city: {
        type: Number,
        ref: 'city',
    },
    region: {
        type: Number,
        ref: 'region',
    },
}, { discriminatorKey: "role" });
module.exports = UserModel.discriminator("client", schema);
