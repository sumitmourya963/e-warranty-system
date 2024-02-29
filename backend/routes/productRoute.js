const express = require("express");

const {
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProduct,
  createProduct,
  addItem,
  serialNumProduct,
} = require("../controllers/productController.js");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/update-product/:id").put(updateProduct);
router.route("/delete-product/:id").delete(deleteProduct);
router.route("/product/:id").get(getProduct);
router.route("/new-product").post(createProduct);
router.route("/add-item/:id").put(addItem);
router.route("/add-qr/:id").put(serialNumProduct);
module.exports = router;
