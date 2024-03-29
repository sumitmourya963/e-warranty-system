const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel.js");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");
const { Readable } = require("stream");

cloudinary.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    success: true,
    products,
    message: "All Products",
  });
});

exports.serialNumProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { serialNo } = req.body;
  const obj = {
    serialNo: serialNo,
    date_of_sale: Date.now(),
    data_of_manufacture: Date.now(),
  };
  const product = await Product.findById(id);
  product.data.push(obj);
  await product.save();
  res.status(201).json({
    message: "Product Scanned Succefully.",
    success: true,
    product,
  });
});

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const {
    companyName,
    category,
    model,
    specification,
    warrantyToNum,
    imageUri,
  } = req.body;
  const company_name = companyName;
  const warranty = warrantyToNum;
  const { image } = req.files;
  console.log(imageUri);

  if (!company_name || !category || !model || !specification || !warranty) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  // try {
  //   const result = await cloudinary.uploader.upload(image, {
  //     folder: "product",
  //     width: 150,
  //     crop: "scale",
  //   });
  //   console.log(result);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }

  console.log("backend.....1");

  const data = {
    serialNo: "123456789",
    date_of_sale: Date.now(),
    data_of_manufacture: Date.now(),
  };

  const product = await Product.create({
    company_name,
    category,
    model,
    specification,
    warranty,
    data,
    itemImage: {
      public_id: "dhfalejljw",
      url: "fkelajelwjeklwj",
    },
  });

  console.log("backend.....2");

  res.status(201).json({
    message: "Product Created succefully",
    success: true,
    product,
  });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { company_name, category, model, specification, warranty } = req.body;
  if (!company_name || !category || !model || !specification || !warranty) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }
  const product = await Product.findById(id);
  product.company_name = company_name;
  product.category = category;
  product.model = model;
  product.specification = specification;
  product.warranty = warranty;
  await product.save();
  res.status(201).json({
    message: "Product updated Succefully.",
    success: true,
    product,
  });
});

exports.getProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.status(200).json({
    message: "Product found succefully",
    product,
  });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(200).json({
    message: "Product deleted Succefully",
    success: true,
  });
});

exports.addItem = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const { serialNo, date_of_sale, data_of_manufacture } = req.body;
  let product = await Product.findById(id);

  const item = {
    serialNo,
    date_of_sale,
    data_of_manufacture,
  };
  product.data.push(item);
  product = await product.save();
  res.status(200).json({
    message: "Item Added succefully",
    success: true,
    product,
  });
});
