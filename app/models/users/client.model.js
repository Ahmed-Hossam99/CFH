const mongoose = require("mongoose");
const UserModel = require("./_user.model");

const schema = new mongoose.Schema({
    birthdate: {
      type: Date,
    }
}, { discriminatorKey: "role" });
module.exports = UserModel.discriminator("client", schema);
