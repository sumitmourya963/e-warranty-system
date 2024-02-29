const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
    // maxLength: [15, "GST number should have 15 characters"],
    // minLength: [15, "GST number should have 15 characters"],
  },
  phone: {
    type: Number,
    required: [true, "Please Enter phone Number"],
    // maxLength: [10, "Phone Number should have 10 Character"],
    // minLength: [10, "Phone Number should have 10 Character"],
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

dealerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
dealerSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

dealerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
dealerSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Dealers", dealerSchema);
