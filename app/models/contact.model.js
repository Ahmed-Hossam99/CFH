const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");
const emailRules =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      match: emailRules,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    username: doc.username,
    phone: doc.phone,
    email: doc.email,
    message: doc.message,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("contact", schema, {
  responseFunc: response,
});
