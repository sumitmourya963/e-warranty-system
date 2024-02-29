const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Category"],
  },
  model: {
    type: String,
    required: [true, "Please Enter phone Number"],
  },
  specification: {
    type: String,
    required: [true, "Please Enter Product Specification"],
  },
  warranty: {
    type: Number,
    required: [true, "Please Enter Your Warranty Periods in months"],
  },
  itemImages: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  data: [
    {
      serialNo: {
        type: String,
        required: true,
      },
      date_of_sale: {
        type: Date,
        required: true,
      },
      data_of_manufacture: {
        type: Date,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
