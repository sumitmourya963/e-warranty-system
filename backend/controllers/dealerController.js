const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Dealer = require("../models/dealerModel");

exports.getAllDealer = catchAsyncErrors(async (req, res, next) => {
  const dealers = await Dealer.find({});

  res.status(201).json({
    success: true,
    dealers,
    message: "All Dealers",
  });
});

exports.newDealer = catchAsyncErrors(async (req, res, next) => {
  const { name, gst, email, phone, address, companyId, location } = req.body;
  if (!name || !gst || !email || !phone || !address || !location) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  let uniqueId = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex1 = Math.floor(Math.random() * charset.length);
    const randomIndex2 = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex1);
    uniqueId += charset.charAt(randomIndex2);
  }

  const dealer = await Dealer.create({
    name,
    gst,
    email,
    phone,
    password,
    uniqueId,
    address,
    location,
    companyId,
  });

  res.status(201).json({
    success: true,
    dealer,
    message: "Dealer Registered Successfully",
  });
});

exports.updateDealer = catchAsyncErrors(async (req, res, next) => {
  const { _id, name, gst, email, phone, address, companyId, location } =
    req.body;

  if (!name || !gst || !email || !phone || !address || !location) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  const existingDealer = await Dealer.findById(_id);

  if (!existingDealer) {
    return res.status(404).json({ error: "Dealer not found." });
  }

  // Update only the fields you want to change
  existingDealer.name = name;
  existingDealer.gst = gst;
  existingDealer.email = email;
  existingDealer.phone = phone;
  existingDealer.address = address;
  existingDealer.location = location;
  existingDealer.companyId = companyId;

  const updatedDealer = await existingDealer.save();

  res.status(200).json({
    success: true,
    dealer: updatedDealer,
    message: "Dealer Updated Succefully.",
  });
});

exports.deleteDealer = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  await Dealer.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Dealer Deleted Successfully",
  });
});
