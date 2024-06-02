const mongoose = require("mongoose");
const $baseModel = require("../$baseModel");

const schema = new mongoose.Schema(
  {
    client: {
      type: Number,
      ref: "user",
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    // mongodb extend refrence pattern 
    products: [
      {
        product: {
          id: {
            type: Number,
            ref: "_product",
          },
          titleAr: {
            type: String,
            required: true,
          },
          titleEn: {
            type: String,
          },
          descriptionEn: {
            type: String,
            required: true,
          },
          descriptionAr: {
            type: String,
          },
          image: {
            type: String,
            required: true,
          },
          icon: {
            type: String,
            required: true,
          },
          price: {
            type: String,
            required: true,
          },
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    OrderDates: [{
      status: {
        type: String,
        required: true,
        enum: ["accepted", "rejected", "pending", "inProgress", "done"],
      },
      date: {
        type: Date,
        required: true,
      },
    }],
    status: {
      type: String,
      required: true,
      enum: ["accepted", "rejected", "pending", "inProgress", "done"],
    },
    statusDate: {
      type: Date,
      required: true,
    },
    adminNotes: {
      type: String,
    },
    clientNotes: {
      type: String,
    },
    whyRejected: {
      type: String,
    },

    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true, }
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
    whyRejected: doc.whyRejected,
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
