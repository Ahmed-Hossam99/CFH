const mongoose = require("mongoose");
const $baseModel = require("../$baseModel");

const schema = new mongoose.Schema(
  {
    client: {
      type: Number,
      ref: "user",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, discriminatorKey: "type" }
);

const response = (doc) => {
  return {
    id: doc.id,
    booking: doc.booking,
    client: doc.client,
    username: doc.username,
    phone: doc.phone,
    result: doc.result,
    products: doc.products,
    images: doc.images,
    day: doc.day,
    from: doc.from,
    to: doc.to,
    address: doc.address,
    gender: doc.gender,
    age: doc.age,
    timeAttendance: doc.timeAttendance,
    status: doc.status,
    adminNotes: doc.adminNotes,
    clientNotes: doc.clientNotes,
    offers: doc.offers,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("order", schema, {
  responseFunc: response,
});
