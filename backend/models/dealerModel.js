const mongoose = require("mongoose");

const dealerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  gst: {
    type: String,
    required: [true, "Please Enter Gst No."],
    maxLength: [15, "GST number should have 15 characters"],
    minLength: [15, "GST number should have 15 characters"],
  },
  phone: {
    type: Number,
    required: [true, "Please Enter phone Number"],
    maxLength: [10, "Phone Number should have 10 Character"],
    minLength: [10, "Phone Number should have 10 Character"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },
  companyId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Dealer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Dealers", dealerSchema);
